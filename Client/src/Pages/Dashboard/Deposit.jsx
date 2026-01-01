// import { useEffect, useState } from "react";
// import DepositForm from "../../Components/Dashboard/Deposit/DepositForm";
// import DepositPreview from "../../Components/Dashboard/Deposit/DepositPreview";
// import PaymentMethod from "../../Components/Dashboard/Deposit/PaymentMethod";
// import ConfirmPayment from "../../Components/Dashboard/Deposit/ConfirmPayment";
// import WalletSummary from "../../Components/Dashboard/Deposit/WalletSummary";
// import DepositHistory from "../../Components/Dashboard/Deposit/DepositHistory";
// import { useWallet } from "../../Components/context/WalletContext";

// const Deposit = () => {
//   const [amount, setAmount] = useState("");
//   const [method, setMethod] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   const { fetchWallet } = useWallet();
//   const userId = localStorage.getItem("userId");

//   const loadHistory = async () => {
//     const res = await fetch(`/api/deposit/history/${userId}`);
//     const data = await res.json();
//     setHistory(Array.isArray(data) ? data : []);
//   };

//   const handleConfirm = async () => {
//     if (!amount || !method) {
//       alert("Enter amount and select payment method");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/deposit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,
//           amount: Number(amount),
//           paymentMethod: method,
//         }),
//       });

//       if (!res.ok) throw new Error("Deposit failed");

//       await fetchWallet();
//       await loadHistory();

//       setAmount("");
//       setMethod("");
//     } catch {
//       alert("Deposit failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Deposit</h1>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         <div className="xl:col-span-2 space-y-6">
//           <DepositForm amount={amount} setAmount={setAmount} />
//           <DepositPreview amount={amount} />
//           <PaymentMethod method={method} setMethod={setMethod} />
//           {method && (
//             <ConfirmPayment onConfirm={handleConfirm} loading={loading} />
//           )}
//         </div>

//         <WalletSummary />
//       </div>

//       <DepositHistory data={history} />
//     </div>
//   );
// };

// export default Deposit;
import { useState, useEffect } from "react";
import DepositForm from "../../Components/Dashboard/Deposit/DepositForm";
import DepositPreview from "../../Components/Dashboard/Deposit/DepositPreview";
import PaymentMethod from "../../Components/Dashboard/Deposit/PaymentMethod";
import ConfirmPayment from "../../Components/Dashboard/Deposit/ConfirmPayment";
import WalletSummary from "../../Components/Dashboard/Deposit/WalletSummary";
import DepositHistory from "../../Components/Dashboard/Deposit/DepositHistory";
import { useWallet } from "../../Components/context/WalletContext";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const { setWallet, fetchWallet } = useWallet();

  const userId = localStorage.getItem("userId");

  const loadHistory = async () => {
    if (!userId) return;

    const res = await fetch(`/api/deposit/history/${userId}`);
    const data = await res.json();
    setHistory(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (!userId) return;
    loadHistory();
  }, [userId]);



const handleConfirm = async () => {
  if (!userId) {
    alert("Session expired. Please login again.");
    return;
  }

  if (!amount || Number(amount) <= 0) {
    alert("Enter a valid amount");
    return;
  }

  if (!method) {
    alert("Select a payment method");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("/api/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        amount: Number(amount),
        paymentMethod: method,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Deposit failed");
    }

    // 🔥 THIS updates Navbar instantly
    setWallet(data.wallet);

    setAmount("");
    setMethod("");
    loadHistory();
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Deposit</h1>
        <p className="text-sm text-slate-500 mt-1">
          Convert cash into points to play games
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          <DepositForm amount={amount} setAmount={setAmount} />
          <DepositPreview amount={amount} />
          <PaymentMethod method={method} setMethod={setMethod} />

          {method && (
            <ConfirmPayment
              onConfirm={handleConfirm}
              loading={loading}
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="xl:sticky xl:top-20 h-fit">
          <WalletSummary />
        </div>
      </div>

      <DepositHistory data={history} />
    </div>
  );
};

export default Deposit;
