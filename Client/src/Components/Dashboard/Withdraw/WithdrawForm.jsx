const WithdrawForm = ({
  amount,
  setAmount,
  method,
  setMethod,
  details,
  setDetails,
  onSubmit,
  loading,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Withdraw Funds
      </h2>

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Enter amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="
          w-full px-4 py-3 rounded-lg
          bg-white dark:bg-slate-950
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-white
          placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500
        "
      />

      {/* METHOD */}
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="
          w-full px-4 py-3 rounded-lg
          bg-white dark:bg-slate-950
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-cyan-500
        "
      >
        <option value="upi">UPI</option>
        <option value="bank">Bank Transfer</option>
      </select>

      {/* DETAILS */}
      <textarea
        placeholder={
          method === "upi"
            ? "Enter UPI ID"
            : "Enter Bank Account Details"
        }
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        rows={3}
        className="
          w-full px-4 py-3 rounded-lg
          bg-white dark:bg-slate-950
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-white
          placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500
        "
      />

      {/* SUBMIT */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="
          w-full py-3 rounded-lg font-semibold
          bg-cyan-500 hover:bg-cyan-600
          text-white transition
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? "Submitting..." : "Request Withdraw"}
      </button>
    </div>
  );
};

export default WithdrawForm;
