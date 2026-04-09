// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  X,
  ArrowRight,
  Star,
  Play,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Quote,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

// -- Data imports (these files are present in your project)
import { projects } from "../data/projects";
import { services } from "../data/services";
import { teamMembers } from "../data/team";
import type { Project } from "../data/projects";

// prefer existing cn util if available at build-time
let cn = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ");
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // @ts-ignore
  const maybe = require("../utils/cn");
  if (maybe && typeof maybe.cn === "function") cn = maybe.cn;
} catch (e) {
  // fallback remains
}

const MotionDiv = motion.div as unknown as React.ComponentType<any>;

// --- local fallbacks ---
const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Amit Sharma",
    role: "Homeowner",
    quote: "The attention to detail is unlike anything else.",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=512&auto=format&fit=crop",
  },
  {
    id: "t2",
    name: "Riya Kapoor",
    role: "Interior Designer",
    quote: "Great process, clear communication and beautiful finishes.",
    avatarUrl:
      "https://images.unsplash.com/photo-1545996124-5b9c9b3dd7a9?q=80&w=512&auto=format&fit=crop",
  },
];

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  width?: string;
  className?: string;
}> = ({ children, delay = 0, width = "100%", className }) => (
  <div style={{ width }} className={cn("relative overflow-visible", className)}>
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.25, 0, 1] }}
    >
      {children}
    </MotionDiv>
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  withIcon?: boolean;
  size?: "sm" | "md" | "lg";
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, withIcon, ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: "bg-[#0B1220] text-white hover:bg-[#0B1220]/90 shadow-xl",
      secondary: "bg-white text-[#0B1220] border border-gray-200 hover:bg-gray-50",
      outline: "bg-transparent border border-current text-[#0B1220] hover:opacity-70",
      ghost: "bg-transparent text-[#0B1220] hover:bg-gray-100",
      link: "p-0 bg-transparent text-[#0B1220] hover:text-[#E6B566] underline-offset-4 hover:underline",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          className || ""
        )}
        {...props}
      >
        {children}
        {withIcon && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
      </button>
    );
  }
);
Button.displayName = "Button";

// ------------------ Sections ------------------

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // safe picks for hero images (some project objects may use different keys)
  const heroImgA = (projects[0] as any)?.imageUrl ?? (projects[0] as any)?.image ?? "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop";
  const heroImgB = (projects[1] as any)?.imageUrl ?? (projects[1] as any)?.image ?? "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop";

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden bg-[#FAFAFB]">
      <div className="absolute top-0 right-0 w-[40vw] h-full bg-[#EAEAEA] rounded-l-[120px] -z-10 hidden lg:block opacity-50" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#E6B566]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center h-full">
        <div className="lg:col-span-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-bold tracking-widest uppercase text-[#E6B566] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#E6B566] animate-pulse" />
              Jaipur, Rajasthan
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-[#0B1220] leading-[1.1] mb-8">
              Interiors that <br />
              <span className="italic text-[#E6B566]">feel curated</span>
              <br />
              modern & warm.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
              Architecture, craft and human-centred spatial thinking — from concept and visualization to turnkey delivery. Spaces people truly want to live in.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-4">
              <Button withIcon className="group">
                Book Consultation
              </Button>

              <button className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:text-[#0B1220] transition-colors group">
                <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#E6B566] group-hover:text-[#E6B566] transition-all bg-white">
                  <Play className="w-4 h-4" />
                </div>
                <span className="underline-offset-4 group-hover:underline">Watch Studio Reel</span>
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.4} className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex gap-12">
              <div>
                <h4 className="text-3xl font-serif text-[#0B1220]">150+</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Projects</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-[#0B1220]">100%</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Commitment</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 relative h-[600px] hidden md:block">
          <MotionDiv style={{ y: y1 }} className="absolute top-0 right-0 w-4/5 h-4/5 z-10">
            <div className="w-full h-full rounded-tr-[100px] rounded-bl-[40px] overflow-hidden shadow-2xl">
              <img
                src={heroImgA}
                alt="Luxury Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
              />
            </div>
          </MotionDiv>

          <MotionDiv style={{ y: y2 }} className="absolute bottom-0 left-0 w-3/5 h-1/2 z-20">
            <div className="w-full h-full rounded-tl-[60px] rounded-br-[20px] overflow-hidden shadow-2xl border-8 border-[#FAFAFB]">
              <img
                src={heroImgB}
                alt="Detail Shot"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-xl max-w-[180px]">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3 h-3 text-[#E6B566]" />
                ))}
              </div>
              <p className="text-xs font-medium text-[#0B1220]">"The attention to detail is unlike anything else."</p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-12">
                  <img src={(projects[0] as any)?.imageUrl ?? (projects[0] as any)?.image ?? ""} alt="Materials" className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover" />
                </div>
                <div className="space-y-4">
                  <img src={(projects[1] as any)?.imageUrl ?? (projects[1] as any)?.image ?? ""} alt="Interior" className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover" />
                </div>
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#F7F7F9] rounded-full blur-3xl opacity-60" />
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-serif text-[#0B1220] mb-8 leading-tight">
                We listen first, then we <span className="italic text-[#E6B566]">create.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We design thoughtful interiors that balance material honesty with timeless form. Listening is our primary tool — we then layer craft, light, and curated materials to create rooms that feel lived-in and intentional.
              </p>
              <p className="text-base text-gray-500 mb-10 leading-relaxed">
                From full-scale renovations to bespoke fit-outs, we manage concept, visualization and delivery with transparency. Clients choose us for clear communication, material expertise and the quiet confidence of built work.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex gap-8">
                <div>
                  <h3 className="text-4xl font-serif mb-1">10+</h3>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Years Exp.</p>
                </div>
                <div className="w-px bg-gray-200 h-12" />
                <div>
                  <h3 className="text-4xl font-serif mb-1">120+</h3>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Happy Clients</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-[#FAFAFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <Reveal>
            <h2 className="text-4xl font-serif text-[#0B1220] mb-4">Selected Works</h2>
            <p className="text-gray-500">A curated selection of our finest residential and commercial spaces.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex gap-2 p-1 bg-white rounded-full border border-gray-200 shadow-sm overflow-x-auto">
              {["All", "Interior Design", "Construction", "Renovation"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-full transition-all whitespace-nowrap",
                    filter === cat ? "bg-[#0B1220] text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              const img = (project as any)?.imageUrl ?? (project as any)?.image ?? "";
              return (
                <MotionDiv
                  layout
                  key={(project as any).id ?? idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-md text-[#0B1220] px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Project
                      </span>
                    </div>
                    <img src={img} alt={(project as any).title ?? "Project"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#0B1220] group-hover:text-[#E6B566] transition-colors">{(project as any).title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{(project as any).location} — {(project as any).category}</p>
                </MotionDiv>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" className="border-gray-300">View Full Portfolio</Button>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-[#0B1220]/80 backdrop-blur-sm" />
            <MotionDiv layoutId={`project-${(selectedProject as any).id}`} className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"><X size={20} /></button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                <img src={(selectedProject as any)?.imageUrl ?? (selectedProject as any)?.image ?? ""} alt={(selectedProject as any).title} className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <span className="inline-block px-3 py-1 bg-[#E6B566]/10 text-[#E6B566] rounded-full text-xs font-bold uppercase tracking-wider mb-4">{(selectedProject as any).category}</span>
                <h3 className="text-4xl font-serif text-[#0B1220] mb-6">{(selectedProject as any).title}</h3>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-100 mb-8">
                  <div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wide">Location</span>
                    <span className="font-medium">{(selectedProject as any).location}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wide">Area</span>
                    <span className="font-medium">{(selectedProject as any).area}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wide">Date</span>
                    <span className="font-medium">{(selectedProject as any).date ?? (selectedProject as any).year ?? ""}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8 text-lg">{(selectedProject as any).description}</p>

                <div>
                  <h4 className="font-bold text-sm text-[#0B1220] mb-3">Scope & Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {((selectedProject as any).tags ?? (selectedProject as any).tagsList ?? []).map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0B1220] mb-6">
            Our Expertise
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive design solutions tailored to your lifestyle.
          </p>
        </div>

        <div className="space-y-32">
          {services.map((service, index) => {
            const s = service as any;
            const img = s?.imageUrl ?? s?.image ?? "";

            const Icon =
              s?.icon && (LucideIcons as any)[s.icon]
                ? (LucideIcons as any)[s.icon]
                : null;

            const isEven = index % 2 === 0;

            return (
              <div
                key={s.id ?? index}
                className={cn(
                  "flex flex-col lg:flex-row gap-12 lg:gap-24 items-center",
                  !isEven && "lg:flex-row-reverse"
                )}
              >
                <motion.div
                  className="w-full lg:w-1/2 relative group"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div
                    className={cn(
                      "absolute -inset-4 bg-[#F7F7F9] rounded-3xl transform transition-transform duration-500",
                      isEven
                        ? "rotate-2 group-hover:-rotate-1"
                        : "-rotate-2 group-hover:rotate-1"
                    )}
                  />
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10] shadow-xl">
                    <img
                      src={img}
                      alt={s?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 w-16 h-16 bg-white/95 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg text-[#0B1220]">
                      {Icon ? (
                        <Icon size={28} strokeWidth={1.5} />
                      ) : (
                        <svg width="28" height="28" aria-hidden />
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-serif text-[#0B1220] mb-6">
                    {s?.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {s?.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {(s?.features ?? []).map((feature: string) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-sm font-medium text-gray-700"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-[#E6B566]"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center text-[#0B1220] font-semibold border-b border-[#0B1220] pb-1 hover:text-[#E6B566] hover:border-[#E6B566] transition-colors"
                  >
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 bg-[#FAFAFB] border-y border-white">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="absolute top-0 left-10 text-[#E6B566]/10 pointer-events-none">
          <Quote size={120} />
        </div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl font-serif">Client Stories</h2>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-sm relative min-h-[300px] flex items-center justify-center text-center">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
            <button onClick={prev} className="p-3 rounded-full hover:bg-gray-100 transition-colors"><ChevronLeft /></button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <button onClick={next} className="p-3 rounded-full hover:bg-gray-100 transition-colors"><ChevronRight /></button>
          </div>

          <AnimatePresence mode="wait">
            <MotionDiv key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="max-w-2xl">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#E6B566]" />)}
              </div>
              <p className="text-2xl md:text-3xl font-serif text-[#0B1220] leading-relaxed italic mb-8">"{TESTIMONIALS[index].quote}"</p>
              <div className="flex flex-col items-center">
                <img src={TESTIMONIALS[index].avatarUrl} alt={TESTIMONIALS[index].name} className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-white shadow-md" />
                <h4 className="font-bold text-[#0B1220]">{TESTIMONIALS[index].name}</h4>
                <p className="text-sm text-gray-500">{TESTIMONIALS[index].role}</p>
              </div>
            </MotionDiv>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const LeadershipSection: React.FC = () => {
  const leadership = teamMembers.filter((isfounder) =>
    true
  );

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">The Leadership</h2>
            <p className="text-gray-500">
              Founders & core leadership shaping our design language.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12">
          {leadership.slice(0, 3).map((member, i) => (
            <Reveal key={member.id} delay={i * 0.1}>
              <div className="group text-center">
                <div className="relative w-64 h-64 mx-auto mb-8 overflow-hidden rounded-full border-4 border-white shadow-xl">
                  <img
                    src={member.image || member.image480 || member.image768}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#0B1220]">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#E6B566] font-bold mt-1 mb-4">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {member.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};


// kept FooterSection in file but NOT rendered in Home (per your request to remove homepage footer)
const FooterSection: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#0B1220] text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E6B566] via-yellow-700 to-[#0B1220]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#E6B566] flex items-center justify-center text-[#0B1220] font-serif font-bold text-xl rounded-sm">Y</div>
              <span className="font-serif text-2xl font-bold">Younick Studio</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8 text-gray-200">
              We blend creativity and craftsmanship to transform ideas into memorable spaces.
            </h2>

            <div className="flex gap-6">
              {[Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#E6B566] hover:text-[#0B1220] transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 items-start">
            <h3 className="text-xl font-serif text-[#E6B566]">Start a Project</h3>
            <p className="text-gray-400 max-w-xs">Ready to transform your space? Let's discuss your vision.</p>
            <Button className="bg-white text-[#0B1220] hover:bg-[#E6B566] w-full md:w-auto">Book a Consultation</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12 mb-12">
          <div>
            <h4 className="text-[#E6B566] text-xs font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3"><MapPin size={16} /> Orbit Mall, Civil Lines, Jaipur</li>
              <li className="flex items-center gap-3"><Phone size={16} /> +91 88548 83058</li>
              <li className="flex items-center gap-3"><Mail size={16} /> studioyounick@gmail.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#E6B566] text-xs font-bold uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {["Interior Design", "Construction", "Renovation", "3D Visualization"].map((s) => (
                <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#E6B566] text-xs font-bold uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-600 pt-8 border-t border-white/5">
          © {new Date().getFullYear()} Younick Design Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// Stats
const StatsSection: React.FC = () => {
  const STATS = [
    { id: "s1", value: `${projects.length}+`, label: "Projects", subLabel: "Residential & commercial" },
    { id: "s2", value: "120+", label: "Repeat clients", subLabel: "Relationship-first" },
    { id: "s3", value: "10+", label: "Years in practice", subLabel: "Built expertise" },
    { id: "s4", value: "98%", label: "Satisfaction", subLabel: "Post-handover surveys" },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <Reveal key={stat.id} delay={i * 0.1} className="text-center">
            <h3 className="text-4xl font-serif text-[#0B1220] mb-1">{stat.value}</h3>
            <p className="text-xs font-bold text-[#E6B566] uppercase tracking-wider">{stat.label}</p>
            <p className="text-[10px] text-gray-400 mt-1">{stat.subLabel}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#0B1220] font-sans selection:bg-[#E6B566] selection:text-white">
      <main>
        <Hero />
        <StatsSection />
        <About />
        <ProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
        <LeadershipSection />
      </main>
      {/* FooterSection intentionally not rendered on the Home page per request */}
    </div>
  );
};

export default Home;
