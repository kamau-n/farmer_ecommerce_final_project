import { Router } from "express";
import { deleteUser, getAllUSers, resetPassword, updateUser, updateUserDetails } from "../controllers/users.controller";
import { requireAdmin } from "../middleware/requireAdmin.middleware";
import { requireUser } from "../middleware/requireUser.middleware";

const userRouter = Router();


userRouter.get("/users", requireAdmin, getAllUSers)
userRouter.post("/user/delete", requireAdmin, deleteUser)
userRouter.post("/user/reset", resetPassword)
userRouter.post("/user/update/make-admin", requireAdmin, updateUser)
userRouter.post("/user/update/all", requireUser, updateUserDetails)



export default userRouter;