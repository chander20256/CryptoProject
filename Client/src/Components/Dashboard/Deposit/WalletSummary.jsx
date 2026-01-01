import { useWallet } from "../../context/WalletContext";

const WalletSummary = () => {
  const { wallet } = useWallet();

  return (
    <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-6 h-fit">
      <h2 className="text-lg font-semibold mb-6">Wallet Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Balance</span>
          <span className="font-semibold text-green-600">
            ₹{wallet.balance}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Points</span>
          <span className="font-semibold text-cyan-600">
            {wallet.points}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletSummary;
