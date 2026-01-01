import React from "react";

const Footer = () => {
  return (
    <footer
      className="
        border-t
        bg-white dark:bg-slate-950
        border-slate-200 dark:border-slate-800
        transition-colors
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

          {/* BRAND */}
          <div className="font-medium tracking-wide text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-500 font-semibold">ICEPLAY</span>
          </div>

          {/* LINKS */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="
                text-slate-600 dark:text-slate-400
                hover:text-cyan-500
                transition
              "
            >
              Terms
            </a>
            <a
              href="#"
              className="
                text-slate-600 dark:text-slate-400
                hover:text-cyan-500
                transition
              "
            >
              Privacy
            </a>
            <a
              href="#"
              className="
                text-slate-600 dark:text-slate-400
                hover:text-cyan-500
                transition
              "
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
