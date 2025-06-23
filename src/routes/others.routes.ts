import { Router } from "express";
import { addPayment, createPackage, deletePackage, editPackages, getComplaints, getPackages, getPayments, setComplaint } from "../controllers/others.controllers";
import { requireAdmin } from "../middleware/requireAdmin.middleware";
import { requireUser } from "../middleware/requireUser.middleware";


const otherRouters = Router()

otherRouters.post("/complaints", setComplaint)
otherRouters.get("/complaints", requireAdmin, getComplaints)
otherRouters.post("/product/promoted/payment", requireUser, addPayment)
otherRouters.get("/promoted/product/payment", requireUser, getPayments)
otherRouters.get("/packages", getPackages)
otherRouters.post("/packages/create", requireAdmin, createPackage)
otherRouters.post("/packages/edit", requireAdmin, editPackages)
otherRouters.post("/packages/delete", requireAdmin, deletePackage)





export default otherRouters;