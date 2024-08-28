import { Router } from "express";
import { addProductRating, createProduct, getProduct, getProducts, sampleProducts, updateProduct } from "../controllers/ProductController.js";

import authJwt from "../middlewares/authJwt.js";
import uploadImage from "../middlewares/imageUpload.js";

const productRouter = Router();

// Adding the product
productRouter.post("/createitem", authJwt, uploadImage.single("file"), createProduct);

// Returing all products.
productRouter.get("/getitems/:userType/:userId/:filter", getProducts);

// Returing specific product.
productRouter.get("/getproduct/:productId", getProduct);

// Updating the specific product.
productRouter.put("/updateitem", authJwt, uploadImage.single("file"), updateProduct);

// Adding product rating.
productRouter.put("/addRating", authJwt, addProductRating);

// Inputting the sample products.
productRouter.post("/sampleproducts", sampleProducts);
// productRouter.post("/sampleproducts", authJwt, sampleProducts);

export default productRouter;