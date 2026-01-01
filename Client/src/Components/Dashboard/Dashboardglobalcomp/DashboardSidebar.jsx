import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Gamepad2,
  Gift,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

const DashboardSidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  const linkClass = ({ isActive }) =>
    `
      flex items-center
      ${collapsed ? "justify-center" : "gap-3 px-4"}
      py-3 rounded-lg
      text-sm font-semibold
      transition-all duration-300 ease-out
      ${
        isActive
          ? "bg-cyan-500 text-white"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      }
    `;

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
      setMobileOpen(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-screen
        bg-white dark:bg-slate-950
        border-r border-slate-200 dark:border-slate-800

        transform transition-all duration-300 ease-in-out

        /* MOBILE SLIDE */
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        w-64 lg:translate-x-0

        /* DESKTOP WIDTH ANIMATION */
        ${collapsed ? "lg:w-20" : "lg:w-48"}
      `}
    >
      {/* LOGO */}
      <NavLink
        to="/dashboard"
        onClick={handleNavClick}
        className={`h-16 flex items-center transition-all duration-300 ${
          collapsed ? "justify-center" : "px-6"
        }`}
      >
        <span className="text-slate-900 dark:text-white font-bold">ICE</span>
        <span
          className={`
            ml-1 text-cyan-500 font-bold
            transition-all duration-300
            ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
          `}
        >
          PLAY
        </span>
      </NavLink>

      {/* NAV */}
      <nav className="px-2 mt-4 space-y-1">
        <NavLink to="/dashboard" end className={linkClass} onClick={handleNavClick}>
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          <span
            className={`transition-all duration-300 ${
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            Dashboard
          </span>
        </NavLink>

        <NavLink to="/dashboard/deposit" className={linkClass} onClick={handleNavClick}>
          <ArrowDownToLine className="h-5 w-5 shrink-0" />
          <span
            className={`transition-all duration-300 ${
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            Deposit
          </span>
        </NavLink>

        <NavLink to="/dashboard/withdraw" className={linkClass} onClick={handleNavClick}>
          <ArrowUpFromLine className="h-5 w-5 shrink-0" />
          <span
            className={`transition-all duration-300 ${
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            Withdraw
          </span>
        </NavLink>

        <NavLink to="/dashboard/games" className={linkClass} onClick={handleNavClick}>
          <Gamepad2 className="h-5 w-5 shrink-0" />
          <span
            className={`transition-all duration-300 ${
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            Games
          </span>
        </NavLink>

        <NavLink to="/dashboard/rewards" className={linkClass} onClick={handleNavClick}>
          <Gift className="h-5 w-5 shrink-0" />
          <span
            className={`transition-all duration-300 ${
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            Rewards
          </span>
        </NavLink>
      </nav>

      {/* MOBILE USER FOOTER */}
      <div className="absolute bottom-4 left-0 w-full px-3 lg:hidden">
        <div className="border-t pt-3">
          <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold">
            <User className="h-4 w-4" />
            {username}
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* DESKTOP COLLAPSE BUTTON */}
      <div className="absolute bottom-4 left-0 w-full px-2 hidden lg:block">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-11 rounded-lg flex items-center justify-center border hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
