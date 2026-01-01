import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

/**
 * GET ALL USERS (ADMIN PANEL)
 */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select(
      `
      username
      email
      createdAt
      isOnline
      lastLogin
      lastActive
      lastLogout
      points
      balance
      `
    );

    res.status(200).json(users);
  } catch (error) {
    console.error("Admin users fetch error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * DELETE USER (ADMIN)
 */
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Admin delete error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;
