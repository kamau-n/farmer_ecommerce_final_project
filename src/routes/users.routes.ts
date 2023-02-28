import { Router } from "express";
import { deleteUser, getAllUSers, resetPassword, updateUser } from "../controllers/users.controller";
import { requireAdmin } from "../middleware/requireAdmin.middleware";

const userRouter = Router();


userRouter.get("/users", requireAdmin, getAllUSers)
userRouter.post("/user/delete", requireAdmin, deleteUser)
userRouter.post("/user/reset", resetPassword)
userRouter.post("/user/update/make-admin", requireAdmin, updateUser)



export default userRouter;