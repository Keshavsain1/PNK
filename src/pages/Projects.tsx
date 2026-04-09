// src/pages/Projects.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid, List, Search } from "lucide-react";
import { projects as ALL_PROJECTS } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import SEOHead from "../components/SEOHead";

const HERO_IMAGE_BASE = "/assets/optimized/hero/hero";

const getCategoryStyles = (category?: string) => {
  const key = (category || "").toLowerCase();
  if (key.includes("interior")) return "bg-[#F6E7C5] text-[#6B4E16] border-[#E9C982]";
  if (key.includes("construction")) return "bg-[#E3ECF8] text-[#1F3B5B] border-[#BBD1EE]";
  if (key.includes("renovation")) return "bg-[#F5E0D1] text-[#6B3E1E] border-[#E9BFA0]";
  if (key.includes("3d")) return "bg-[#EAE3F7] text-[#3F2B6B] border-[#CDBEF0]";
  if (key.includes("consult")) return "bg-[#E2F0E6] text-[#1F5133] border-[#B7D9C1]";
  return "bg-[#F5F0E8] text-[#493E25] border-[#E6B566]/30";
};

const getLocationStyles = () => "bg-[#EEF2F6] text-[#425466] border-[#D7E0EA]";

const slugify = (s?: string) =>
  (s || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const parseDateScore = (d?: string) => {
  if (!d) return 0;
  const parsed = Date.parse(d);
  if (!isNaN(parsed)) return parsed;
  try {
    const alt = Date.parse("1 " + d);
    if (!isNaN(alt)) return alt;
  } catch {}
  return 0;
};

const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtered, setFiltered] = useState<typeof ALL_PROJECTS>(ALL_PROJECTS);
  const [selected, setSelected] = useState<null | typeof ALL_PROJECTS[0]>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [category, setCategory] = useState<string>(searchParams.get("filter") || "all");
  const [locationFilter, setLocationFilter] = useState<string>(searchParams.get("location") || "all");
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchText, setSearchText] = useState<string>(searchParams.get("search") || searchParams.get("navSearch") || "");


  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    ALL_PROJECTS.forEach((p) => {
      const key = p.category || "Uncategorized";
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  useEffect(() => {
    const appliedSearch = searchParams.get("search") || searchParams.get("navSearch") || "";
    const appliedFilter = searchParams.get("filter") || "all";
    const appliedLocation = searchParams.get("location") || "all";
    const appliedSort = searchParams.get("sort") || "newest";

    setCategory(appliedFilter);
    setLocationFilter(appliedLocation);
    setSort(appliedSort);
    setSearchText(appliedSearch);

    let results = [...ALL_PROJECTS];

    if (appliedFilter !== "all") {
      const want = slugify(appliedFilter);
      results = results.filter((p) => slugify(p.category) === want);
    }

    if (appliedLocation !== "all") {
      const wantLoc = slugify(appliedLocation);
      results = results.filter((p) => slugify(p.location) === wantLoc);
    }

    if (appliedSearch) {
      const s = appliedSearch.toLowerCase();
      results = results.filter((p) =>
        `${p.title} ${p.description || ""} ${p.category || ""} ${p.location || ""}`
          .toLowerCase()
          .includes(s)
      );
    }

    if (appliedSort === "az") results.sort((a, b) => a.title.localeCompare(b.title));
    else if (appliedSort === "za") results.sort((a, b) => b.title.localeCompare(a.title));
    else if (appliedSort === "newest") {
      results.sort((a, b) => parseDateScore(b.completionDate) - parseDateScore(a.completionDate));
    } else if (appliedSort === "oldest") {
      results.sort((a, b) => parseDateScore(a.completionDate) - parseDateScore(b.completionDate));
    }

    setFiltered(results);
  }, [searchParams]);

  const updateParams = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "newest") newParams.set(key, value);
      else newParams.delete(key);
    });
    setSearchParams(newParams);
  };

  const applyCategory = (value: string) => {
    setCategory(value);
    updateParams({ filter: value });
  };

  const clearAll = () => {
    setSearchText("");
    setCategory("all");
    setLocationFilter("all");
    setSort("newest");
    updateParams({ search: "", filter: "all", location: "all", sort: "newest" });
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateParams({ search: searchText || undefined });
  };

  const openProject = (proj: typeof ALL_PROJECTS[0]) => {
    setSelected(proj);
    setModalOpen(true);
  };
  const closeProject = () => {
    setModalOpen(false);
    setTimeout(() => setSelected(null), 150);
  };

  const seoForPage = {
    title: "Projects — Younick Design Studio",
    description:
      "Explore our portfolio of interior design and construction projects across Rajasthan — residential, commercial and bespoke spaces crafted by Younick Design Studio.",
    url: "/projects",
    image: "/assets/optimized/hero-480.jpg",
    datePublished: "2025-11-01",
    dateModified: "2025-11-10",
  };

  return (
    <>
      <SEOHead seo={seoForPage} type="article" />

      <header className="relative bg-gray-900 text-white mt-24 mb-8 h-64 sm:h-80 lg:h-80 overflow-hidden">
        <picture className="absolute inset-0 w-full h-full">
          <source
            type="image/avif"
            srcSet={`${HERO_IMAGE_BASE}-1920.avif 1920w, ${HERO_IMAGE_BASE}-1024.avif 1024w`}
            sizes="100vw"
          />
          <img
            src={`${HERO_IMAGE_BASE}-1024.jpg`}
            alt="Projects hero"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EEEEEE]/70 via-transparent to-[#5A7ACD]/70 pointer-events-none"></div>
        </picture>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">Our Projects</h1>
          <p className="mt-4 text-lg text-[#e2e3e9] max-w-3xl mx-auto">
            Explore our portfolio of exceptional interior design and construction projects across Rajasthan.
          </p>
        </div>
      </header>

      <main className="bg-gradient-to-b from-[#F7F6F3] via-white to-[#F8F4EE] min-h-screen -mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {categoryCounts.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Browse by Category</h3>
                <button onClick={clearAll} className="text-xs text-gray-500 hover:text-gray-700" type="button">Clear</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryCounts.map(([cat, count]) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => applyCategory(cat)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      slugify(category) === slugify(cat) ? "bg-[#18181B] text-white border-[#18181B]" : "bg-white text-gray-700 border-gray-200 hover:border-[#D2A761]"
                    }`}
                  >
                    {cat} <span className="text-[10px] text-gray-400">({count})</span>
                  </button>
                ))}
              </div>
            </section>
          )}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between mb-6">
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
              <label htmlFor="project-search" className="sr-only">Search projects</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Search size={16} /></div>
                  <input
                    id="project-search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search projects, location or category"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  />
                </div>
                <button type="submit" className="px-3 py-2 rounded-lg bg-[#E6B566] text-[#493E25] text-sm hover:bg-[#d2a761]">Search</button>
              </div>
            </form>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                <button onClick={() => setView("grid")} className={`p-2 rounded ${view === "grid" ? "bg-[#18181B] text-white" : "text-gray-600 hover:bg-gray-100"}`} type="button"><Grid size={16} /></button>
                <button onClick={() => setView("list")} className={`p-2 rounded ${view === "list" ? "bg-[#D2A761] text-white" : "text-gray-600 hover:bg-gray-100"}`} type="button"><List size={16} /></button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 text-sm text-gray-700">
            <div>Showing <strong>{filtered.length}</strong> of <strong>{ALL_PROJECTS.length}</strong> projects</div>
          </div>

          {(() => {
            const activeSearch = searchParams.get("search") || searchParams.get("navSearch") || "";
            const hasCategory = category && category !== "all";
            const hasSearch = !!activeSearch;
            if (!hasCategory && !hasSearch) return null;
            return (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-gray-500">Active filters:</span>
                {hasCategory && (
                  <button
                    type="button"
                    onClick={() => applyCategory("all")}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:border-[#D2A761]"
                  >
                    Category: {category} <span className="text-gray-400">×</span>
                  </button>
                )}
                {hasSearch && (
                  <button
                    type="button"
                    onClick={() => updateParams({ search: "" })}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:border-[#D2A761]"
                  >
                    Search: {activeSearch} <span className="text-gray-400">×</span>
                  </button>
                )}
              </div>
            );
          })()}

          <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "relative"}>
            {view === "list" && filtered.length > 0 && (
              <StyledListView filtered={filtered} openProject={openProject} />
            )}

            {view === "grid" && filtered.map((proj) => (
              <div key={proj.id} className="h-full">
                <ProjectCard project={proj} onClick={() => openProject(proj)} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Filter size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your filters or search to see more results.</p>
            </div>
          )}
        </div>

        {selected && (
          <ProjectModal
            project={selected}
            isOpen={modalOpen}
            onClose={closeProject}
            related={ALL_PROJECTS.filter((p) => p.id !== selected.id && p.category === selected.category).slice(0, 3)}
            onSelectRelated={(p) => openProject(p)}
          />
        )}
      </main>
    </>
  );
};

const StyledListView = ({ filtered, openProject }: { filtered: typeof ALL_PROJECTS; openProject: (proj: typeof ALL_PROJECTS[0]) => void }) => (
  <div className="space-y-4">
    {filtered.map((proj, idx) => {
      const inProgress = !proj.completionDate || /in progress/i.test(proj.completionDate);
      return (
        <div
          key={proj.id}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-md hover:border-[#D2A761]"
          onClick={() => openProject(proj)}
        >
          <div className="relative p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer">
            {/* Left content with index indicator */}
            <div className="flex gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#D2A761] to-[#B08D57] text-white font-bold text-lg">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${getCategoryStyles(proj.category)}`}>
                    {proj.category}
                  </span>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${getLocationStyles()}`}>
                    {proj.location}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#493E25]">{proj.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
              </div>
            </div>
            <div className={`text-xs rounded-full border px-2.5 py-1 ${inProgress ? "bg-[#FCE6B0] text-[#6B4E16] border-[#F5C970]" : "bg-white text-gray-600 border-gray-200"}`}>
              {proj.completionDate || "In Progress"}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default Projects;


