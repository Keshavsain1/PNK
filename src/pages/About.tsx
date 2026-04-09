import React, { useState } from "react";
import { Link, MemoryRouter } from "react-router-dom";
import { JSX } from 'react'; // Add this line to fix JSX recognition
import { 
  Briefcase, 
  Clock, 
  ChevronDown, 
  ArrowRight, 
  CheckCircle2
} from "lucide-react";

// --- NOTE: These imports are commented out for the preview to work ---
// import SEOHead from "../components/SEOHead";
// import { pageSEO } from "../utils/seo";

// --- TEMPORARY MOCKS ---
const pageSEO = {
  about: {
    title: "About Us - Younick Design Studio",
    description: "Learn more about our interior design studio in Jaipur."
  }
};

const SEOHead = ({ seo }: { seo: any }) => (
  <div className="hidden" aria-hidden="true">
    <meta name="title" content={seo?.title} />
    <style>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: scroll 30s linear infinite;
      }
      .font-mono-num {
        font-variant-numeric: tabular-nums;
      }
    `}</style>
  </div>
);
// --- END TEMPORARY MOCKS ---

// --- DATA ---
const faqs = [
  {
    question: "Do you work nationwide?",
    answer: "We primarily operate across Rajasthan and Jaipur, and we take select projects nationwide. For remote projects we provide detailed visuals and phased on-site visits.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines depend on scope — small renovations typically take 4–8 weeks; full residential projects commonly span several months with defined milestones.",
  },
  {
    question: "What's included in your design service?",
    answer: "Concept development, detailed drawings, 3D visualizations, material specifications, contractor coordination and site supervision (as required).",
  },
  {
    question: "Can you work with client's contractors?",
    answer: "Yes — we collaborate with client-preferred contractors or recommend trusted partners and manage quality to our standards.",
  },
];

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = "1";
    img.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"; 
    img.alt = "Younick studio image fallback";
  }
}

// --- COMPONENTS ---

const Marquee = () => (
  <div className="bg-[#18181B] text-[#E6B566] py-4 overflow-hidden border-y border-[#E6B566]/20">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex gap-12 px-6 items-center uppercase tracking-[0.2em] text-sm font-bold">
          <span>Architecture</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
          <span>Interior Design</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
          <span>Restoration</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
          <span>Consultancy</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
          <span>Styling</span>
          <span className="w-1 h-1 bg-[#E6B566] rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#FAFAFA]" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-2 block">[ FAQ ]</span>
            <h4 id="faq-heading" className="text-4xl font-serif text-[#18181B]">Common Questions</h4>
          </div>
          <p className="text-gray-500 max-w-sm text-sm">Everything you need to know about our process, timelines, and how we handle your space.</p>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="group">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`w-full p-6 md:p-8 flex items-start justify-between text-left transition-all duration-300 border ${
                    isOpen ? "bg-white border-[#B08D57] shadow-lg translate-x-2" : "bg-white border-gray-200 hover:border-[#B08D57]/50"
                  }`}
                >
                  <div className="flex gap-6">
                    <span className={`font-mono text-sm mt-1 transition-colors ${isOpen ? "text-[#B08D57]" : "text-gray-300"}`}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <span className={`font-serif text-xl block mb-2 transition-colors ${isOpen ? "text-[#18181B]" : "text-gray-700"}`}>
                        {faq.question}
                      </span>
                      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="text-gray-500 leading-relaxed text-sm md:text-base pr-8">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronDown size={20} className={`shrink-0 transition-transform duration-300 text-[#B08D57] ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AboutContent = () => {
  return (
    <>
      <SEOHead seo={pageSEO.about} />

      <main className="bg-white min-h-screen">
        
        {/* --- HERO SECTION: EDITORIAL STYLE --- */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
          {/* Background decoration lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-end mb-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="w-12 h-[1px] bg-[#B08D57]"></span>
                  <span className="font-mono text-xs font-bold tracking-widest text-[#B08D57] uppercase">Est. 2018 — Jaipur</span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#18181B] leading-[0.9] tracking-tighter">
                  Studio <br/>
                  <span className="italic text-[#B08D57] pl-4 md:pl-12">Younick.</span>
                </h1>
              </div>
              <div className="lg:w-1/3 pb-4">
                <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed border-l-2 border-[#B08D57] pl-6">
                  We are a collective of designers and craftsmen obsessed with the <span className="text-[#18181B] font-medium">art of longevity</span>. We don't just fill spaces; we curate environments that breathe.
                </p>
              </div>
            </div>

            {/* Cinematic Image Strip */}
            <div className="grid grid-cols-12 gap-4 h-[400px] md:h-[500px]">
              <div className="col-span-12 md:col-span-8 relative rounded-sm overflow-hidden group">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10" />
                <img 
                  src="/younick-about-hero.jpg" 
                  alt="Studio Main" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={handleImgError}
                />
                <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur px-4 py-2 text-xs font-mono uppercase tracking-widest">
                  [01] The Studio
                </div>
              </div>
              <div className="hidden md:block md:col-span-4 relative rounded-sm overflow-hidden group">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10" />
                 <img 
                  src="/younick-thumb3.jpg" 
                  alt="Studio Detail" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={handleImgError}
                />
                <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur px-4 py-2 text-xs font-mono uppercase tracking-widest">
                  [02] The Craft
                </div>
              </div>
            </div>
          </div>
        </section>

        <Marquee />

        {/* --- PHILOSOPHY: BENTO GRID STYLE --- */}
        <section className="bg-[#18181B] text-white py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
              <h2 className="text-4xl md:text-6xl font-serif">Why We Build</h2>
              <Link to="/projects" className="group flex items-center gap-2 mt-4 md:mt-0 text-[#B08D57] font-mono text-sm uppercase tracking-widest hover:text-white transition-colors">
                View Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Stat Card 1 - Large */}
              <div className="lg:col-span-2 bg-white/5 p-8 rounded-sm border border-white/5 hover:border-[#B08D57]/30 transition-colors group">
                <div className="flex justify-between items-start mb-12">
                   <Briefcase className="text-[#B08D57] group-hover:scale-110 transition-transform duration-500" size={32} />
                   <span className="font-mono text-white/30 text-xs">[ 01 ]</span>
                </div>
                <h3 className="text-2xl font-serif mb-4">Integrated Practice</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  We bridge the gap between imagination and execution. By handling design, visualization, and construction under one roof, we ensure the vision never gets lost in translation.
                </p>
                <div className="flex gap-2">
                   <span className="px-3 py-1 bg-white/10 text-xs rounded-full">Architecture</span>
                   <span className="px-3 py-1 bg-white/10 text-xs rounded-full">Interiors</span>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-white/5 p-8 rounded-sm border border-white/5 hover:border-[#B08D57]/30 transition-colors group">
                <div className="flex justify-between items-start mb-8">
                   <Clock className="text-[#B08D57] group-hover:rotate-12 transition-transform duration-500" size={32} />
                   <span className="font-mono text-white/30 text-xs">[ 02 ]</span>
                </div>
                <h3 className="text-xl font-serif mb-2">Precision Timing</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We respect the calendar as much as the canvas. 4-8 weeks for renovations, milestones defined from Day 1.
                </p>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-white/5 p-8 rounded-sm border border-white/5 hover:border-[#B08D57]/30 transition-colors group">
                <div className="flex justify-between items-start mb-8">
                   <CheckCircle2 className="text-[#B08D57] group-hover:scale-110 transition-transform duration-500" size={32} />
                   <span className="font-mono text-white/30 text-xs">[ 03 ]</span>
                </div>
                <h3 className="text-xl font-serif mb-2">Quality Control</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Rigorous material checks and site inspections. We don't sign off until the finish matches the render.
                </p>
              </div>

              {/* Number Stats - Horizontal */}
              <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                 <div className="bg-[#B08D57] p-6 text-[#18181B] flex flex-col justify-between h-32 hover:bg-white transition-colors duration-300 group">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60">Projects</span>
                    <span className="text-5xl font-serif font-medium">30+</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-6 flex flex-col justify-between h-32 hover:bg-[#B08D57] hover:text-[#18181B] transition-colors duration-300 group">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-60">Established</span>
                    <span className="text-5xl font-serif font-medium">2018</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-6 flex flex-col justify-between h-32 hover:bg-[#B08D57] hover:text-[#18181B] transition-colors duration-300 group">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-60">Base</span>
                    <span className="text-3xl font-serif font-medium truncate">Jaipur</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-6 flex items-center justify-center h-32 hover:bg-[#B08D57] hover:text-[#18181B] transition-colors duration-300 group cursor-pointer">
                    <div className="flex items-center gap-2">
                       <span className="font-mono text-sm uppercase tracking-widest font-bold">Meet The Team</span>
                       <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- TEAM TEASER: MAGAZINE STYLE --- */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
               <div className="absolute -top-10 -left-10 w-32 h-32 border-l-2 border-t-2 border-[#B08D57] opacity-50" />
               <div className="grid grid-cols-2 gap-4">
                 <img src="/younick-thumb1.jpg" onError={handleImgError} className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm" alt="Team Work" />
                 <img src="/younick-thumb2.jpg" onError={handleImgError} className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm translate-y-8" alt="Team Meeting" />
               </div>
            </div>
            <div className="md:w-1/2">
               <span className="text-[#B08D57] font-mono font-bold tracking-widest text-xs mb-4 block">[ THE COLLECTIVE ]</span>
               <h3 className="text-5xl font-serif text-[#18181B] mb-6">Humans First,<br/>Designers Second.</h3>
               <p className="text-gray-600 text-lg leading-relaxed mb-8">
                 We are a compact collective of designers, engineers, and project managers. Our process begins with listening—understanding how people live, move, and inhabit spaces—and ends with carefully detailed execution.
               </p>
               <Link to="/team" className="inline-block border-b border-[#18181B] pb-1 text-[#18181B] font-medium hover:text-[#B08D57] hover:border-[#B08D57] transition-colors">
                 Read Our Story
               </Link>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-100">
          <FAQSection />
        </div>

      </main>
    </>
  );
};

const About: React.FC = () => {
  return (
    <AboutContent />
  );
};

export default About;