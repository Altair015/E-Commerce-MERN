import { Router } from "express";
import { addProductRating, createProduct, deleteProduct, getProduct, getProducts, sampleProducts, updateProduct } from "../controllers/ProductController.js";

import authJwt from "../middlewares/authJwt.js";
import uploadImage from "../middlewares/imageUpload.js";

const productRouter = Router();

// productRouter.post("/uploadImage", uploadImage.single("file"), uploadProductImage);
productRouter.post("/createitem", uploadImage.single("file"), createProduct);
productRouter.get("/getitems/:userType/:userId/:filter", getProducts);
productRouter.get("/getproduct/:productId", getProduct);
productRouter.put("/updateitem", uploadImage.single("file"), updateProduct);
productRouter.delete("/deleteitem/:id", authJwt, deleteProduct);
productRouter.put("/addRating", addProductRating);
productRouter.post("/sampleproducts", sampleProducts);

export default productRouter;