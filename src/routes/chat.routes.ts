import { Router } from "express";
import { createRoom, deleteConversation, fetchChats, getChatRoom, mediaUpload } from "../controllers/roomHandler.controller";
import { requireUser } from "../middleware/requireUser.middleware";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");


    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + "_" + Math.random() * 1e9

        cb(null, file.originalname);

    }

})

const chatRouter = Router()

const upload = multer({ storage: storage }).single("image");

chatRouter.post("/chat/create", requireUser, createRoom)
// chatRouter.post("/chat/begin", requireUser, createChats)
chatRouter.get("/chat/getchatroom", requireUser, getChatRoom)
chatRouter.post("/chat/getchats", fetchChats)
chatRouter.post("/chat/mediaUpload", upload, mediaUpload)
chatRouter.post("/chats/delete", requireUser, deleteConversation)


export default chatRouter;