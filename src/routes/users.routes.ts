import { Router } from "express";
import { deleteUser, getAllUSers, resetPassword } from "../controllers/users.controller";
import { requireAdmin } from "../middleware/requireAdmin.middleware";

const userRouter = Router();


userRouter.get("/users", requireAdmin, getAllUSers)
userRouter.post("/user/delete", requireAdmin, deleteUser)
userRouter.post("/user/reset", resetPassword)




export default userRouter;