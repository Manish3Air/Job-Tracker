import React from "react";

const plans = [
  {
    title: "Free Plan",
    price: "$0",
    features: [
      "Track up to 10 applications",
      "Basic notifications and reminders",
      "Access to essential analytics",
    ],
    buttonText: "Get Started",
    isPopular: false,
  },
  {
    title: "Pro Plan",
    price: "$9.99/month",
    features: [
      "Track unlimited applications",
      "Advanced notifications and reminders",
      "Customizable tags and notes",
      "Priority support",
    ],
    buttonText: "Upgrade Now",
    isPopular: true,
  },
  {
    title: "Business Plan",
    price: "$29.99/month",
    features: [
      "Track unlimited applications for teams",
      "Team management tools",
      "Detailed analytics and reports",
      "Dedicated support",
    ],
    buttonText: "Contact Us",
    isPopular: false,
  },
];

const PlansSection = () => {
  return (
    <section className="bg-base-200 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
          Choose Your Plan
        </h2>
        <p className="text-base-content/70 max-w-xl mx-auto mb-12">
          Whether you're just getting started or looking for more advanced
          features, we have a plan that's perfect for you.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`max-w-sm bg-base-100 rounded-full shadow-md p-6 text-center transition hover:shadow-amber-100 ${
                plan.isPopular ? "bg-base-100  border-4 border-primary" : ""
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <div className=" flex justify-center items-center ml-13">
                <ul className="list-decimal text-left text-base-content/70 mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}> {feature}</li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-primary w-50 text-center">
                {plan.buttonText}
              </button>
              {plan.isPopular && (
                <p className="mt-4 text-lg font-semibold text-yellow-500">
                  Most Popular
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
