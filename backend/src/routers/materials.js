import { Router } from "express";
import { list, deleter } from "../controllers/materials.js";
import { authenticate, requireRole } from "../middlewares/auth";

export const materialsRouter = Router()

materialsRouter.use(authenticate)

materialsRouter.get("/materials", list)

//autoriza o delete apenas para quem é admin
materialsRouter.get("materials/:id", requireRole("ADMIN"), deleter)

