import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

/**
 * USER ACTIVITY (heartbeat)
 */
router.post("/activity", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.sendStatus(400);

    await User.findByIdAndUpdate(userId, {
  isOnline: false,
  lastLogout: new Date(),
});


    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

/**
 * USER LOGOUT
 */
router.post("/logout", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.sendStatus(400);

    await User.findByIdAndUpdate(userId, {
      isOnline: false,
      lastLogout: new Date(),
      lastActive: new Date(),
    });

    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

export default router;
