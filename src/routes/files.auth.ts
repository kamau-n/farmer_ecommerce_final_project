import { Router } from "express";
import { deleteFiles, getImages } from "../controllers/handleFiles.controller";
import { requireAdmin } from "../middleware/requireAdmin.middleware";

const fileRouter = Router()

fileRouter.post("/file/delete", requireAdmin, deleteFiles)

fileRouter.get("/files", requireAdmin, getImages)


export default fileRouter;