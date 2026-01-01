import { CreditCard, Smartphone, Landmark } from "lucide-react";

const methods = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "bank", label: "Bank Transfer", icon: Landmark },
];

const DepositMethods = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {methods.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelect(m.id)}
          className={`
            flex items-center gap-3 p-4 rounded-lg border
            transition
            ${
              selected === m.id
                ? "border-cyan-500 bg-cyan-50 dark:bg-slate-800"
                : "bg-white dark:bg-slate-900 hover:border-cyan-400"
            }
          `}
        >
          <m.icon className="h-5 w-5 text-cyan-500" />
          <span className="font-semibold">{m.label}</span>
        </button>
      ))}
    </div>
  );
};

export default DepositMethods;
