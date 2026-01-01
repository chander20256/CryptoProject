import React, { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Active Users", value: 12450, suffix: "+", animate: true },
  { label: "Total Sessions", value: 1.2, suffix: "M+", animate: true },
  { label: "Rewards Distributed", value: 540, prefix: "$", suffix: "K+", animate: true },
  { label: "Platform Availability", value: "24 / 7", animate: false },
];

const Stats = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [counts, setCounts] = useState(
    stats.map((stat) => (stat.animate ? 0 : stat.value))
  );

  /* Start animation when visible */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Animate numbers */
  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);

      setCounts(
        stats.map((stat) => {
          if (!stat.animate) return stat.value;
          return Number((stat.value * progress).toFixed(1));
        })
      );

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="
        relative z-10
        py-16 sm:py-20
        bg-white dark:bg-slate-950
        border-y border-slate-200 dark:border-slate-800
        transition-colors
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                relative rounded-xl p-4 sm:p-6
                bg-slate-100 dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
              "
            >
              {/* NUMBER */}
              <div
                className="
                  font-bold
                  text-cyan-500
                  text-2xl sm:text-3xl md:text-4xl
                  leading-tight
                  break-words
                  tabular-nums
                "
              >
                {stat.prefix || ""}
                {counts[index]}
                {stat.suffix || ""}
              </div>

              {/* LABEL */}
              <div className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>

              {/* ACCENT */}
              <span
                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-8 sm:w-10 h-0.5
                  bg-cyan-500/40
                  rounded-full
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
