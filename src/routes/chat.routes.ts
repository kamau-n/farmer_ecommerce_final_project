import { Router } from "express";
import { createChats, createRoom, fetchChats, getChatRoom } from "../controllers/roomHandler.controller";
import { requireUser } from "../middleware/requireUser.middleware";


const chatRouter = Router()

chatRouter.post("/chat/create", requireUser, createRoom)
chatRouter.post("/chat/begin", requireUser, createChats)
chatRouter.get("/chat/getchatroom", requireUser, getChatRoom)
chatRouter.post("/chat/getchats", fetchChats)


export default chatRouter;