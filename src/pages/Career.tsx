// src/pages/Career.tsx
import React, { useState } from "react";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import { Briefcase, Clock, Users, ChevronDown, Star, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

type Faq = { question: string; answer: string };

const faqs: Faq[] = [
  {
    question: "Do you work nationwide?",
    answer:
      "We primarily operate across Rajasthan and Jaipur, and we take select projects nationwide. For remote projects we provide detailed visuals and phased on-site visits.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope — small renovations typically take 4–8 weeks; full residential projects commonly span several months with defined milestones.",
  },
  {
    question: "What's included in your design service?",
    answer:
      "Concept development, detailed drawings, 3D visualizations, material specifications, contractor coordination and site supervision (as required).",
  },
  {
    question: "Can you work with client's contractors?",
    answer:
      "Yes — we collaborate with client-preferred contractors or recommend trusted partners and manage quality to our standards.",
  },
];

const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about working with Younick
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="group"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-amber-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <h5 className="text-lg font-semibold text-white text-left">{faq.question}</h5>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-amber-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>

                <div
                  id={`faq-panel-${idx}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-300 text-sm leading-relaxed px-6 py-4 bg-gray-800/25 border-x border-b border-gray-700/50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Career: React.FC = () => {
  const [status, setStatus] = useState<null | "idle" | "sending" | "success">("idle");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("success"), 800);
  };

  return (
    <>
      <SEOHead seo={pageSEO.career ?? { title: "Career - Younick" }} />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-amber-900/20 to-gray-900 overflow-hidden pt-20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
                <Sparkles size={16} className="text-amber-500" />
                <span className="text-sm font-medium text-amber-400">Join Our Team</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Build Your Career at <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Younick</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Collaborate with talented designers and architects. Grow your skills on real projects and shape the future of design with us.
              </p>
              <div className="flex gap-4">
                <a href="#apply" className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 group">
                  Explore Roles <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {[
                { icon: Star, title: "Growth", desc: "Mentorship from experts" },
                { icon: Users, title: "Culture", desc: "Collaborative environment" },
                { icon: Briefcase, title: "Experience", desc: "Real project work" },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-600/20 rounded-lg">
                      <item.icon className="text-amber-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="bg-gray-950" id="apply">
        {/* Application Section */}
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Open Opportunities</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We're looking for passionate individuals to join our creative team
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Internship Card */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
              <div className="h-2 bg-gradient-to-r from-amber-600 to-amber-500"></div>
              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-600/20 rounded-lg">
                    <Sparkles className="text-amber-500" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Internship Program</h3>
                </div>
                <p className="text-gray-400 mb-8">
                  3-6 month internships with hands-on mentorship, real project exposure, and potential for conversion to full-time roles.
                </p>

                <form onSubmit={handleApply} className="space-y-4">
                  <div className="relative">
                    <input
                      required
                      id="name"
                      name="name"
                      type="text"
                      placeholder=" "
                      className="peer w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-amber-500"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      placeholder=" "
                      className="peer w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-amber-500"
                    >
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="portfolio"
                      name="portfolio"
                      type="url"
                      placeholder=" "
                      className="peer w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                    <label
                      htmlFor="portfolio"
                      className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-amber-500"
                    >
                      Portfolio Link
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50"
                  >
                    Submit Application
                  </button>

                  {status === "sending" && <p className="text-center text-amber-400 text-sm">Sending…</p>}
                  {status === "success" && <p className="text-center text-green-400 text-sm">✓ Application received!</p>}
                </form>
              </div>
            </div>

            {/* Job Card */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-600"></div>
              <div className="p-10 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-600/20 rounded-lg">
                      <Briefcase className="text-amber-500" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Full-Time Roles</h3>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Permanent positions for designers, architects, and makers. Build your career with competitive benefits and growth opportunities.
                  </p>

                  <div className="space-y-3 mb-8">
                    {["Competitive Salary", "Health Benefits", "Career Growth", "Flexible Work"].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="block w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold rounded-lg transition-all duration-300 text-center hover:shadow-lg hover:shadow-amber-500/50"
                  >
                    Contact HR
                  </Link>
                  <p className="text-gray-400 text-center text-sm">
                    Or email{" "}
                    <a href="mailto:careers@younickdesign.com" className="text-amber-400 hover:text-amber-300 underline">
                      careers@younickdesign.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FAQSection />
    </>
  );
};

export default Career;
