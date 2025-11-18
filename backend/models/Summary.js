import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  
  title: { type: String, required: true },
  originalText: { type: String, required: true },
  summarizedText: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Summary", summarySchema);
