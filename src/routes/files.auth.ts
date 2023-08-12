import { Router } from "express";
import { deleteFiles, getImages } from "../controllers/handleFiles.controller";
import { requireAdmin } from "../middleware/requireAdmin.middleware";
import { deleteImage } from "../controllers/productController.contoller";
import { requireUser } from "../middleware/requireUser.middleware";

const fileRouter = Router()

fileRouter.post("/file/delete", requireAdmin, deleteFiles)
fileRouter.post("/image/delete", requireUser, deleteImage)

fileRouter.get("/files", requireAdmin, getImages)


export default fileRouter;