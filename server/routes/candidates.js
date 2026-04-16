import express from "express";
import Candidate from "../models/Candidate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch candidates", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const savedCandidate = await candidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to save candidate", error: error.message });
  }
});

export default router;
