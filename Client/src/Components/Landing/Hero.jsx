import React from "react";
import {
  ArrowRight,
  Coins,
  Gamepad2,
  Trophy,
  Wallet,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white dark:bg-slate-950 transition-colors">


 {/* BACKGROUND GLOWS */}
<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

  {/* FIRST GLOW (TOP-LEFT → CLOCKWISE) */}
  <div
    className="absolute w-full h-full animate-glow-edge"
    style={{ animationDuration: "50s" }}
  >
    <div
      className="
        absolute top-0 left-0
        rounded-full blur-3xl
        bg-cyan-500/40

        w-28 h-28
        sm:w-40 sm:h-40
        md:w-56 md:h-56
        lg:w-80 lg:h-80
      "
    />
  </div>

  {/* SECOND GLOW (BOTTOM-RIGHT → OPPOSITE POSITION) */}
  <div
    className="absolute w-full h-full animate-glow-edge"
    style={{
      animationDuration: "50s",
      animationDelay: "-25s", // ⬅️ keeps it opposite
    }}
  >
    <div
      className="
        absolute bottom-0 right-0
        rounded-full blur-3xl
        bg-emerald-400/35

        w-24 h-24
        sm:w-36 sm:h-36
        md:w-52 md:h-52
        lg:w-72 lg:h-72
      "
    />
  </div>

</div>


      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <div
              className="
                inline-flex items-center gap-2 rounded-full px-4 py-1
                text-sm font-medium mb-6
                border border-cyan-500/20
                text-cyan-600 dark:text-cyan-400
                bg-cyan-500/10
              "
            >
              <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              Live Games · Real Tokens
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
              Deposit.
              <br />
              <span className="text-cyan-500">Play Smart.</span>
              <br />
              Win Real Rewards.
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
              Convert your balance into tokens, enter competitive games,
              and earn rewards based on performance.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <a
                href="/dashboard"
                className="
                  h-12 px-8 rounded-full font-semibold text-lg
                  bg-cyan-500 hover:bg-cyan-600
                  text-white
                  shadow-lg shadow-cyan-500/30
                  transition-transform hover:-translate-y-1
                  flex items-center justify-center
                "
              >
                Start Playing
              </a>

              <a
                href="#how"
                className="
                  group flex items-center justify-center gap-2
                  text-slate-600 dark:text-slate-300
                  hover:text-cyan-500 transition
                "
              >
                How it Works
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-sm font-semibold">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Secure Deposits
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Coins className="h-5 w-5 text-yellow-500" />
                Token-Based Entry
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className="
                relative w-full max-w-md rounded-2xl p-6 shadow-2xl
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
              "
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Your Balance
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    $120.00
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-cyan-500" />
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className="
                    flex items-center justify-between p-4 rounded-xl
                    bg-slate-100 dark:bg-slate-800
                    border border-slate-200 dark:border-slate-700
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Coins className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Convert to Tokens
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Instant
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-cyan-500">+600 ICE</span>
                </div>

                <div
                  className="
                    flex items-center justify-between p-4 rounded-xl
                    bg-slate-100 dark:bg-slate-800
                    border border-slate-200 dark:border-slate-700
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Gamepad2 className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Enter Game
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Token required
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-600 dark:text-slate-300">
                    Ready
                  </span>
                </div>
              </div>

              <button className="mt-6 w-full h-12 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-black transition">
                Play Now
              </button>
            </div>

            {/* FLOATING BADGE */}
            <div
              className="
                hidden lg:flex absolute -top-6 -right-6
                rounded-xl px-4 py-3 shadow-xl
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
              "
            >
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Reward Unlocked
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
