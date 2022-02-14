import { Router } from "express";
import DashboardController from "../controllers/Dashboard";

const dashboard = new DashboardController();

const router = Router();

router.get("/", dashboard.index);
router.get("/:slug", dashboard.project);

export default router;
