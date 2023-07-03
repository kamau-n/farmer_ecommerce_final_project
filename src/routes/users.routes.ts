import { Router } from "express";
import { deleteUser, getAllUSers } from "../controllers/users.controller";
import { requireAdmin } from "../middleware/requireAdmin.middleware";

const userRouter = Router();


userRouter.get("/users", requireAdmin, getAllUSers)
userRouter.post("/user/delete", requireAdmin, deleteUser)




export default userRouter;