import { Router } from "express";
import { deleteFiles } from "../controllers/handleFiles.controller";

const fileRouter = Router()

fileRouter.post("/file/delete", deleteFiles)


export default fileRouter;