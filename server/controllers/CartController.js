import CartModel from "../models/CartModel.js";

// Inserting the element when the Cart is empty
export async function createCart(req, res) {
    const { product, userId } = req.body;

    const addProductsToCart = new CartModel(
        {
            userId: userId,
            products: [product]
        }
    )

    try {
        const cartFound = await CartModel.find({ userId });

        if (cartFound.length > 0) {
            return res.status(208).json({ msg: "Cart Already Exist", cartFound })
        }
        else {
            const cartSaved = await addProductsToCart.save();

            if (cartSaved) {
                // returning the new cart
                const cartFound = await CartModel.find({ userId }).populate('products.productId');
                if (cartFound) {
                    const newCart = cartFound[0].products.map(
                        (element) => {
                            console.log(element)
                            const tempObject = element.productId.toJSON()
                            tempObject.productQuantity = element.productId.quantity         //adding productQuantiy
                            tempObject.quantity = element.quantity                          // replacing quantity
                            console.log(tempObject)
                            return tempObject
                        }
                    )
                    return res.status(201).json({ "msg": "Cart Created Successfully.", newCart })
                }
            }
            return res.status(400).json({ Failure: "Something went wrong." })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error.", error })
    }
}

export async function updateCart(req, res) {
    const { product, userId } = req.body;
    const { productId, quantity } = product;

    try {
        const cartFound = await CartModel.find({ userId, "products.productId": productId });
        console.log(cartFound)
        // If the product exist in the Cart update its quantity
        let cartFoundAndUpdated = null;

        if (cartFound.length > 0) {
            cartFoundAndUpdated = await CartModel.findOneAndUpdate(
                {
                    userId,
                    "products.productId": productId                 // Finding the product inside the Array
                },
                {
                    $set: { "products.$.quantity": quantity }       // Setting the New Quantity of the existing product
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
                    $push: { products: product }                   // Setting the New Quantity of the existing product
                },
                {
                    new: true,                                      // It ensures that the updated document is returned
                    useFindAndModify: false
                }
            );
        }
        console.log(cartFoundAndUpdated)
        if (cartFoundAndUpdated) {
            // returning the cart with the updated value of the quantity
            const cartFound = (await CartModel.find({ userId }).populate('products.productId'))[0];
            if (cartFound) {
                const updatedCart = cartFound.products.map(
                    (element) => {
                        console.log(element)
                        const tempObject = element.productId.toJSON()
                        tempObject.productQuantity = element.productId.quantity         //adding productQuantiy
                        tempObject.quantity = element.quantity                          // replacing quantity
                        console.log(tempObject)
                        return tempObject
                    }

                )
                return res.status(208).json({ "msg": "Cart Updated Successfully.", updatedCart })
            }
        }
        return res.status(400).json({ Failure: "Something went wrong." })
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error.", error })
    }
}

export async function getCart(req, res) {
    const { userId } = req.params;
    try {
        const cartFound = await CartModel.find({ userId }).populate('products.productId');
        console.log(cartFound)
        if (cartFound.length > 0) {

            const existingCart = cartFound[0].products.map(
                (element) => {
                    console.log(element)
                    const tempObject = element.productId.toJSON()
                    tempObject.productQuantity = element.productId.quantity         //adding productQuantiy
                    tempObject.quantity = element.quantity                          // replacing quantity
                    console.log(tempObject)
                    return tempObject
                }
            )
            return res.status(201).json({ "message": "Products Found.", existingCart })
        }
        else {
            return res.status(404).json({ "message": "Cart Not Found" })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

export async function deleteCart(req, res) {
    console.log(130, req.body)
    const { product, userId } = req.body;
    const { productId, quantity } = product;

    try {
        let cartUpdated = null;
        let cartDeleted = null;

        const cartFound = await CartModel.find({ userId });
        console.log(139, cartFound)
        if (cartFound.length === 0) {
            return res.status(400).json({ CartNotFound: "Cart Not Created." })
        }

        // If the cart exist delete one product from the cart
        if (cartFound[0].products.length > 1) {
            console.log('if')
            cartUpdated = await CartModel.updateOne(
                {
                    userId,
                    "products.productId": productId                 // Finding the product inside the Array
                },
                {
                    $pull: {
                        products: { productId, quantity: quantity }
                    }
                },
            );
        }

        // If there is only one product to be removed from the cart delete the cart
        else {
            console.log('else')
            cartDeleted = await CartModel.findOneAndDelete({ userId });
        }

        if (cartUpdated) {
            // returning the cart with the updated value of the quantity
            const cartFound = (await CartModel.find({ userId }).populate('products.productId'))[0];
            if (cartFound) {
                const updatedCart = cartFound.products.map(
                    (element) => {
                        element.productId.quantity = element.quantity
                        return element.productId
                    }
                )
                return res.status(201).json({ "msg": "Product Deleted Successfully.", updatedCart })
            }
        }
        if (cartDeleted) {
            return res.status(201).json({ CartNotFound: "Cart is Deleted.", updatedCart: [] })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error.", error })
    }
}