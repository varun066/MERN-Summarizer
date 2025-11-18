import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import summeryRoutes from "./routes/summeryRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import cors from "cors";



dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use(cors());

app.get("/health", (req, res) => {
    res.send("Server is running")});

const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})



app.use("/auth", authRoutes);

app.use("/summeries", summeryRoutes);

app.use("/articles", articleRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;