import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wallet,
  ArrowDownCircle,
} from "lucide-react";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `
      flex items-center gap-3 px-4 py-3 rounded-lg
      text-sm font-semibold
      transition-all duration-200
      ${
        isActive
          ? "bg-cyan-500 text-white shadow-sm"
          : "text-slate-700 hover:bg-slate-100"
      }
    `;

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      {/* LOGO / TITLE */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-900">
          Crypto Project
        </h2>
        <p className="text-xs text-slate-500">Admin Panel</p>
      </div>

      {/* NAVIGATION */}
      <nav className="space-y-1">
        {/* DASHBOARD */}
        <NavLink to="/" end className={linkClass}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        {/* USERS */}
        <NavLink to="/users" className={linkClass}>
          <Users size={18} />
          <span>Users</span>
        </NavLink>

        {/* DEPOSIT HISTORY */}
        <NavLink to="/deposits" className={linkClass}>
          <Wallet size={18} />
          <span>Deposits</span>
        </NavLink>

        {/* WITHDRAW HISTORY */}
        <NavLink to="/withdraws" className={linkClass}>
          <ArrowDownCircle size={18} />
          <span>Withdrawals</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
