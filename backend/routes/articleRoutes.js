import express from "express";
import  authMiddleware  from "../middleware/authMiddleware.js";
import {  createArticle,getArticles,getArticleByArticleId,updateArticle,deleteArticle, } from "../controllers/articleController.js";

const router = express.Router();

//router.use(authMiddleware);


router.post("/",authMiddleware, createArticle);
router.get("/",authMiddleware, getArticles);
router.get("/:articleId",authMiddleware, getArticleByArticleId);
router.put("/:id",authMiddleware, updateArticle);
router.delete("/:id",authMiddleware, deleteArticle);

export default router;