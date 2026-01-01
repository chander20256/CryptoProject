import express from "express";
import Withdraw from "../models/Withdraw.model.js";
import { recalculateUserWallet } from "../utils/recalculateWallet.js";

const router = express.Router();

/**
 * GET ALL WITHDRAW REQUESTS (ADMIN)
 */
router.get("/withdraws", async (req, res) => {
  try {
    const withdraws = await Withdraw.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(withdraws);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch withdraws" });
  }
});

/**
 * APPROVE / REJECT WITHDRAW
 */
router.post("/withdraws/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const withdraw = await Withdraw.findById(req.params.id);
    if (!withdraw) {
      return res.status(404).json({ message: "Withdraw not found" });
    }

    if (withdraw.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    withdraw.status = status;
    await withdraw.save();

    // ✅ REBUILD WALLET FROM SOURCE OF TRUTH
    await recalculateUserWallet(withdraw.userId);

    res.status(200).json({ message: "Withdraw updated" });
  } catch (err) {
    console.error("Admin withdraw update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
