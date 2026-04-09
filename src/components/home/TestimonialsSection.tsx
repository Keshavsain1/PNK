import React from "react";
import { Container } from "../ui/Container";
import  TESTIMONIALS  from "constants";
import TestimonialCarousel from "../TestimonialCarousel";

export const TestimonialsSection: React.FC<{ testimonials?: typeof TESTIMONIALS }> = ({
  testimonials = TESTIMONIALS,
}) => {
  return (
    <section className="py-16">
      <Container>
        <h2 className="text-3xl font-serif mb-6">What clients say</h2>
        {/* If you have TestimonialCarousel component, use it; otherwise render static */}
        {typeof TestimonialCarousel === "function" ? (
          <TestimonialCarousel items={testimonials} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">“{t.quote}”</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default TestimonialsSection;
