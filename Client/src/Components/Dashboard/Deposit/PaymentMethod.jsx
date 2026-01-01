import { CreditCard, Smartphone, Building2 } from "lucide-react";

const PaymentMethod = ({ method, setMethod }) => {
  const methods = [
    { key: "card", label: "Card", icon: CreditCard },
    { key: "upi", label: "UPI", icon: Smartphone },
    { key: "bank", label: "Bank Transfer", icon: Building2 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Payment Method
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {methods.map(({ key, label, icon: Icon }) => {
          const active = method === key;

          return (
            <button
              key={key}
              onClick={() => setMethod(key)}
              className={`
                flex items-center gap-3 p-4 rounded-lg border font-semibold
                transition-all duration-200
                ${
                  active
                    ? "border-cyan-500 bg-cyan-50 text-cyan-700 dark:bg-slate-800 dark:text-cyan-400"
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }
              `}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
