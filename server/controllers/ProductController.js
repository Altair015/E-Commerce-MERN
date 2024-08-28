import ProductModel from "../models/ProductModel.js";
import { averageRating } from "../utilities/utilities.js";

// Creating the product.
export async function createProduct(req, res) {
    const { title, age, description, price, category, quantity, sellerId } = req.body

    let image = req.file;
    if (image) {
        image = req.file.filename
    }
    else {
        image = null;
    }

    if (!sellerId ||
        !title ||
        !age ||
        !description ||
        !price ||
        !category ||
        !quantity) {
        return res.status(401).json({ Entries: "Fields cannot be empty." })
    }

    const addProduct = new ProductModel({ image, title, age, description, price, category, quantity, sellerId, })

    try {
        // To check if the product already exist.
        const productFound = await ProductModel.findOne({ image, title, age, description, price, category, quantity, sellerId, });
        if (productFound) {
            return res.status(208).json({ "message": "Product already exists." })
        }
        else {
            const productSaved = await addProduct.save();
            if (productSaved) {
                const productFound = await ProductModel.findOne({ image, title, age, description, price, category, quantity, sellerId, });
                if (productFound) {
                    return res.status(201).json({ Created: "Product added successfully.", product: productFound.toJSON() })
                }
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

// Controller to return all products for admin and user and seller specific products for seller
export const getProducts = async (req, res) => {
    // for now must be replaced with the data send through the request over axiso
    const { userId, userType, filter } = req.params;
    try {
        const products = await ProductModel.find().populate("sellerId").populate("reviews.ratedBy");
        if (products) {
            let alteredProducts = products;

            if (userType === "seller") {
                alteredProducts = products.filter(
                    (product) => {
                        product = product.toJSON();
                        return product.sellerId.userId === userId;
                    }
                )
            }
            else {
                alteredProducts = products.map(
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
            }
            if (filter !== "null") {
                const searchProducts = alteredProducts;
                alteredProducts = searchProducts.filter(
                    (product) => {
                        return product.title.toUpperCase().includes(filter.trim().toUpperCase());
                    }
                )
            }

            return res.status(201).json({ products: alteredProducts });
        }
        else {
            return res.status(404).json({ Failure: "No Record Found." })
        }
    }
    catch (error) {
        return res.status(500).send({ error: error, message: "Internal Server Error." })
    }
}

// Controller to return specific product.
export const getProduct = async (req, res) => {
    // for now must be replaced with the data send through the request over axiso
    const { productId } = req.params;
    try {
        const productFound = await ProductModel.findById({ _id: productId }).populate("sellerId").populate("reviews.ratedBy");

        if (productFound) {
            // variable to store the average of rating
            const product = productFound.toJSON();
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
            product.rating = avgReview
            return res.status(201).json({ ...product });
        }
        else {
            return res.status(404).json({ Failure: "No Record Found." })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Updating the product details.
export const updateProduct = async (req, res) => {
    const { productId, sellerId, ...rest } = req.body;

    if (req.file) {
        rest.image = req.file.filename
    }
    if (Object.keys(rest).length === 0) {
        return res.status(208).json({ "Info": "No changes performed" });
    }

    try {
        const productUpdated = await ProductModel.findOneAndUpdate(
            {
                _id: productId,
                sellerId
            },
            rest
        ).populate("sellerId").populate("reviews.ratedBy");
        if (productUpdated) {
            return res.status(201).json({ "Success": "Product Updated Successfully", product: productUpdated.toJSON() });
        }
        else {
            return res.status(404).json({ Failure: "No Record Found." })
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error." })
    }
}

// Controller to add rating to a product.
export async function addProductRating(req, res) {
    const { productId, review } = req.body;

    try {
        const ratingFound = await ProductModel.findOne(
            {
                _id: productId,
                "reviews.ratedBy": review.ratedBy
            }
        )
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
            )
                .populate("sellerId")
                .populate(
                    {
                        path: 'reviews',
                        populate: { path: 'ratedBy' }
                    }
                )
            if (productFoundAndRatingUpdated) {
                let product = productFoundAndRatingUpdated.toJSON()

                // variable to store the average of rating

                let avgReview = averageRating(product)

                product.rating = avgReview
                return res.status(201).json({ message: "You review is submitted successfully.", ratedProduct: product })
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

// Controller to save sample Products.
export async function sampleProducts(req, res) {
    const { sampleProducts } = req.body;
    try {
        // Save products to the database using Mongoose's create() method
        const createdProducts = await ProductModel.create(sampleProducts);
        return res.status(201).json({ message: "Sample products inserted successfully." });
    } catch (error) {
        console.error('Error inserting sample products:', error.message);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}