import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

/**
 * GET USER WALLET (points + balance)
 * Source of truth = User collection
 */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const user = await User.findById(userId).select("points balance");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      points: user.points ?? 0,
      balance: user.balance ?? 0,
    });
  } catch (err) {
    console.error("Wallet fetch error:", err);
    res.status(500).json({ message: "Failed to fetch wallet" });
  }
});

export default router;
