import { Router } from "express";
import { Product } from "../models/product.model";
import { getProductById, getProducts, imageUpload, uploadProduct } from "../controllers/productController.contoller";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");


    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "_" + Math.random() * 1e9

        cb(null, uniqueSuffix + file.originalname);

    }

})

const upload = multer({ storage: storage }).array("image", 6);


const productRouter = Router()


productRouter.post("/product/upload", uploadProduct)
productRouter.get("/products", getProducts)

productRouter.post("/product/images/upload", upload, imageUpload)
productRouter.post("/product/id", getProductById)




export default productRouter;