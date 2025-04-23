import React from "react";
import { Briefcase, CheckCircle, Clock, PieChart } from "lucide-react";

const features = [
  {
    title: "Application Tracking",
    description: "Track every job application with status updates like applied, interview, and offer received.",
    icon: <Briefcase className="w-6 h-6 text-primary" />,
  },
  {
    title: "Smart Reminders",
    description: "Never miss a follow-up. Stay on top of deadlines with timely reminders.",
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    title: "Progress Dashboard",
    description: "Visualize your progress with charts and analytics to keep you motivated.",
    icon: <PieChart className="w-6 h-6 text-primary" />,
  },
  {
    title: "Custom Tags & Notes",
    description: "Add personalized tags and notes to keep your job hunt tailored to your style.",
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-base-200 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">Features That Work for You</h2>
        <p className="text-base-content/70 max-w-xl mx-auto mb-12">
          Everything you need to stay organized, focused, and confident during your job search.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-2xl shadow-md p-6 text-left transition hover:shadow-xl"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-base-content/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
