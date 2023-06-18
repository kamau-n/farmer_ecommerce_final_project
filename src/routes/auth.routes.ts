import { Express } from "express";
import { Router } from "express";

import { getUser, signIn, signOut } from "../controllers/signIn.controller"
import { signUp } from "../controllers/signUp.controller";
import { requireUser } from "../middleware/requireUser.middleware";

const authRouter = Router()


authRouter.post("/login", signIn)

authRouter.post("/register", signUp)

authRouter.get('/getUser', requireUser, getUser)

authRouter.get("/logout", signOut)



export default authRouter;