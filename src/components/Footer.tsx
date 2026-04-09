import React from "react";
import {
  ArrowRight,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Youtube as YoutubeIcon,
} from "lucide-react";
import { projects } from "../data/projects";

const socials = [
  { icon: InstagramIcon, href: "https://www.instagram.com/studio.younick", label: "Instagram" },
  { icon: FacebookIcon, href: "https://www.facebook.com/studioyounick", label: "Facebook" },
  { icon: YoutubeIcon, href: "https://www.youtube.com/@Younickdesignstudio", label: "YouTube" },
  { icon: MessageCircle, href: "https://wa.me/918854883058", label: "WhatsApp" },
];

const serviceList = [
  { href: "/projects?filter=Interior%20Design", label: "Interior Design", detail: "Warm, tailored living spaces" },
  { href: "/projects?filter=Construction", label: "Construction", detail: "Build planning to execution" },
  { href: "/projects?filter=Renovation", label: "Renovation", detail: "Thoughtful upgrades with clarity" },
  { href: "/projects?filter=Consultation", label: "Consultation", detail: "Design direction that reduces rework" },
  { href: "/projects?filter=3D%20Visualization", label: "3D Visualization", detail: "Pre-build visual confidence" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/projects" },
  { label: "Process", href: "/services" },
  { label: "Blog", href: "/blog" },
];

const spotlightProjects = projects.slice(0, 2);

const Footer: React.FC = () => {
  return (
    <footer
      aria-label="Site Footer"
      className="relative overflow-hidden border-t border-[#E6B566]/10 bg-[#0B1220] text-white"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,181,102,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(230,181,102,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
        <div className="absolute right-[-8rem] top-10 h-80 w-80 rounded-full bg-[#E6B566]/10 blur-3xl" />
        <div className="absolute left-[-6rem] bottom-0 h-72 w-72 rounded-full bg-[#E6B566]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-8 lg:pt-20">
        <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:grid-cols-[1.25fr_0.95fr] lg:items-center lg:p-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-[#E6B566]/30 bg-[#E6B566]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F3D6A0]">
              Younick Design Studio
            </span>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight text-white md:text-5xl">
              Spaces that feel calm, detailed, and built for everyday living.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              From interior design and construction to renovation and 3D visualization, we shape homes and commercial spaces with smoother planning, better material clarity, and refined execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#E6B566] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:bg-[#F2C980] hover:shadow-[0_14px_40px_rgba(230,181,102,0.28)]"
              >
                Start Your Project
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-[#E6B566]/40 hover:bg-white/10"
              >
                Explore Portfolio
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#101827] p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,181,102,0.16),transparent_32%)]" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#E6B566]">Project Moodboard</p>
                    <p className="mt-2 text-sm text-slate-300">A softer visual anchor inspired by live project work.</p>
                  </div>
                  <div className="rounded-full border border-[#E6B566]/30 bg-[#E6B566]/10 p-3 text-[#E6B566]">
                    <Ruler size={18} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {spotlightProjects.map((project, index) => (
                    <article
                      key={project.id}
                      className={`group overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/5 ${
                        index === 0 ? "col-span-2" : ""
                      }`}
                    >
                      <div className={`relative ${index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/10 to-transparent" />
                        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#0B1220]/70 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm">
                          {project.category}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-sm font-semibold text-white">{project.title}</p>
                          <p className="mt-1 text-xs text-white/70">{project.location}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[1.4rem] border border-dashed border-[#E6B566]/30 bg-[#E6B566]/[0.06] p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#E6B566]">Design Sketch</p>
                <div className="mt-4 space-y-3 text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-[#E6B566]/40" />
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#F3D6A0]">Plan</span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#0B1220]/60 p-4">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="h-8 rounded-lg border border-white/10 bg-white/5" />
                      <span className="col-span-2 h-8 rounded-lg border border-white/10 bg-white/5" />
                      <span className="col-span-2 h-14 rounded-xl border border-[#E6B566]/25 bg-[#E6B566]/10" />
                      <span className="h-14 rounded-xl border border-white/10 bg-white/5" />
                    </div>
                  </div>
                  <p className="text-xs leading-6 text-slate-400">
                    Clean zoning, measured circulation, and warm detailing to keep the footer visually smooth.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#E6B566]">Studio Presence</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="mt-1 text-[#E6B566]" />
                    <span>Orbit Mall, Civil Lines, Jaipur, Rajasthan</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="mt-1 text-[#E6B566]" />
                    <span>Mon - Sat, 9:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.95fr] lg:gap-12">
          <div className="max-w-sm">
            <a href="/" className="inline-flex items-center gap-3">
              <img
                src="/younick-logo.PNG"
                alt="Younick Design Studio"
                className="h-12 w-auto brightness-110"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="text-xl font-semibold tracking-tight text-white">Younick</p>
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#E6B566]">Design Studio</p>
              </div>
            </a>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Blending creativity and craftsmanship to transform ideas into memorable spaces with a calmer process and thoughtful detailing.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition-all duration-300 hover:border-[#E6B566]/40 hover:text-[#0B1220]"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#E6B566] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <Icon size={17} className="relative z-10" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E6B566]">Services</h3>
            <nav className="mt-6 space-y-3">
              {serviceList.map((service) => (
                <a
                  key={service.label}
                  href={service.href}
                  className="group block rounded-2xl border border-transparent px-4 py-3 transition-all duration-300 hover:border-white/10 hover:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-white">
                      {service.label}
                    </span>
                    <ArrowRight size={14} className="text-[#E6B566] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{service.detail}</p>
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E6B566]">Company</h3>
            <nav className="mt-6 space-y-2">
              {companyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowRight size={14} className="text-[#E6B566] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E6B566]">Contact</h3>
            <div className="mt-6 space-y-4">
              <a
                href="https://maps.google.com/?q=Orbit+Mall+Civil+Lines+Jaipur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex rounded-[1.25rem] border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-[#E6B566]/25 hover:bg-white/10"
              >
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#E6B566]" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Visit Studio</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">Orbit Mall, Civil Lines, Jaipur</p>
                </div>
              </a>

              <a
                href="tel:+918854883058"
                className="flex rounded-[1.25rem] border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-[#E6B566]/25 hover:bg-white/10"
              >
                <Phone size={18} className="mt-0.5 shrink-0 text-[#E6B566]" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Call Us</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">+91 88548 83058 / +91 91667 76697</p>
                </div>
              </a>

              <a
                href="mailto:studioyounick@gmail.com"
                className="flex rounded-[1.25rem] border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-[#E6B566]/25 hover:bg-white/10"
              >
                <Mail size={18} className="mt-0.5 shrink-0 text-[#E6B566]" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Email</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">studioyounick@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col gap-4 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p className="uppercase tracking-[0.24em]">
            &copy; {new Date().getFullYear()} Younick Design Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="transition-colors duration-300 hover:text-[#E6B566]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-[#E6B566]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
