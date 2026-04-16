import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  resumeText: { type: String, default: "" },
  skills: { type: [String], default: [] },
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
