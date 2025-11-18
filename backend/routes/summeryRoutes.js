import express from "express";
import  authMiddleware  from "../middleware/authMiddleware.js";
import { summarizeArticle,getUserSummaries,getSummaryByArticleId } from "../controllers/summeryController.js";

const router = express.Router();

// router.use(authMiddleware);

router.post("/",authMiddleware, summarizeArticle);
router.get("/history",authMiddleware, getUserSummaries);
router.get("/:articleId",authMiddleware, getSummaryByArticleId);


export default router;