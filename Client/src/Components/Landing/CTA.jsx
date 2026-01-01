import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section
      className="
        relative overflow-hidden
        py-20 sm:py-24
        bg-white dark:bg-slate-950
        transition-colors
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="
            absolute top-1/2 left-1/2
            w-[500px] h-[500px]
            -translate-x-1/2 -translate-y-1/2
            bg-cyan-500/20 blur-3xl rounded-full
          "
        />
        <div
          className="
            absolute bottom-0 right-0
            w-72 h-72
            bg-emerald-500/15 blur-3xl rounded-full
          "
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
          Start Playing Today
        </h2>

        <p className="max-w-2xl mx-auto mb-12 text-slate-600 dark:text-slate-400">
          Access competitive games, track your progress in real time,
          and unlock reward-based outcomes in a secure environment.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* PRIMARY → LOGIN */}
          <Link
            to="/login"
            className="
              px-8 py-4 rounded-lg font-semibold
              bg-cyan-500 hover:bg-cyan-600
              text-white
              shadow-lg shadow-cyan-500/30
              transition-transform hover:-translate-y-1
            "
          >
            Enter Platform
          </Link>

          {/* SECONDARY */}
          <a
            href="#features"
            className="
              px-8 py-4 rounded-lg font-semibold
              border border-slate-300 dark:border-slate-700
              text-slate-700 dark:text-slate-300
              hover:bg-slate-100 dark:hover:bg-slate-900
              transition
            "
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
