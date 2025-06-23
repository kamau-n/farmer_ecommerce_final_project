import { Router } from "express";
import {
  createRoom,
  deleteConversation,
  fetchChats,
  getChatRoom,
  getChatRoomData,
  mediaUpload,
} from "../controllers/roomHandler.controller";
import { requireUser } from "../middleware/requireUser.middleware";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const chatRouter = Router();

/**
 * @swagger
 * /chat/create:
 *   post:
 *     summary: Create a new chat room
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Chat room created
 */
chatRouter.post("/chat/create", requireUser, createRoom);

/**
 * @swagger
 * /chat/getchatroom:
 *   get:
 *     summary: Get chat rooms for authenticated user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of chat rooms
 */
chatRouter.get("/chat/getchatroom", requireUser, getChatRoom);

/**
 * @swagger
 * /chat/getchats:
 *   post:
 *     summary: Fetch messages in a chat room
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chat messages fetched
 */
chatRouter.post("/chat/getchats", fetchChats);

/**
 * @swagger
 * /chat/mediaUpload:
 *   post:
 *     summary: Upload media to a chat
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Media uploaded
 */
chatRouter.post("/chat/mediaUpload", upload, mediaUpload);

/**
 * @swagger
 * /chats/delete:
 *   post:
 *     summary: Delete a conversation
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chat deleted
 */
chatRouter.post("/chats/delete", requireUser, deleteConversation);

/**
 * @swagger
 * /chats/data:
 *   get:
 *     summary: Get additional data about chat rooms
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat room metadata
 */
chatRouter.get("/chats/data", requireUser, getChatRoomData);

export default chatRouter;
