import express from "express";
import Deposit from "../models/Deposit.model.js";
import User from "../models/User.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, amount, paymentMethod } = req.body;

    // 🔒 HARD VALIDATION
    if (
      !userId ||
      !paymentMethod ||
      !["card", "upi", "bank"].includes(paymentMethod)
    ) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const POINT_RATE = 10;
    const points = numericAmount * POINT_RATE;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ POINTS ONLY
    user.points += points;
    await user.save();

    const deposit = await Deposit.create({
      userId,
      amount: numericAmount,
      points,
      method: paymentMethod,
      status: "approved",
    });

    return res.status(200).json({
      message: "Deposit successful",
      wallet: {
        points: user.points,
        balance: user.balance,
      },
      deposit,
    });
  } catch (err) {
    console.error("🔥 DEPOSIT ERROR:", err);
    return res.status(500).json({
      message: "Deposit failed",
      error: err.message,
    });
  }
});

router.get("/history/:userId", async (req, res) => {
  try {
    const history = await Deposit.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "History fetch failed" });
  }
});

export default router;
