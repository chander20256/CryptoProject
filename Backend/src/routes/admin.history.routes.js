import express from "express";
import Deposit from "../models/Deposit.model.js";
import Withdraw from "../models/Withdraw.model.js";

const router = express.Router();

/**
 * ADMIN – ALL DEPOSITS
 */
router.get("/deposits", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const q = req.query.q || "";

    const skip = (page - 1) * limit;

    const filter = q
      ? {
          $or: [
            { "user.username": { $regex: q, $options: "i" } },
            { "user.email": { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const deposits = await Deposit.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Deposit.countDocuments();

    res.json({
      data: deposits,
      total,
    });
  } catch (err) {
    console.error("Admin deposit fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch deposits" });
  }
});


/**
 * ADMIN – ALL WITHDRAWS
 */
router.get("/withdraws", async (req, res) => {
  try {
    const withdraws = await Withdraw.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(withdraws);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch withdrawals" });
  }
});

export default router;
