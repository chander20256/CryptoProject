import React from "react";

const steps = [
  {
    title: "Fund Your Account",
    desc: "Add balance to your account to unlock access to competitive gameplay.",
  },
  {
    title: "Access Game Modes",
    desc: "Choose from multiple game formats designed for fair competition.",
  },
  {
    title: "Play & Compete",
    desc: "Engage in skill-based sessions with real-time result tracking.",
  },
  {
    title: "Accumulate Rewards",
    desc: "Performance-based rewards are calculated and recorded securely.",
  },
  {
    title: "Request Payout",
    desc: "Eligible rewards can be redeemed following platform rules.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how"
      className="
        py-16 sm:py-20
        bg-white dark:bg-slate-950
        transition-colors
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            How It{" "}
            <span className="text-cyan-500">Works</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            A simple, transparent flow designed for clarity and control.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="
                relative p-6 rounded-2xl
                bg-slate-100 dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
              "
            >
              {/* STEP LABEL */}
              <div className="mb-4 text-sm font-semibold text-cyan-500">
                Step {index + 1}
              </div>

              <h3 className="text-base font-semibold mb-2 text-slate-900 dark:text-white">
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {step.desc}
              </p>

              {/* LARGE BACKGROUND NUMBER */}
              <div
                className="
                  absolute top-4 right-4
                  text-4xl font-bold select-none
                  text-slate-200 dark:text-slate-800
                "
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
