// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Sun,
//   Moon,
//   LogOut,
//   Menu,
//   Wallet,
//   Coins,
//   ChevronDown,
// } from "lucide-react";
// import { useWallet } from "../../context/WalletContext";

// const DashboardNavbar = ({ collapsed, setMobileOpen }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { wallet } = useWallet();

//   const [isDark, setIsDark] = useState(
//     document.documentElement.classList.contains("dark")
//   );
//   const [profileOpen, setProfileOpen] = useState(false);

//   const username = localStorage.getItem("username") || "User";

//   // ✅ SAFE READS
//   const pointsBalance = Number(wallet?.points ?? 0);
//   const cashBalance = Number(wallet?.balance ?? 0);

//   const getTitle = () => {
//     if (location.pathname.includes("deposit")) return "Deposit";
//     if (location.pathname.includes("withdraw")) return "Withdraw";
//     if (location.pathname.includes("games")) return "Games";
//     return "Dashboard";
//   };

//   const toggleTheme = () => {
//     const html = document.documentElement;
//     html.classList.toggle("dark");
//     const dark = html.classList.contains("dark");
//     setIsDark(dark);
//     localStorage.setItem("theme", dark ? "dark" : "light");
//   };

//   const handleLogout = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       if (userId) {
//         await fetch("/api/user/logout", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId }),
//         });
//       }
//     } finally {
//       localStorage.clear();
//       navigate("/login", { replace: true });
//     }
//   };

//   return (
//     <nav
//       className={`
//         fixed top-0 right-0 z-40 h-16 left-0
//         ${collapsed ? "lg:left-20" : "lg:left-48"}
//         px-3 sm:px-6
//         flex items-center justify-between
//         bg-white dark:bg-slate-950
//         border-b border-slate-200 dark:border-slate-800
//       `}
//     >
//       {/* LEFT */}
//       <div className="flex items-center gap-3">
//         <button onClick={() => setMobileOpen(true)} className="lg:hidden">
//           <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
//         </button>
//         <h1 className="font-bold text-slate-900 dark:text-white">
//           {getTitle()}
//         </h1>
//       </div>

//       {/* CENTER (DESKTOP) */}
//       <div className="hidden lg:flex items-center gap-6">
//         <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
//           <Coins className="h-4 w-4 text-cyan-500" />
//           <span className="text-sm font-semibold">
//             {pointsBalance} Points
//           </span>
//         </div>

//         <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
//           <Wallet className="h-4 w-4 text-green-500" />
//           <span className="text-sm font-semibold">
//             ₹{cashBalance}
//           </span>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center gap-3 relative">
//         {/* MOBILE WALLET */}
//         <div className="flex lg:hidden items-center gap-2">
//           <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
//             <Coins className="h-4 w-4 text-cyan-500" />
//             <span className="text-xs font-semibold">{pointsBalance}</span>
//           </div>

//           <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
//             <Wallet className="h-4 w-4 text-green-500" />
//             <span className="text-xs font-semibold">₹{cashBalance}</span>
//           </div>
//         </div>

//         {/* THEME */}
//         <button
//           onClick={toggleTheme}
//           className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
//         >
//           {isDark ? (
//             <Sun className="h-4 w-4 text-yellow-400" />
//           ) : (
//             <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
//           )}
//         </button>

//         {/* PROFILE */}
//         <div className="hidden lg:block">
//           <button
//             onClick={() => setProfileOpen((p) => !p)}
//             className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
//           >
//             <span className="text-sm font-semibold">{username}</span>
//             <ChevronDown className="h-4 w-4" />
//           </button>

//           {profileOpen && (
//             <div className="absolute right-0 top-14 w-44 bg-white dark:bg-slate-900 border rounded-xl shadow-lg">
//               <div className="px-4 py-3 text-sm font-semibold border-b">
//                 {username}
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-slate-800"
//               >
//                 <LogOut className="h-4 w-4" />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default DashboardNavbar;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  LogOut,
  Menu,
  Wallet,
  Coins,
} from "lucide-react";
import { useWallet } from "../../context/WalletContext";

const DashboardNavbar = ({ collapsed, setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wallet } = useWallet();

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const username = localStorage.getItem("username") || "User";

  const pointsBalance = Number(wallet?.points ?? 0);
  const cashBalance = Number(wallet?.balance ?? 0);

  const getTitle = () => {
    if (location.pathname.includes("deposit")) return "Deposit";
    if (location.pathname.includes("withdraw")) return "Withdraw";
    if (location.pathname.includes("games")) return "Games";
    return "Dashboard";
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const dark = html.classList.contains("dark");
    setIsDark(dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await fetch("/api/user/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
      }
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav
      className={`
        fixed top-0 right-0 z-40 h-16 left-0
        ${collapsed ? "lg:left-20" : "lg:left-48"}
        px-3 sm:px-6
        flex items-center justify-between
        bg-white dark:bg-slate-950
        border-b border-slate-200 dark:border-slate-800
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button onClick={() => setMobileOpen(true)} className="lg:hidden">
          <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        </button>
        <h1 className="font-bold text-slate-900 dark:text-white">
          {getTitle()}
        </h1>
      </div>

      {/* CENTER (DESKTOP ONLY) */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
          <Coins className="h-4 w-4 text-cyan-500" />
          <span className="text-sm font-semibold">
            {pointsBalance} Points
          </span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
          <Wallet className="h-4 w-4 text-green-500" />
          <span className="text-sm font-semibold">
            ₹{cashBalance}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* MOBILE WALLET */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
            <Coins className="h-4 w-4 text-cyan-500" />
            <span className="text-xs font-semibold">{pointsBalance}</span>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
            <Wallet className="h-4 w-4 text-green-500" />
            <span className="text-xs font-semibold">₹{cashBalance}</span>
          </div>
        </div>

        {/* THEME TOGGLE (ALL SCREENS) */}
        <button
          onClick={toggleTheme}
          className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-yellow-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
          )}
        </button>

        {/* USERNAME (DESKTOP ONLY) */}
        <span className="hidden lg:block text-sm font-semibold text-slate-900 dark:text-white">
          {username}
        </span>

        {/* LOGOUT (DESKTOP ONLY) */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="hidden lg:flex h-9 w-9 rounded-lg border items-center justify-center text-red-600 hover:bg-red-50 dark:hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
