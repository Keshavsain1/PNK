// src/components/TestimonialCarousel.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import useReveal from "../hooks/useReveal";
import { useReducedMotion } from "framer-motion";

type Testimonial = {
  id: string;
  name: string;
  meta: string;
  rating: number;
  quote: string;
  projectImgs?: string[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Neha & Raj",
    meta: "Jodhpur — Apartment",
    rating: 5,
    quote: "We loved the 3D visuals — it made decisions so much easier. The result exceeded expectations.",
    projectImgs: ["/assets/project-hero-1.jpg", "/assets/project-thumb-1.jpg"],
  },
  {
    id: "t2",
    name: "Ritika Sharma",
    meta: "Jaipur — Home Renovation",
    rating: 5,
    quote: "The team transformed our house into a dream home. Fantastic attention to detail and timely delivery.",
    projectImgs: ["/assets/project-hero-2.jpg", "/assets/project-thumb-2.jpg"],
  },
  {
    id: "t3",
    name: "Amit Verma",
    meta: "Udaipur — Office Fitout",
    rating: 4,
    quote: "Very professional and collaborative. The workspace looks modern and functions perfectly.",
    projectImgs: ["/assets/project-hero-3.jpg", "/assets/project-thumb-3.jpg"],
  },
];

const TestimonialCarousel: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const reveal = useReveal<HTMLDivElement>({ delay: 60, once: true, stableMs: 220 }); // scroll-driven
  const [index, setIndex] = useState(0);
  const animRef = useRef(false); // to avoid double triggers when manually navigating

  // manual navigation functions
  const goTo = useCallback((i: number) => {
    if (i === index) return;
    if (reduceMotion) { setIndex(i); return; }
    if (animRef.current) { setIndex(i); animRef.current = false; return; }
    animRef.current = true;
    // small exit/enter animation timing (match useReveal stable ms moderately)
    setTimeout(() => {
      setIndex(i);
      setTimeout(() => {
        animRef.current = false;
      }, 360); // enter animation duration
    }, 240); // exit animation duration
  }, [index, reduceMotion]);

  const goPrev = useCallback(() => goTo((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [index, goTo]);
  const goNext = useCallback(() => goTo((index + 1) % TESTIMONIALS.length), [index, goTo]);

  // keyboard nav (only when visible)
  useEffect(() => {
    if (!reveal.visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reveal.visible, goPrev, goNext]);

  const t = TESTIMONIALS[index];

  return (
    <section aria-label="Client testimonials" className="relative py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          <div className="hidden lg:flex lg:col-span-1 items-start pl-2" aria-hidden>
            <svg width="90" height="140" viewBox="0 0 90 140" fill="none" className="opacity-10">
              <path d="M18 18h26v48H18zM58 18h26v48H58z" fill="#E6B566" />
            </svg>
          </div>

          <div className="lg:col-span-7">
            <div ref={reveal.ref} className="relative bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-lg overflow-visible">
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(247,243,236,0.8), rgba(255,255,255,0.98))", zIndex: 0 }}
                aria-hidden
              />
              <div
                className="relative z-10 transition-all"
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: reduceMotion ? "0ms" : "420ms",
                  opacity: reveal.visible ? 1 : 0,
                  transform: reveal.visible ? "translateY(0)" : "translateY(10px)",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div>
                        <div className="text-lg font-semibold text-[#0b1220]">{t.name}</div>
                        <div className="text-sm text-gray-500">{t.meta}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-[#F6C23E] mb-4" aria-hidden>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="#F6C23E" className="inline-block mr-1" />
                      ))}
                    </div>

                    <blockquote className="text-gray-800 italic text-base leading-relaxed">“{t.quote}”</blockquote>
                  </div>

                  <div className="hidden md:flex flex-col items-center space-y-3">
                    <button onClick={goPrev} aria-label="Previous testimonial" className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:bg-gray-50 transition">‹</button>
                    <button onClick={goNext} aria-label="Next testimonial" className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:bg-gray-50 transition">›</button>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <div className="flex gap-3">
                    {TESTIMONIALS.map((_, i) => (
                      <button key={i} onClick={() => goTo(i)} aria-label={`Show testimonial ${i + 1}`} className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-[#E6B566] scale-110" : "bg-gray-300 hover:bg-gray-400"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-4 items-center justify-center">
            <div className="flex flex-col gap-4 items-end">
              { (t.projectImgs || []).slice(0,2).map((src, i) => (
                <div key={i} className={`rounded-lg overflow-hidden shadow-lg border border-gray-100 ${i===0 ? "w-56 h-28 -translate-x-4" : "w-56 h-36"}`}>
                  <img src={src} alt={`project ${i+1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )) }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
