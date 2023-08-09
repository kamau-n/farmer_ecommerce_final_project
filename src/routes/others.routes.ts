import { Router } from "express";
import { addPayment, getComplaints, getPayments, setComplaint } from "../controllers/others.controllers";
import { requireAdmin } from "../middleware/requireAdmin.middleware";
import { requireUser } from "../middleware/requireUser.middleware";


const otherRouters = Router()

otherRouters.post("/complaints", setComplaint)
otherRouters.get("/complaints", requireAdmin, getComplaints)
otherRouters.post("/product/promoted/payment", requireUser, addPayment)
otherRouters.get("/promoted/product/payment", requireUser, getPayments)





export default otherRouters;