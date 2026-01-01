import express from "express";
import Withdraw from "../models/Withdraw.model.js";
import User from "../models/User.model.js";

const router = express.Router();

/**
 * USER REQUEST WITHDRAW
 */
router.post("/", async (req, res) => {
  try {
    const { userId, amount, method } = req.body;

    if (!userId || !amount || amount <= 0 || !method) {
      return res.status(400).json({ message: "Invalid withdraw data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // ⛔ DO NOT DEDUCT BALANCE YET
    await Withdraw.create({
      userId,
      amount,
      method,
      status: "pending",
    });

    res.status(200).json({ message: "Withdraw request submitted" });
  } catch (err) {
    console.error("Withdraw request error:", err);
    res.status(500).json({ message: "Withdraw failed" });
  }
});

export default router;
