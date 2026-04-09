// src/pages/OurTeam.tsx
import React, { useEffect } from "react";
import { teamMembers } from "../data/team";
import TeamMember from "../components/TeamMember";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";
import { useLocation } from "react-router-dom";
import { Building, Users, Award, Star, ArrowRight } from "lucide-react";

type StatItemProps = {
  icon: React.ComponentType<{ size?: string | number }>;
  label: string;
  value: string;
};

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-100">
      <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-tr from-slate-800 to-stone-700 text-white flex-shrink-0">
        <Icon size={28} />
      </div>
      <div>
        <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-stone-800 bg-clip-text text-transparent">{value}</div>
        <div className="text-sm font-medium text-slate-600">{label}</div>
      </div>
    </div>
  );
};

const OurTeam: React.FC = () => {
  const isFounderRole = (roleRaw?: string) => {
    const role = (roleRaw || "").toString().toLowerCase().trim();
    return /^(founder|co-?founder)/i.test(role);
  };

  const leaders = teamMembers.filter(
    (member) => member.isFounder === true && isFounderRole(member.role)
  );

  const gridMembers = teamMembers.filter((member) => {
    return !isFounderRole(member.role);
  });

  const loc = useLocation();

  useEffect(() => {
    if (!loc.hash) return;
    const id = loc.hash.replace("#", "");
    const el = document.getElementById(`member-${id}`);
    if (el) {
      setTimeout(() => {
        try {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          (el as HTMLElement).focus?.();
          el.classList.add("ring-4", "ring-slate-400", "ring-opacity-60", "rounded-2xl");
          setTimeout(
            () => el.classList.remove("ring-4", "ring-slate-400", "ring-opacity-60", "rounded-2xl"),
            2500
          );
        } catch {
          // ignore focus/scroll errors
        }
      }, 100);
    }
  }, [loc.hash]);

  return (
    <>
      <SEOHead seo={pageSEO.team} />

      <main className="pt-28 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 40%, rgba(255,255,255,1) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -left-24 -top-44 w-[560px] h-[560px] rounded-full -z-30 opacity-20 hidden lg:block"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(71,85,105,0.12) 0%, rgba(71,85,105,0) 60%)",
            filter: "blur(48px)",
          }}
        />
        <div
          aria-hidden
          className="absolute -right-32 top-12 w-[460px] h-[460px] rounded-full -z-30 opacity-15 hidden lg:block"
          style={{
            background:
              "radial-gradient(circle at 70% 40%, rgba(120,113,108,0.1) 0%, rgba(120,113,108,0) 60%)",
            filter: "blur(52px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-28 relative">
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
            <div className="lg:col-span-5">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-slate-900 tracking-tight mb-6">
                The people
                <br />
                <span className="bg-gradient-to-r from-slate-700 to-stone-600 bg-clip-text text-transparent">
                  shaping beautiful
                </span>
                <br />
                homes
              </h1>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg sm:text-xl text-slate-700 max-w-3xl leading-relaxed">
                We pride ourselves in providing design services of the highest quality and our clients can have bespoke
                designs made up for them. We enjoy working on bespoke designs for our potential clients. Our leadership
                and design team work closely with clients to ensure design and execution are completed with the utmost
                satisfaction and consideration. Designers, engineers and makers — a close-knit, focused team who turn
                ideas into crafted living spaces.
              </p>
            </div>
          </section>

          {/* Quick Stats Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatItem icon={Building} label="Projects Completed" value="150+" />
              <StatItem icon={Users} label="Happy Clients" value="120+" />
              <StatItem icon={Award} label="Years Experience" value="10+" />
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20 bg-white rounded-3xl p-10 shadow-lg border border-slate-100">
            <h2 className="text-4xl font-bold text-slate-900 mb-10">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[
                { title: "Client First", desc: "Design decisions rooted in client needs and lifestyle." },
                { title: "Craftsmanship", desc: "Attention to detail from sketch to site execution." },
                { title: "Sustainability", desc: "Long-lasting, responsible material choices." },
              ].map((value, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-xl hover:bg-slate-50 transition-colors duration-300">
                  <div className="p-3 rounded-lg bg-slate-100 text-slate-700 flex-shrink-0">
                    <Star size={28} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Work Gallery */}
          <section className="mb-20">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Selected Work</h2>
              <p className="text-slate-600">Explore our recent projects and design solutions.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { src: "/assets/optimized/gallery/g1-768.jpeg", alt: "Selected project 1" },
                { src: "/assets/optimized/gallery/g2-768.jpeg", alt: "Selected project 2" },
                { src: "/assets/optimized/gallery/g3-768.jpeg", alt: "Selected project 3" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl h-64 bg-slate-100 group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Leaders Section */}
          <section className="space-y-16 mb-20">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Leadership</h2>
              <p className="text-slate-600 max-w-2xl">Meet the visionary leaders driving our creative direction.</p>
            </div>
            {leaders.length === 0 ? (
              <p className="text-center text-slate-600 py-12">Leadership profiles are not available right now.</p>
            ) : (
              leaders.map((lead) => (
                <section
                  key={lead.id}
                  id={`member-${lead.id}`}
                  tabIndex={-1}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl shadow-md hover:shadow-lg border border-slate-100 p-8 lg:p-10 transition-all duration-300"
                >
                  <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow-md group">
                    <img
                      src={lead.image || "/default-avatar.jpg"}
                      alt={lead.name || "Team member"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="lg:col-span-8">
                    <div className="flex items-start justify-between gap-6 mb-4">
                      <div>
                        <h2 className="text-4xl font-bold text-slate-900">{lead.name}</h2>
                        <p className="text-stone-700 font-semibold mt-2">{lead.role}</p>
                      </div>
                      {lead.badge && (
                        <span className="hidden md:inline-block px-4 py-2 rounded-full bg-gradient-to-r from-slate-700 to-stone-600 text-white font-semibold shadow-md whitespace-nowrap">
                          {lead.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-700 mb-8 leading-relaxed text-lg">{lead.description}</p>

                    <div className="flex flex-col md:flex-row md:items-start md:gap-16">
                      <div className="mb-8 md:mb-0">
                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <span className="w-1 h-6 bg-slate-700 rounded"></span>
                          Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(lead.expertise) &&
                            lead.expertise.map((skill, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-100 text-slate-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-slate-200 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <span className="w-1 h-6 bg-stone-600 rounded"></span>
                          Contact
                        </h3>
                        <div className="space-y-3">
                          {lead.contact?.email && (
                            <div>
                              <p className="text-sm text-slate-600 mb-1">Email</p>
                              <a href={`mailto:${lead.contact.email}`} className="text-stone-700 font-medium hover:text-slate-900 underline">
                                {lead.contact.email}
                              </a>
                            </div>
                          )}
                          {lead.contact?.phone && (
                            <div>
                              <p className="text-sm text-slate-600 mb-1">Phone</p>
                              <a href={`tel:${lead.contact.phone}`} className="text-stone-700 font-medium hover:text-slate-900 underline">
                                {lead.contact.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))
            )}
          </section>

          {/* Team Grid Section */}
          <section className="mb-20">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Meet The Team</h2>
              <p className="text-slate-600 max-w-4xl">
                Our talented team is the backbone of our success — get to know the people who make it all happen.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridMembers.map((member) => (
                <TeamMember key={member.id} member={member} />
              ))}
            </div>
          </section>

          {/* Join Us CTA */}
          <section>
            <div className="rounded-3xl bg-gradient-to-r from-slate-800 via-slate-700 to-stone-700 p-12 shadow-xl text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-pattern -z-10" />
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Join our creative team</h3>
              <p className="text-slate-100 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                Designers, architects & builders — send your CV/Portfolio and be part of our creative journey.
              </p>
              <a
                href="mailto:careers@younickdesign.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Send Resume
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default OurTeam;
