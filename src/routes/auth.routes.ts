import { Router } from "express";
import { getUser, signIn, signOut } from "../controllers/signIn.controller";
import { signUp } from "../controllers/signUp.controller";
import { requireUser } from "../middleware/requireUser.middleware";

const authRouter = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login_email
 *               - login_password
 *             properties:
 *              login_email:
 *                 type: string
 *                 format: email
 *               login_password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
authRouter.post("/login", signIn);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *          login_email,
            login_role,
            login_contact,
            login_location,
            login_password,
            login_username,
 *             properties:
 *               login_username:
 *                 type: string
 *              login_email:
 *                 type: string
 *                 format: email
 *               login_password:
 *                 type: string
 *                 format: password
 *               login_location:
 *                    type:string
 *               login_role:
 *                      type:string
 *               login_contact:
 *                       type:string
 *               
 *     responses:
 *       201:
 *         description: User created successfully
 */
authRouter.post("/register", signUp);

/**
 * @swagger
 * /getUser:
 *   get:
 *     summary: Get currently logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
authRouter.get("/getUser", requireUser, getUser);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out
 */
authRouter.get("/logout", signOut);

export default authRouter;
