import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, addProductRating, uploadProductImage } from "../controllers/ProductController.js";

import authJwt from "../middlewares/authJwt.js";
import uploadImage from "../middlewares/imageUpload.js";

const productRouter = Router();

productRouter.post("/uploadImage", uploadImage.single("file"), uploadProductImage);
productRouter.post("/createitem", createProduct);
productRouter.get("/getitems", getProducts);
productRouter.put("/updateitem/:id", authJwt, updateProduct);
productRouter.delete("/deleteitem/:id", authJwt, deleteProduct);
productRouter.put("/addRating", addProductRating);

export default productRouter;