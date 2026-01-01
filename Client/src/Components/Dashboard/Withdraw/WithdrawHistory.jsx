import { History, CheckCircle, XCircle, Clock } from "lucide-react";

const statusConfig = {
  approved: {
    label: "Approved",
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-500/10",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-500/10",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
};

const WithdrawHistory = ({ history = [] }) => {
  return (
    <div
      className="
        mt-8 rounded-xl p-6
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        transition-colors
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <History size={18} className="text-cyan-500" />
          Withdraw History
        </h2>

        <span className="text-xs text-slate-500 dark:text-slate-400">
          Last {history.length} records
        </span>
      </div>

      {/* EMPTY STATE */}
      {history.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
          No withdrawals recorded yet
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((w) => {
            const status = statusConfig[w.status] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <div
                key={w._id}
                className="
                  flex items-center justify-between
                  rounded-lg px-4 py-3
                  bg-slate-50 dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                "
              >
                {/* LEFT */}
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    ₹{w.amount}
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {w.method?.toUpperCase()} •{" "}
                    {new Date(w.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className={`
                    flex items-center gap-1
                    text-xs font-semibold
                    px-2 py-1 rounded-full
                    ${status.color} ${status.bg}
                  `}
                >
                  <StatusIcon size={14} />
                  {status.label}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WithdrawHistory;
