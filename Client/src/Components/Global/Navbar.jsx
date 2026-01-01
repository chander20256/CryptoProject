import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const dark = html.classList.contains("dark");
    setIsDark(dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-colors">
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          h-16
          flex items-center justify-between
        "
      >
        {/* LEFT — LOGO */}
        <Link
          to="/"
          className="
            flex items-center gap-1 sm:gap-2
            text-base sm:text-lg
            font-bold
          "
        >
          <span className="text-slate-900 dark:text-white">ICE</span>
          <span className="text-cyan-500">PLAY</span>
        </Link>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="
              h-8 w-8 sm:h-9 sm:w-9
              rounded-lg
              flex items-center justify-center
              border border-slate-300 dark:border-slate-700
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition
            "
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-yellow-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
            )}
          </button>

          {/* LOGIN */}
          <NavLink
            to="/login"
            className="
              px-3 sm:px-4 py-2
              text-xs sm:text-sm
              font-semibold
              rounded-lg
              text-slate-700 dark:text-slate-300
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition
            "
          >
            Login
          </NavLink>

          {/* SIGN UP */}
          <NavLink
            to="/register"
            className="
              px-3 sm:px-4 py-2
              text-xs sm:text-sm
              font-semibold
              rounded-lg
              bg-cyan-500 hover:bg-cyan-600
              text-white
              transition
            "
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
