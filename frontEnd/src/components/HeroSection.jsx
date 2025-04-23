import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 px-6 pt-10 lg:pt-20">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary">
            Organize Your Job Hunt Like a Pro
          </h1>
          <p className="text-lg lg:text-xl text-base-content/70">
            Track applications, stay motivated, and land your next job faster with JobTracker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/register" className="btn btn-primary px-6 text-lg">
              Get Started
            </Link>
            <Link to="/docs" className="btn btn-outline btn-secondary px-6 text-lg">
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1">
          <img
            src="/illustrations/job-hunt-hero.svg"
            alt="Job hunt illustration"
            className="w-full max-w-md mx-auto lg:mx-0"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
