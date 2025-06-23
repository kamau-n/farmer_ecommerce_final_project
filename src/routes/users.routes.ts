import { Router } from "express";
import {
  deleteUser,
  getAllUSers,
  resetPassword,
  updateUser,
  updateUserDetails,
  uploadUserDp,
} from "../controllers/users.controller";
import { requireAdmin } from "../middleware/requireAdmin.middleware";
import { requireUser } from "../middleware/requireUser.middleware";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.random() * 1e9;
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const userRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/users", requireAdmin, getAllUSers);

/**
 * @swagger
 * /user/delete:
 *   post:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
userRouter.post("/user/delete", requireAdmin, deleteUser);

/**
 * @swagger
 * /user/dp:
 *   post:
 *     summary: Upload user profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *         description: Profile picture uploaded
 */
userRouter.post("/user/dp", requireUser, upload, uploadUserDp);

/**
 * @swagger
 * /user/reset:
 *   post:
 *     summary: Reset user password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset initiated
 */
userRouter.post("/user/reset", resetPassword);

/**
 * @swagger
 * /user/update/make-admin:
 *   post:
 *     summary: Promote user to admin
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User promoted to admin
 */
userRouter.post("/user/update/make-admin", requireAdmin, updateUser);

/**
 * @swagger
 * /user/update/all:
 *   post:
 *     summary: Update user profile info
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated
 */
userRouter.post("/user/update/all", requireUser, updateUserDetails);

export default userRouter;
