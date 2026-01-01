import { useEffect, useState } from "react";
import WalletSummary from "../../Components/Dashboard/Deposit/WalletSummary";
import WithdrawForm from "../../Components/Dashboard/Withdraw/WithdrawForm";
import WithdrawHistory from "../../Components/Dashboard/Withdraw/WithdrawHistory";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("upi");
  const [details, setDetails] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const submitWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    if (!details) {
      alert("Enter payment details");
      return;
    }

    try {
      setLoading(true);

      await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount, method, details }),
      });

      setAmount("");
      setDetails("");
      loadHistory();
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    if (!userId) return;
    const res = await fetch(`/api/withdraw/history/${userId}`);
    const data = await res.json();
    setHistory(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Withdraw
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Request withdrawal of your earned cash
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <WithdrawForm
            amount={amount}
            setAmount={setAmount}
            method={method}
            setMethod={setMethod}
            details={details}
            setDetails={setDetails}
            onSubmit={submitWithdraw}
            loading={loading}
          />
        </div>

        <WalletSummary />
      </div>

      <WithdrawHistory history={history} />
    </div>
  );
};

export default Withdraw;
