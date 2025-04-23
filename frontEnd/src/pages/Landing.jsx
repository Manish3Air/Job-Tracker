import React from "react";
import PlansSection from "../components/PlanSection";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";


const LandingPage = () => {
  return (
    <div className="bg-base-100 text-base-content">
      <main>
        <HeroSection />
        <Features />
        <Testimonials />
        <PlansSection />
        <CallToAction />
      </main>
    </div>
  );
};

export default LandingPage;
