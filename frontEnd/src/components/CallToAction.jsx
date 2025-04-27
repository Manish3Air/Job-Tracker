import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-base-200 text-primary-content py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
          Ready to take control of your job search?
        </h2>
        <p className="text-lg mb-8 text-base-content/90">
          Start tracking your applications, setting goals, and staying organized—all in one place.
        </p>
        <Link
          to="/register"
          className="btn btn-outline btn-secondary px-6 text-lg"
          //className="btn btn-outline btn-secondary px-6 text-lg"
        >
          Get Started For Free
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
