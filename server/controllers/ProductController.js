import ProductModel from "../models/ProductModel.js";

export async function uploadProductImage(req, res) {
    console.log("After", req.body, req.file);
    const { sellerId, productName, productFor, productDescription, productPrice, productCategory, productQuantity } = req.body
    console.log(!req.file)
    const imageUrl = req.file;
    if (!imageUrl) {
        console.log("not image")
        // imageUrl = "public/images/default.web"
        console.log(imageUrl)
    }
    else {
        console.log("else", imageUrl)
    }

    if (!sellerId ||
        !productName ||
        !productFor ||
        !productDescription ||
        !productPrice ||
        !productCategory ||
        !productQuantity) {
        return res.status(401).json({ Entries: "Fields cannot be empty." })
    }


    return res.status(201).json({ msg: "File Uploaded SuccessFully", file: req.file })
}

export async function createProduct(req, res) {
    console.log(req.body)
    const { image, productName, age, description, price, category, quantity, sellerId } = req.body;
    // a = {
    //     productName: 'sdfdfdfdfdfdff',
    //     productFor: 'Kitten',
    //     productDescription: 'dfdfdfdfdf',
    //     productPrice: '59595',
    //     productCategory: 'Food',
    //     productQuantity: '59'
    // }
    if (!sellerId ||
        !productName ||
        !productFor ||
        !productDescription ||
        !productPrice ||
        !productCategory ||
        !productQuantity) {
        return res.status(401).json({ Entries: "Fields cannot be empty." })
    }

    const addProduct = new ProductModel(
        {
            imageUrl: image,
            title: productName,
            age,
            description,
            price,
            category,
            quantity,
            sellerId,
        }
    )

    try {
        // To check if the product already exist.
        const productFound = await ProductModel.findOne(
            {
                imageUrl: image,
                title: productName,
                age,
                description,
                price,
                category,
                sellerId
            }
        );
        if (productFound) {
            // Updating the product Quantity if the product already exist
            const productUpdated = await productFound.updateOne({ quantity: productFound.quantity + quantity })
            if (productUpdated) {
                return res.status(208).json({ "message": "Product Updated Successfully." })
            }
        }
        else {
            // Creating a new sales record if the product does not exist.
            const productSaved = await addProduct.save();
            if (productSaved) {
                return res.status(201).json({ Created: "Product added successfully." })
            }
            else {
                return res.status(400).json({ Failure: "Something went wrong." })
            }
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

export const getProducts = async (req, res) => {
    // for now must be replaced with the data send through the request over axiso
    const { userType, email } = req.body;
    try {
        const products = await ProductModel.find().populate("sellerId").populate("reviews.ratedBy");

        if (products && userType === "seller") {
            const sellerProducts = products.filter(
                (product) => {
                    return product.sellerId.email === email && product.sellerId.userType === userType;
                }
            )
            return res.status(201).json({ products: sellerProducts });
        }
        else if (products) {
            const userProducts = products.map(
                (product) => {
                    // variable to store the average of rating
                    let avgReview = 0;
                    if (product.reviews.length > 1) {
                        product.reviews.map(
                            ({ rating }) => {
                                avgReview += rating
                            }
                        )
                        avgReview = avgReview / product.reviews.length
                    }
                    else if (product.reviews.length === 1) {
                        avgReview += product.reviews[0].rating
                    }

                    const tempProduct = product.toJSON();
                    tempProduct.rating = avgReview
                    return tempProduct
                }
            )
            return res.status(201).json({ products: userProducts });
        }
        else {
            return res.status(404).json({ Failure: "No Record Found." })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ error: error, message: "Internal Server Error." })
    }
}

export const updateProduct = async (req, res) => {
    // for now must be replaced with the data send through the request over axiso
    const { user, image } = req.body;
    try {
        const productUpdated = await ProductModel.findOneAndUpdate(
            {
                _id: req.params.id,
                sellerId: user
            },
            {
                imageUrl: image,
                title: productName,
                description: description,
                age: age,
            }
        );
        if (productUpdated) {
            return res.status(201).json({ "Success": "Product Updated Successfully" });
        }
        else {
            console.log("error")
            return res.status(404).json({ Failure: "No Record Found." })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// controller function to delete specific product
export async function deleteProduct(req, res) {
    const { user } = req.body;

    try {
        const productDeleted = await ProductModel.findOneAndDelete({ _id: req.params.id, sellerId: user });
        if (productDeleted) {
            return res.status(201).send({ "msg": "Product Deleted Successfully." });
        }
        return res.status(400).send("Something went wrong.");
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

export async function addProductRating(req, res) {
    const { productId, review } = req.body;
    console.log(productId, review)

    try {
        const ratingFound = await ProductModel.findOne(
            {
                _id: productId,
                "reviews.ratedBy": review.ratedBy
            }
        )
        console.log(ratingFound)
        if (ratingFound) {
            return res.status(208).json({ message: "You have already rated this product", ratingFound })
        }

        else {
            const productFoundAndRatingUpdated = await ProductModel.findByIdAndUpdate(
                { _id: productId },
                {
                    $push: { reviews: review }                   // Setting the New Quantity of the existing product
                },
                {
                    new: true,                                      // It ensures that the updated document is returned
                    useFindAndModify: false
                }
            ).populate("reviews.ratedBy")
            if (productFoundAndRatingUpdated) {
                return res.status(201).json({ message: "You review is submitted successfully.", productFoundAndRatingUpdated })
            }
            else {
                return res.status(404).json({ ProductNotFound: "Product Not Found" })
            }
        }
    }

    catch (error) {
        return res.status(500).send({ message: "Internal Server Error.", error })
    }
}