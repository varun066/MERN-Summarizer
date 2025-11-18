import Summary from "../models/Summary.js";
import fetch from "node-fetch";
import Article from "../models/Article.js";

export const summarizeArticle = async (req, res) => {
  try {
    const { title, originalText } = req.body;
    const userId = req.user.id; 

    if (!title || !originalText ) {
      return res.status(400).json({ message: "Title and content, article ID are required" });
    }

    //perplexity api call
    const pplxRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PPLX_API_KEY}`,
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes text clearly in 100 words.",
          },
          {
            role: "user",
            content: `Summarize the following article in about 100 words:\n\n${originalText}`,
          },
        ],
      }),
    });

    const data = await pplxRes.json();
    const summarizedText = data?.choices?.[0]?.message?.content?.trim() || "Summary unavailable.";

    
    const newSummary = await Summary.create({
      
      title,
      originalText,
      summarizedText,
      userId,
    });

    res.status(201).json({ message: "Summary created", summary: newSummary });
  } catch (err) {
    console.error("Summarization error:", err);
    res.status(500).json({ message: "Failed to summarize article", error: err.message });
  }
};

export const getSummaryByArticleId = async (req, res) => {
  try {
    const { articleId } = req.params;

const article = await Article.findOne({ articleId });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const summary = await Summary.findOne({ title: article.title });
      

    if (!summary) {
      return res.status(404).json({ message: "Summary not found" });
    }

    res.status(200).json(summary);
  } catch (err) {
    console.error("Get summary error:", err);
    res.status(500).json({ message: "Failed to get summary", error: err.message });
  }
};


export const getUserSummaries =async(req,res)=>{
    try{
        const userId=req.user.id;
        const summaries=await Summary.find({userId}).sort({createdAt:-1});
        res.status(200).json({summaries});
    }catch(err){
        console.error("Get summaries error:",err);
        res.status(500).json({message:"Failed to get summaries",error:err.message});
    }
};