import React from "react";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Software Engineer",
    quote: "This app completely changed the way I track my job applications. It’s intuitive and incredibly useful!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Smith",
    role: "Data Analyst",
    quote: "The analytics and reminders keep me on top of my job search. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Lisa Ray",
    role: "Product Manager",
    quote: "I love the simplicity and the ability to see all my applications at a glance.",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-base-200 text-base-content py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-primary">What Our Users Say</h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-base-100 shadow-lg rounded-2xl p-6 text-left transition hover:shadow-gray-100"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-base-content/60">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-base-content/80 italic">“{testimonial.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
