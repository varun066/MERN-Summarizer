import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    articleId: {type: Number,unique: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true});



export default mongoose.model("Article", articleSchema);

