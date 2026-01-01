import { Coins, ArrowRight } from "lucide-react";
import { POINT_RATE } from "./constants";

const DepositPreview = ({ amount }) => {
  const numericAmount = Number(amount) || 0;
  const points = numericAmount * POINT_RATE;

  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
      <div className="flex items-center justify-between gap-4 text-sm">
        {/* AMOUNT */}
        <div className="font-semibold text-slate-900 dark:text-white">
          ₹{numericAmount}
        </div>

        {/* ARROW */}
        <ArrowRight className="h-4 w-4 text-slate-400" />

        {/* POINTS */}
        <div className="flex items-center gap-2 font-semibold text-cyan-600 dark:text-cyan-400">
          <Coins className="h-4 w-4" />
          {points} Points
        </div>
      </div>
    </div>
  );
};

export default DepositPreview;
