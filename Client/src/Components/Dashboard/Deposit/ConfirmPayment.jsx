// const ConfirmPayment = ({ onConfirm, loading }) => (
//   <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
//     <p className="text-sm mb-4">
//       Complete payment and click confirm.
//     </p>
//     <button
//       onClick={onConfirm}
//       disabled={loading}
//       className="w-full py-3 bg-cyan-500 text-white rounded-lg"
//     >
//       {loading ? "Submitting..." : "I Have Completed Payment"}
//     </button>
//   </div>
// );

// export default ConfirmPayment;


const ConfirmPayment = ({ onConfirm, loading }) => {
  return (
    <div
      className="
        mt-6 rounded-xl p-4
        bg-amber-50 border border-amber-200
        dark:bg-slate-900 dark:border-slate-700
        transition-colors
      "
    >
      <p
        className="
          text-sm mb-4
          text-amber-800
          dark:text-slate-300
        "
      >
        After completing the payment using the selected method,
        click confirm to submit your deposit.
      </p>

      <button
        onClick={onConfirm}
        disabled={loading}
        className="
          w-full py-3 rounded-lg font-semibold
          bg-cyan-500 text-white
          hover:bg-cyan-600
          active:scale-[0.99]
          disabled:opacity-60
          disabled:cursor-not-allowed
          transition-all
        "
      >
        {loading ? "Submitting..." : "I Have Completed Payment"}
      </button>
    </div>
  );
};

export default ConfirmPayment;
