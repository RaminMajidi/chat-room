import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidbar } from "../controllers/userController.js";
const router = express.Router()


router.get("/sidebar", protectRoute, getUsersForSidbar);

export default router;