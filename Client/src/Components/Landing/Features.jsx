import React from "react";

const features = [
  {
    title: "Secure Transactions",
    desc: "All platform transactions are processed with verifiable integrity and system-level validation.",
  },
  {
    title: "Competitive Gameplay",
    desc: "Games are designed around fairness, performance tracking, and controlled reward mechanics.",
  },
  {
    title: "Reward Progression",
    desc: "Earnings are accumulated through gameplay and unlocked through defined progression rules.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
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
            Platform{" "}
            <span className="text-cyan-500">Capabilities</span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            Built with a focus on reliability, fairness, and long-term scalability.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group relative p-8 rounded-2xl
                bg-slate-100 dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                transition
              "
            >
              {/* ACCENT BAR */}
              <div className="mb-4 h-1 w-12 bg-cyan-500 rounded-full" />

              <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.desc}
              </p>

              {/* HOVER GLOW */}
              <div
                className="
                  absolute inset-0 rounded-2xl opacity-0
                  group-hover:opacity-100
                  transition
                  pointer-events-none
                  bg-gradient-to-br from-cyan-500/10 to-transparent
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
