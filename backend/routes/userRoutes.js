import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidbar } from "../controllers/userConroller.js";
const router = express.Router()


router.get("/", protectRoute, getUsersForSidbar);

export default router;