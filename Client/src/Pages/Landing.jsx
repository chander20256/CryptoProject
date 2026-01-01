import React from "react";

import Navbar from "../Components/Global/Navbar";
import Footer from "../Components/Global/Footer";

import Hero from "../Components/Landing/Hero";
import Stats from "../Components/Landing/Stats";
import Features from "../Components/Landing/Features";
import HowItWorks from "../Components/Landing/HowItWorks";
import CTA from "../Components/Landing/CTA";

const Landing = () => {
  return (
    <>
      {/* GLOBAL NAV */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="pt-16">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <CTA />
      </main>

      {/* GLOBAL FOOTER */}
      <Footer />
    </>
  );
};

export default Landing;
