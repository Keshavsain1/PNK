// src/pages/Services.tsx
import React, { useRef } from "react";
import * as Lucide from "lucide-react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { services as SERVICES } from "../data/services";
import SEOHead from "../components/SEOHead";
import { useNavigate } from "react-router-dom";

const STATS = [
  { label: "Years of Experience", value: "12+" },
  { label: "Projects Completed", value: "150+" },
  { label: "Design Awards", value: "08" },
  { label: "Happy Clients", value: "100%" },
];

const allowedIds = new Set([
  "interior-design",
  "construction",
  "3d-visualization",
  "renovation",
  "consultation",
]);

type ServiceType = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features?: string[];
  keywords?: string[];
};

const ServiceCard: React.FC<{ service: ServiceType; onExplore: (id: string) => void }> = ({ service, onExplore }) => {
  // Resolve icon component by name from lucide-react, fallback to Home
  const IconComp = (Lucide as any)[service.icon] ?? (Lucide as any).Home;
  const displayTitle = service.id === "construction" ? "Construction & Turnkey" : service.title;

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onExplore(service.id);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onKeyDown={handleKey}
      onClick={() => onExplore(service.id)}
      className="group relative bg-white p-8 border border-gray-100 hover:border-[#B08D57]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#B08D57]/5 flex flex-col h-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6B566]/30"
      aria-label={`Open service ${displayTitle}`}
    >
      <div className="absolute top-0 left-0 w-1 h-0 bg-[#B08D57] transition-all duration-500 group-hover:h-full" />

      <div className="mb-5 text-gray-400 group-hover:text-[#B08D57] transition-colors duration-300">
        <IconComp size={28} />
      </div>

      <h3 className="text-xl font-serif text-gray-900 mb-3 group-hover:translate-x-2 transition-transform duration-300">
        {displayTitle}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
        {service.description}
      </p>

      <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#B08D57] transition-colors">
          Explore
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExplore(service.id);
          }}
          className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#B08D57] group-hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6B566]"
          aria-label={`Explore ${displayTitle}`}
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
};

const ServicesPage: React.FC = () => {
  const seoData = { title: "Services — Younick Design Studio" };
  const visibleServices = (SERVICES || []).filter((s) => allowedIds.has(s.id));
  const navigate = useNavigate();
  const statsRef = useRef<HTMLDivElement | null>(null);

const handleScrollDown = () => {
  statsRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  const goToService = (id: string) => {
    // ensure route exists in your router: /services/:id
    navigate(`/services/${id}`);
  };

  const startProject = () => {
    // navigate to contact (adjust if you want a different route)
    navigate("/contact");
  };

  return (
    <>
      <SEOHead seo={seoData} />

      {/* Hero */}
      <header className="mt-24 relative bg-[#0F0F10] text-white overflow-hidden min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Services Background"
            className="w-full h-full object-cover opacity-40 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight leading-tight">
            Our Expertise
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            We don't just design spaces; we curate experiences. Discover our range of specialized services crafted for modern living.
          </p>

          <button
  onClick={handleScrollDown}
  aria-label="Scroll to services"
  className="animate-bounce p-3 border border-white/20 rounded-full text-white/60 hover:text-white transition"
>
  <ChevronDown size={20} />
    </button>

  </div>
</header>

<main className="bg-white">
        {/* Stats */}
        <div ref={statsRef} className="bg-[#0F0F10] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center px-4">
                  <div className="text-2xl md:text-3xl font-serif text-[#E6B566] mb-1">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <section className="bg-[#FAFAFA] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 md:flex items-end justify-between">
              <div className="max-w-xl">
                <span className="text-[#B08D57] font-bold tracking-widest uppercase text-xs mb-2 block">What We Do</span>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Comprehensive Design Services</h2>
              </div>
              <p className="hidden md:block text-gray-500 max-w-sm text-sm leading-relaxed text-right">
                From concept to completion, we handle every detail so you can enjoy the transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-200">
              {visibleServices.map((s) => (
                <div key={s.id} className="border-r border-b border-gray-200">
                  <ServiceCard service={s} onExplore={goToService} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#B08D57] font-bold tracking-widest uppercase text-xs mb-2 block">How It Works</span>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">The Younick Standard</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  We've refined our process over a decade to ensure clarity, creativity, and precision at every stage. No surprises, just exceptional results.
                </p>
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Discovery", desc: "We meet to discuss your vision, budget, and requirements." },
                    { step: "02", title: "Curation", desc: "We develop concepts, mood boards, and detailed layouts." },
                    { step: "03", title: "Execution", desc: "Our team brings the design to life with expert craftsmanship." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-sm font-serif text-gray-400 group-hover:border-[#B08D57] group-hover:text-[#B08D57] transition-colors duration-300">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-[#B08D57] transform translate-x-3 translate-y-3 rounded-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
                    alt="Process"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-serif text-lg">"Precision in every detail."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-white"> {/* Light outer bg makes the dark card pop */}
  <div className="max-w-7xl mx-auto relative group">
    {/* Decorative background glow that reacts to hover */}
    <div className="absolute -inset-1 bg-gradient-to-r from-[#B08D57] to-[#E6B566] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

    <div className="relative rounded-[2rem] overflow-hidden bg-[#09090B] text-white shadow-2xl border border-white/5">
      {/* Dynamic Gold Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B08D57] rounded-full opacity-[0.07] blur-[100px] -mr-32 -mt-32 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#E6B566] rounded-full opacity-[0.03] blur-[80px] -ml-20 -mb-20" />

      <div className="relative z-10 px-8 py-20 flex flex-col items-center">
        {/* Subtle Label */}
        <span className="text-[#E6B566] uppercase tracking-[0.3em] text-[10px] font-bold mb-6">
          Consultation
        </span>
        
        <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-2xl text-center leading-tight">
          Let’s build something <span className="italic text-[#E6B566]">timeless</span>.
        </h2>
        
        <p className="text-gray-400 text-lg max-w-xl text-center mb-12 leading-relaxed font-light">
          From intimate residential renovations to landmark commercial developments, our expertise brings your vision to structural reality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            type="button"
            onClick={startProject}
            className="group/btn relative inline-flex items-center gap-3 px-10 py-4 bg-[#E6B566] text-black rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95 shadow-lg shadow-[#E6B566]/20"
          >
            Start Your Project 
            <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
          
          <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors py-2 px-6">
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
      </main>
    </>
  );
};


export default ServicesPage;
