import Article from "../models/Article.js";
import User from "../models/User.js";

export const createArticle = async (req, res) => {
    const { title, content } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

const lastArticle = await Article.findOne({ articleId: { $exists: true } })
      .sort({ articleId: -1 })
      .lean();
      
 const nextArticleId =
      lastArticle && !isNaN(lastArticle.articleId)
        ? Number(lastArticle.articleId) + 1
        : 101;

    const article = new Article({articleId: nextArticleId,
      title,
      content,
      createdBy: user._id,
    createdAt: new Date(),
});
    await article.save();
    res.json({ message: "Article created successfully", article });
};

export const getArticles = async (req, res) => {
    const articles = await Article.find().populate("createdBy", "name email").sort({ articleId: 1 });
    res.json(articles);
};

export const getArticleByArticleId = async (req, res) => {
    const{articleId}=req.params;

    const aricle=await Article.findOne({articleId:articleId}).populate("createdBy","name email");
    if(!aricle){
        return res.status(404).json({message:"Article not found"});
    }
    res.json(aricle);
};

export const updateArticle = async (req, res) => {
    const article = await Article.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json({ message: "Article updated successfully", article });
};

export const deleteArticle = async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
};