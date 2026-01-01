const DepositForm = ({ amount, setAmount }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Amount
      </h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="
          w-full px-4 py-3 rounded-lg border
          bg-white dark:bg-slate-950
          border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-white
          placeholder-slate-400 dark:placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-cyan-500
        "
      />
    </div>
  );
};

export default DepositForm;
