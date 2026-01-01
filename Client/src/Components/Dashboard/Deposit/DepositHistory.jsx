import {
  History,
  CheckCircle,
  Clock,
  CreditCard,
  Smartphone,
  Building2,
} from "lucide-react";

const statusStyles = {
  approved: {
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
    label: "Approved",
  },
  pending: {
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    label: "Pending",
  },
};

const methodStyles = {
  card: {
    icon: CreditCard,
    label: "Card",
  },
  upi: {
    icon: Smartphone,
    label: "UPI",
  },
  bank: {
    icon: Building2,
    label: "Bank Transfer",
  },
};

const DepositHistory = ({ data = [] }) => {
  return (
    <div
      className="
        mt-8 mb-8 rounded-xl p-6
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        transition-colors
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <History size={18} className="text-cyan-500" />
          Deposit History
        </h2>

        <span className="text-xs text-slate-500">
          Last {data.length} records
        </span>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
          No deposits recorded yet
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((d) => {
            const status = statusStyles[d.status] || statusStyles.approved;
            const StatusIcon = status.icon;

            const method = methodStyles[d.method];
            const MethodIcon = method?.icon;

            return (
              <div
                key={d._id}
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
                    ₹{d.amount}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    {MethodIcon && (
                      <MethodIcon size={14} className="text-slate-400" />
                    )}
                    <span>{method?.label || "Unknown method"}</span>
                  </div>

                  <div className="text-xs text-slate-500">
                    {new Date(d.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right space-y-1">
                  <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                    +{d.points} pts
                  </div>

                  <div
                    className={`flex items-center justify-end gap-1 text-xs font-medium ${status.color}`}
                  >
                    <StatusIcon size={14} />
                    {status.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DepositHistory;
