import { Router } from "express";
import { getComplaints, setComplaint } from "../controllers/others.controllers";
import { requireAdmin } from "../middleware/requireAdmin.middleware";


const otherRouters = Router()

otherRouters.post("/complaints", setComplaint)
otherRouters.get("/complaints", requireAdmin, getComplaints)




export default otherRouters;