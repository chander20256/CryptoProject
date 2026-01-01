import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import walletRoutes from "./routes/wallet.js";
import adminHistoryRoutes from "./routes/admin.history.routes.js";
import depositRoutes from "./routes/deposit.routes.js";
import withdrawRoutes from "./routes/withdraw.routes.js";          // ✅ ADD
import adminWithdrawRoutes from "./routes/admin.withdraw.routes.js"; // ✅ ADD

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

// AUTH
app.use("/api/auth", authRoutes);

// USER
app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);

// DEPOSIT
app.use("/api/deposit", depositRoutes);

// WITHDRAW (USER)
app.use("/api/withdraw", withdrawRoutes);

// ADMIN
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminHistoryRoutes);
app.use("/api/admin", adminWithdrawRoutes); // ✅ APPROVE / REJECT

export default app;
