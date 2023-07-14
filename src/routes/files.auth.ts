import { Router } from "express";
import { deleteFiles, getImages } from "../controllers/handleFiles.controller";
import { requireAdmin } from "../middleware/requireAdmin.middleware";
import { deleteImage } from "../controllers/productController.contoller";

const fileRouter = Router()

fileRouter.post("/file/delete", requireAdmin, deleteFiles)
fileRouter.post("/image/delete", requireAdmin, deleteImage)

fileRouter.get("/files", requireAdmin, getImages)


export default fileRouter;