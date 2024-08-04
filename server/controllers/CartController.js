import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";

// Creating the cart with one element
export async function createCart(req, res) {
    const { productId, userId, existingCart } = req.body;

    try {
        // reducing the product Quantity
        const productFound = await ProductModel.findOne(
            {
                _id: productId
            }
        );
        if (productFound.quantity > 0) {
            const quantityUpdated = await ProductModel.updateOne(
                {
                    _id: productId
                },
                {
                    $set: { quantity: productFound.quantity - 1 }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            )
            if (quantityUpdated) {
                const cartFound = await CartModel.find({ userId });

                if (cartFound.length > 0) {
                    return res.status(208).json({ msg: "Cart Already Exist", cartFound })
                }
                else {
                    const addProductsToCart = new CartModel(
                        {
                            userId: userId,
                            products: [{ productId, quantity: 1 }]
                        }
                    )

                    const cartSaved = await addProductsToCart.save();

                    if (cartSaved) {
                        // returning the new cart
                        const cartFound = await CartModel.find({ userId }).populate('products.productId');
                        if (cartFound) {
                            const newCart = cartFound[0].products.map(
                                (element) => {
                                    const tempObject = element.productId.toJSON()
                                    tempObject.productQuantity = element.productId.quantity         //adding productQuantiy
                                    tempObject.quantity = element.quantity                          // replacing quantity
                                    return tempObject
                                }
                            )
                            return res.status(201).json({ "msg": "Cart Created Successfully.", newCart, productQuantity: productFound.quantity - 1 })
                        }
                    }
                    return res.status(400).json({ Failure: "Something went wrong." })
                }
            }
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error.", error })
    }
}

// Controller Function to update the existing cart
export async function updateCart(req, res) {
    const { productId, userId } = req.body;

    try {
        const productFound = await ProductModel.findOne(
            {
                _id: productId
            }
        );
        if (productFound.quantity > 0) {
            const quantityUpdated = await ProductModel.updateOne(
                {
                    _id: productId
                },
                {
                    $set: { quantity: productFound.quantity - 1 }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            )
            if (quantityUpdated) {
                const cartFound = await CartModel.find({ userId });

                let cartFoundAndUpdated = null;

                const findProductInCart = cartFound[0].products.find(
                    (product) => {
                        return product.productId == productId
                    }
                )
                if (findProductInCart) {
                    cartFoundAndUpdated = await CartModel.findOneAndUpdate(
                        {
                            userId,
                            "products.productId": productId                 // Finding the product inside the Array
                        },
                        {
                            $set: { "products.$.quantity": findProductInCart.quantity + 1 }       // Setting the New Quantity of the existing product
                        },
                        {
                            new: true,                                      // It ensures that the updated document is returned
                            useFindAndModify: false
                        }
                    );
                }
                // If the product does not exist in the cart add the product in the cart.
                else {
                    cartFoundAndUpdated = await CartModel.findOneAndUpdate(
                        {
                            userId
                        },
                        {
                            $push: { products: { productId, quantity: 1 } }                   // Inserting new product
                        },
                        {
                            new: true,                                      // It ensures that the updated document is returned
                            useFindAndModify: false
                        }
                    );
                }
                if (cartFoundAndUpdated) {
                    // returning the cart with the updated value of the quantity
                    const cartFound = (await CartModel.find({ userId }).populate('products.productId'))[0];
                    if (cartFound) {
                        const updatedCart = cartFound.products.map(
                            (element) => {
                                const tempObject = element.productId.toJSON()
                                tempObject.productQuantity = element.productId.quantity         //adding productQuantiy
                                tempObject.quantity = element.quantity                          // replacing quantity
                                return tempObject
                            }

                        )
                        return res.status(201).json({ "msg": "Cart Updated Successfully.", updatedCart, productQuantity: productFound.quantity - 1 })
                    }
                }
                return res.status(400).json({ Failure: "Something went wrong." })
            }
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error.", error })
    }
}

// If the user has existing cart, returing the cart.
export async function getCart(req, res) {
    const { userId } = req.params;
    try {
        const cartFound = await CartModel.find({ userId }).populate('products.productId');

        let existingCart = []

        if (cartFound.length > 0) {

            existingCart = cartFound[0].products.map(
                (element) => {
                    const tempObject = element.productId.toJSON()
                    tempObject.productQuantity = element.productId.quantity         //adding productQuantiy
                    tempObject.quantity = element.quantity                          // replacing quantity
                    return tempObject
                }
            )
            return res.status(201).json({ "message": "Products Found.", existingCart })
        }
        else {
            return res.status(201).json({ "message": "Cart Not Found", existingCart })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Removing the products from the cart and deleting the cart itself if no product is there.
export async function deleteCart(req, res) {
    let { userId, productId, removeQuantity } = req.body;

    try {
        let cartFound = await CartModel.find({ userId });

        if (cartFound.length === 0) {
            return res.status(404).json({ CartNotFound: "Cart Not Created." })
        }

        const findProductInCart = cartFound[0].products.find(
            (product) => {
                return product.productId == productId
            }
        )

        const productFound = await ProductModel.findOne(
            {
                _id: productId
            }
        );

        let cartUpdated = null;
        let cartDeleted = null;

        if (removeQuantity) {
            // If the length of the cart is greater than 1 and one product has to be removed.
            if (cartFound[0].products.length > 1) {
                cartUpdated = await CartModel.updateOne(
                    {
                        userId,
                        "products.productId": productId                 // Finding the product inside the Array
                    },
                    {
                        $pull: {
                            products: { productId }
                        }
                    },
                );
            }

            // if the there is only one product in the cart to be removed, delete the cart itself.
            else if (cartFound[0].products.length === 1) {
                cartDeleted = await CartModel.findOneAndDelete({ userId });
            }
            else {
                console.log("TO KNOW IF THERE IS ANY OTHER CONDITION PENDING")
            }
        }
        else {
            console.log("ELSE")

            if (findProductInCart.quantity > 1) {
                cartUpdated = await CartModel.updateOne(
                    {
                        userId,
                        "products.productId": productId                 // Finding the product inside the Array
                    },
                    {
                        $set: { "products.$.quantity": findProductInCart.quantity - 1 }       // Setting the New Quantity of the existing product
                    },
                    {
                        new: true,                                      // It ensures that the updated document is returned
                        useFindAndModify: false
                    }
                );
            }

            // If the length of the cart is greater than 1 and one product has to be removed.
            else if (cartFound[0].products.length > 1 && findProductInCart.quantity === 1) {
                cartUpdated = await CartModel.updateOne(
                    {
                        userId,
                        "products.productId": productId                 // Finding the product inside the Array
                    },
                    {
                        $pull: {
                            products: { productId }
                        }
                    },
                );
            }

            // if the there is only one product in the cart to be removed, delete the cart itself.
            else if (findProductInCart.quantity === 1) {
                cartDeleted = await CartModel.findOneAndDelete({ userId });
            }
            else {
                console.log("TO KNOW IF THERE IS ANY OTHER CONDITION PENDING")
            }
        }

        if (productFound.quantity >= 0) {
            if (!removeQuantity) {
                removeQuantity = 1
            }
            const quantityUpdated = await ProductModel.updateOne(
                {
                    _id: productId
                },
                {
                    $set: { quantity: productFound.quantity + removeQuantity }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            )
        }

        // sending the updated cart
        cartFound = (await CartModel.find({ userId }).populate('products.productId'))[0];

        if (cartFound && cartUpdated) {
            const updatedCart = cartFound.products.map(
                (element) => {

                    const tempObject = element.productId.toJSON()
                    tempObject.productQuantity = element.productId.quantity         //adding productQuantiy
                    tempObject.quantity = element.quantity                          // replacing quantity
                    return tempObject
                }
            )
            return res.status(201).json({ ProductDeleted: "Product Deleted Successfully.", updatedCart, productQuantity: productFound.quantity + 1 })
        }

        else {
            const updatedCart = []
            return res.status(201).json({ CartNotFound: "Cart is Deleted.", updatedCart, productQuantity: productFound.quantity + 1 })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error.", error })
    }
}

// If the user has not logged in but has some products in the cart, updating the products on the logging in.
export async function updatingCart(req, res) {
    let { userId, existingCart } = req.body;

    try {
        let cartFound = await CartModel.find({ userId });

        if (cartFound.length > 0) {
            for (let item of existingCart) {
                cartFound = await CartModel.find({ userId });

                const { productId, quantity } = item;

                const productFoundInCart = cartFound[0].products.find(
                    (cartItem) => {
                        return cartItem.productId == productId
                    }
                )

                if (productFoundInCart !== -1) {
                    const productFound = await ProductModel.findOne(
                        {
                            _id: productId
                        }
                    );

                    if (productFound.quantity > 0) {
                        let quantityUpdated = null;

                        if (productFoundInCart.quantity >= quantity) {
                            quantityUpdated = await ProductModel.updateOne(
                                {
                                    _id: productId
                                },
                                {
                                    $set: { quantity: productFound.quantity + (productFoundInCart.quantity - quantity) }
                                },
                                {
                                    new: true,
                                    useFindAndModify: false
                                }
                            )
                            if (quantityUpdated) {
                                const cartFoundAndUpdated = await CartModel.updateOne(
                                    {
                                        userId,
                                        "products.productId": productId                 // Finding the product inside the Array
                                    },
                                    {
                                        $set: { "products.$.quantity": quantity }

                                    },
                                    {
                                        new: true,
                                        useFindAndModify: false
                                    }
                                )

                                if (cartFoundAndUpdated) {
                                    // returning the new cart
                                    cartFound = await CartModel.find({ userId }).populate('products.productId');
                                }
                            }
                        }
                        else if (productFoundInCart.quantity < quantity) {
                            quantityUpdated = await ProductModel.updateOne(
                                {
                                    _id: productId
                                },
                                {
                                    $set: { quantity: productFound.quantity + productFoundInCart.quantity - quantity }
                                },
                                {
                                    new: true,
                                    useFindAndModify: false
                                }
                            )
                            if (quantityUpdated) {
                                const cartFoundAndUpdated = await CartModel.updateOne(
                                    {
                                        userId,
                                        "products.productId": productId                 // Finding the product inside the Array
                                    },
                                    {
                                        $set: { "products.$.quantity": quantity }

                                    },
                                    {
                                        new: true,
                                        useFindAndModify: false
                                    }
                                )

                                if (cartFoundAndUpdated) {
                                    // returning the new cart
                                    cartFound = await CartModel.find({ userId }).populate('products.productId');
                                }
                            }
                        }
                    }

                }
            }
        }

        else {
            for (let item of existingCart) {
                cartFound = await CartModel.find({ userId });

                const { productId, quantity } = item;
                if (!cartFound[0]) {
                    const productFound = await ProductModel.findOne(
                        {
                            _id: productId
                        }
                    );

                    if (productFound.quantity > 0) {
                        let quantityUpdated = null;
                        if (productFound.quantity >= quantity) {
                            quantityUpdated = await ProductModel.updateOne(
                                {
                                    _id: productId
                                },
                                {
                                    $set: { quantity: productFound.quantity - quantity }
                                },
                                {
                                    new: true,
                                    useFindAndModify: false
                                }
                            )
                            if (quantityUpdated) {
                                const addProductsToCart = new CartModel(
                                    {
                                        userId: userId,
                                        products: [{ productId, quantity: quantity }]
                                    }
                                )

                                const cartSaved = await addProductsToCart.save();

                                if (cartSaved) {
                                    // returning the new cart
                                    cartFound = await CartModel.find({ userId }).populate('products.productId');
                                }
                            }
                        }
                        else if (productFound.quantity < quantity) {
                            quantityUpdated = await ProductModel.updateOne(
                                {
                                    _id: productId
                                },
                                {
                                    $set: { quantity: 0 }
                                },
                                {
                                    new: true,
                                    useFindAndModify: false
                                }
                            )
                            if (quantityUpdated) {
                                const addProductsToCart = new CartModel(
                                    {
                                        userId: userId,
                                        products: [{ productId, quantity: productFound.quantity }]
                                    }
                                )

                                const cartSaved = await addProductsToCart.save();

                                if (cartSaved) {
                                    // returning the new cart
                                    cartFound = await CartModel.find({ userId }).populate('products.productId');
                                }
                            }
                        }
                    }
                }
                else if (cartFound[0]) {
                    const productFound = await ProductModel.findOne(
                        {
                            _id: productId
                        }
                    );

                    if (productFound.quantity > 0) {
                        let quantityUpdated = null;
                        if (productFound.quantity >= quantity) {
                            quantityUpdated = await ProductModel.updateOne(
                                {
                                    _id: productId
                                },
                                {
                                    $set: { quantity: productFound.quantity - quantity }
                                },
                                {
                                    new: true,
                                    useFindAndModify: false
                                }
                            )
                            if (quantityUpdated) {
                                const cartFoundAndUpdated = await CartModel.updateOne(
                                    {
                                        userId
                                    },
                                    {
                                        $push: { products: { productId, quantity } }
                                    },
                                    {
                                        new: true,
                                        useFindAndModify: false
                                    }
                                )

                                if (cartFoundAndUpdated) {
                                    // returning the new cart
                                    cartFound = await CartModel.find({ userId }).populate('products.productId');
                                }
                            }
                        }
                        else if (productFound.quantity < quantity) {
                            quantityUpdated = await ProductModel.updateOne(
                                {
                                    _id: productId
                                },
                                {
                                    $set: { quantity: 0 }
                                },
                                {
                                    new: true,
                                    useFindAndModify: false
                                }
                            )
                            if (quantityUpdated) {
                                const cartFoundAndUpdated = await CartModel.updateOne(
                                    {
                                        userId
                                    },
                                    {
                                        $push: { products: { productId, quantity: productFound.quantity } }
                                    },
                                    {
                                        new: true,
                                        useFindAndModify: false
                                    }
                                )

                                if (cartFoundAndUpdated) {
                                    // returning the new cart
                                    cartFound = await CartModel.find({ userId }).populate('products.productId');
                                }
                            }
                        }
                    }
                }
                else {
                    console.log(560, "EDGE CASE")
                }
            }
        }
        if (cartFound.length > 0) {
            existingCart = cartFound[0].products.map(
                (element) => {
                    const tempObject = element.productId.toJSON()
                    tempObject.productQuantity = element.productId.quantity         //adding productQuantiy
                    tempObject.quantity = element.quantity                          // replacing quantity
                    return tempObject
                }
            )
            return res.status(201).json({ "message": "Products Found.", existingCart })
        }
        else {
            return res.status(201).json({ "message": "Cart Not Found", existingCart })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error.", error })
    }
}