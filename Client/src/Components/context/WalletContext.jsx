import { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({ points: 0, balance: 0 });

  const fetchWallet = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const res = await fetch(`/api/wallet?userId=${userId}`);
    if (!res.ok) return;

    const data = await res.json();
    setWallet({
      points: data.points ?? 0,
      balance: data.balance ?? 0,
    });
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, setWallet, fetchWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
