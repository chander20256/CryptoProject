import Deposit from "../models/Deposit.model.js";
import Withdraw from "../models/Withdraw.model.js";
import User from "../models/User.model.js";

export const recalculateUserWallet = async (userId) => {
  // 🔹 SUM APPROVED DEPOSIT POINTS
  const depositAgg = await Deposit.aggregate([
    { $match: { userId, status: "approved" } },
    { $group: { _id: null, totalPoints: { $sum: "$points" } } },
  ]);

  const totalPoints = depositAgg[0]?.totalPoints || 0;

  // 🔹 SUM APPROVED WITHDRAW AMOUNT (cash)
  const withdrawAgg = await Withdraw.aggregate([
    { $match: { userId, status: "approved" } },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
  ]);

  const withdrawnCash = withdrawAgg[0]?.totalAmount || 0;

  // 🔹 UPDATE USER (DERIVED STATE)
  await User.findByIdAndUpdate(userId, {
    points: totalPoints,
    balance: withdrawnCash < 0 ? 0 : withdrawnCash,
  });
};
