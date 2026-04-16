import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import candidateRoutes from "./routes/candidates.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai-resume-screener";

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected:", mongoUri))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });

app.use("/api/candidates", candidateRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", backend: "mongodb" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
