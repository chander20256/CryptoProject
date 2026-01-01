import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { recalculateUserWallet } from "../utils/recalculateWallet.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const result = await login(req, res);

    if (result?.user?._id) {
      // ✅ SELF-HEAL WALLET ON LOGIN
      await recalculateUserWallet(result.user._id);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/register", register);

export default router;
