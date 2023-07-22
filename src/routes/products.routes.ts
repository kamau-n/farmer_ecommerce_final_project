import { Router } from "express";
import { Product } from "../models/product.model";
import { deleteProduct, getProductById, getProducts, getUserProducts, imageUpload, productCategory, productPromotedDelete, productPromotedRevoke, productPromotedUpdate, promoteProduct, promotedProduct, promotedProducts, uploadProduct, userById } from "../controllers/productController.contoller";
import multer from "multer";
import { requireUser } from "../middleware/requireUser.middleware";
import { requireAdmin } from "../middleware/requireAdmin.middleware";

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


productRouter.post("/product/upload", requireUser, uploadProduct)
productRouter.get("/products", getProducts)

productRouter.post("/product/images/upload", upload, imageUpload)
productRouter.post("/product/id", getProductById)
productRouter.post("/products/category", productCategory)
productRouter.get("/products/user", requireUser, getUserProducts)
productRouter.post("/products/user/id", requireAdmin, userById)
productRouter.post("/product/delete", requireUser, deleteProduct)
productRouter.post("/product/promote", requireUser, promoteProduct)
productRouter.post("/product/promote/update", requireAdmin, productPromotedUpdate)
productRouter.post("/product/promote/revoke", requireAdmin, productPromotedRevoke)
productRouter.post("/product/promote/delete", requireAdmin, productPromotedDelete)
productRouter.get("/products/promoted", promotedProducts)

productRouter.get("/products/promoted/get", promotedProduct)



export default productRouter;