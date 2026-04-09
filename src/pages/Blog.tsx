import React, { useEffect, useMemo, useState } from "react";

/**
 * Blog page component with accessible, responsive UI/UX:
 * - Search, tag filter, sort, pagination
 * - Loading skeleton and empty states
 * - Simple, dependency-free styling
 *
 * Drop this file into /src/pages/Blog (Blog.tsx or Blog.jsx)
 */

/* ---------- Types ---------- */
type Post = {
   id: string;
   title: string;
   summary: string;
   tags: string[];
   author: string;
   date: string; // ISO
   readingMinutes: number;
};

/* ---------- Sample data (replace with real fetch) ---------- */
const SAMPLE_POSTS: Post[] = [
   {
      id: "1",
      title: "Designing for Humans: Usability Basics",
      summary:
         "Practical techniques to make interfaces intuitive, accessible and delightful.",
      tags: ["UX", "Design"],
      author: "Alex Kim",
      date: "2024-09-12",
      readingMinutes: 6,
   },
   {
      id: "2",
      title: "React Patterns for Maintainable Apps",
      summary: "Small, composable patterns that scale with your app.",
      tags: ["React", "Frontend"],
      author: "Priya Patel",
      date: "2024-07-02",
      readingMinutes: 8,
   },
   {
      id: "3",
      title: "Performance Budgeting 101",
      summary:
         "How to set limits and measure performance to keep fast experiences.",
      tags: ["Performance"],
      author: "Jamie Lee",
      date: "2024-05-19",
      readingMinutes: 4,
   },
   {
      id: "4",
      title: "Content Strategy for Product Teams",
      summary:
         "Aligning content, product and UX to create consistent user journeys.",
      tags: ["Content", "UX"],
      author: "Morgan Reed",
      date: "2024-08-03",
      readingMinutes: 7,
   },
   {
      id: "5",
      title: "Accessible Components Without the Overhead",
      summary:
         "Patterns to make components accessible using semantics and simple ARIA.",
      tags: ["Accessibility", "Frontend"],
      author: "Sam Rivera",
      date: "2024-04-14",
      readingMinutes: 5,
   },
];

/* ---------- Small styling helpers ---------- */
const styles: Record<string, React.CSSProperties> = {
   page: {
      fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "#0f172a",
      padding: 20,
      maxWidth: 1100,
      margin: "0 auto",
   },
   header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 18,
      flexWrap: "wrap",
   },
   title: { fontSize: 28, fontWeight: 700, margin: 0 },
   subtitle: { margin: 0, color: "#475569", fontSize: 14 },
   controls: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
   input: {
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #e2e8f0",
      minWidth: 220,
      outline: "none",
   },
   select: {
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #e2e8f0",
      background: "white",
   },
   tagButton: {
      padding: "6px 10px",
      borderRadius: 999,
      border: "1px solid #e2e8f0",
      background: "#fff",
      cursor: "pointer",
      fontSize: 13,
   },
   activeTag: {
      background: "#0ea5a4",
      color: "white",
      borderColor: "#0ea5a4",
   },
   grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 16,
      marginTop: 18,
   },
   card: {
      borderRadius: 12,
      padding: 16,
      border: "1px solid #e6eef6",
      background: "linear-gradient(180deg,#fff,#fbfdff)",
      boxShadow: "0 6px 18px rgba(15,23,42,0.03)",
      minHeight: 140,
      display: "flex",
      flexDirection: "column",
      gap: 8,
   },
   metaRow: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748b" },
   tagRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" },
   pagination: { display: "flex", gap: 8, alignItems: "center", marginTop: 18, justifyContent: "center" },
   pageButton: {
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #e2e8f0",
      background: "white",
      cursor: "pointer",
   },
   pageButtonActive: { background: "#0ea5a4", color: "white", borderColor: "#0ea5a4" },
   skeleton: {
      background: "linear-gradient(90deg,#f1f5f9,#e2e8f0,#f1f5f9)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s linear infinite",
      borderRadius: 8,
      height: 16,
   },
   empty: { padding: 36, borderRadius: 12, textAlign: "center", color: "#64748b", border: "1px dashed #e2e8f0" },
};

/* keyframes for shimmer (inlined via style tag below) */
const ShimmerStyle = () => React.createElement("style", null, `@keyframes shimmer {
   0%{background-position:200% 0}
   100%{background-position:-200% 0}
}`);

/* ---------- Small utilities ---------- */
const formatDate = (iso: string) => new Date(iso).toLocaleDateString();

const uniqueTags = (posts: Post[]) =>
   Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

/* ---------- Main component ---------- */
export default function BlogPage(): JSX.Element {
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [query, setQuery] = useState("");
   const [selectedTag, setSelectedTag] = useState<string | null>(null);
   const [sort, setSort] = useState<"new" | "old" | "read">("new");
   const [page, setPage] = useState(1);
   const pageSize = 6;

   useEffect(() => {
      // Simulate fetch with delay (replace with real fetch)
      setLoading(true);
      const t = setTimeout(() => {
         setPosts(SAMPLE_POSTS);
         setLoading(false);
      }, 600);
      return () => clearTimeout(t);
   }, []);

   useEffect(() => {
      setPage(1); // reset when filters change
   }, [query, selectedTag, sort]);

   const tags = useMemo(() => uniqueTags(posts), [posts]);

   const filtered = useMemo(() => {
      let res = posts.slice();
      if (query.trim()) {
         const q = query.toLowerCase();
         res = res.filter(
            (p) =>
               p.title.toLowerCase().includes(q) ||
               p.summary.toLowerCase().includes(q) ||
               p.author.toLowerCase().includes(q) ||
               p.tags.join(" ").toLowerCase().includes(q)
         );
      }
      if (selectedTag) {
         res = res.filter((p) => p.tags.includes(selectedTag));
      }
      if (sort === "new") res.sort((a, b) => +new Date(b.date) - +new Date(a.date));
      if (sort === "old") res.sort((a, b) => +new Date(a.date) - +new Date(b.date));
      if (sort === "read") res.sort((a, b) => b.readingMinutes - a.readingMinutes);
      return res;
   }, [posts, query, selectedTag, sort]);

   const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
   const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

   return (
      <div style={styles.page} aria-labelledby="blog-heading" role="main mt-24">
         <ShimmerStyle />
         <header style={styles.header}>
            <div>
               <h1 id="blog-heading" style={styles.title}>
                  Product & Design Blog
               </h1>
               <p style={styles.subtitle}>Practical articles on design, frontend and product thinking.</p>
            </div>

            <div style={styles.controls} role="region" aria-label="Blog controls">
               <label style={{ display: "none" }} htmlFor="search">
                  Search posts
               </label>
               <input
                  id="search"
                  type="text"
                  style={styles.input}
                  placeholder="Search by title, tag, author..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search posts"
               />

               <select
                  aria-label="Sort posts"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  style={styles.select}
                  title="Sort posts"
               >
                  <option value="new">Newest</option>
                  <option value="old">Oldest</option>
                  <option value="read">Most reading time</option>
               </select>

               <button
                  onClick={() => {
                     setQuery("");
                     setSelectedTag(null);
                     setSort("new");
                  }}
                  style={{ ...styles.pageButton }}
                  aria-label="Reset filters"
                  title="Reset filters"
               >
                  Reset
               </button>
            </div>
         </header>

         <nav aria-label="Tag filters" style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
               <button
                  onClick={() => setSelectedTag(null)}
                  style={{
                     ...styles.tagButton,
                     ...(selectedTag === null ? styles.activeTag : {}),
                  }}
                  aria-pressed={selectedTag === null}
                  title="Show all posts"
               >
                  All
               </button>

               {tags.map((t) => (
                  <button
                     key={t}
                     onClick={() => setSelectedTag((s) => (s === t ? null : t))}
                     style={{
                        ...styles.tagButton,
                        ...(selectedTag === t ? styles.activeTag : {}),
                     }}
                     aria-pressed={selectedTag === t}
                     title={`Filter by ${t}`}
                  >
                     {t}
                  </button>
               ))}
            </div>
         </nav>

         {loading ? (
            <section style={styles.grid} aria-busy="true" aria-live="polite">
               {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={styles.card} aria-hidden="true">
                     <div style={{ ...styles.skeleton, width: "60%" }} />
                     <div style={{ height: 8 }} />
                     <div style={{ ...styles.skeleton, width: "90%" }} />
                     <div style={{ height: 12 }} />
                     <div style={{ ...styles.skeleton, width: "40%" }} />
                  </div>
               ))}
            </section>
         ) : filtered.length === 0 ? (
            <div style={styles.empty} role="status">
               No posts match your filters. Try removing a filter or searching a different term.
            </div>
         ) : (
            <>
               <section style={styles.grid} aria-live="polite">
                  {visible.map((p) => (
                     <article
                        key={p.id}
                        style={styles.card}
                        aria-labelledby={`post-title-${p.id}`}
                        tabIndex={0}
                     >
                        <h3 id={`post-title-${p.id}`} style={{ margin: 0, fontSize: 18 }}>
                           {p.title}
                        </h3>
                        <p style={{ margin: 0, color: "#475569", fontSize: 14 }}>{p.summary}</p>

                        <div style={styles.metaRow}>
                           <div>
                              <span>{p.author}</span>
                              <span style={{ marginLeft: 8 }}>• {formatDate(p.date)}</span>
                           </div>
                           <div>{p.readingMinutes} min</div>
                        </div>

                        <div style={styles.tagRow} aria-hidden={false}>
                           {p.tags.map((t) => (
                              <span
                                 key={t}
                                 onClick={() => setSelectedTag(t)}
                                 role="button"
                                 tabIndex={0}
                                 style={{
                                    padding: "6px 10px",
                                    borderRadius: 999,
                                    fontSize: 12,
                                    border: "1px solid #e2e8f0",
                                    cursor: "pointer",
                                    background: selectedTag === t ? "#0ea5a4" : "#fff",
                                    color: selectedTag === t ? "#fff" : "#0f172a",
                                 }}
                                 aria-pressed={selectedTag === t}
                                 title={`Filter by ${t}`}
                              >
                                 {t}
                              </span>
                           ))}
                        </div>
                     </article>
                  ))}
               </section>

               <footer style={styles.pagination} aria-label="Pagination">
                  <button
                     style={styles.pageButton}
                     onClick={() => setPage((p) => Math.max(1, p - 1))}
                     disabled={page === 1}
                     aria-disabled={page === 1}
                  >
                     Prev
                  </button>

                  {Array.from({ length: pageCount }).map((_, i) => {
                     const idx = i + 1;
                     const active = idx === page;
                     return (
                        <button
                           key={idx}
                           onClick={() => setPage(idx)}
                           style={{ ...styles.pageButton, ...(active ? styles.pageButtonActive : {}) }}
                           aria-current={active ? "page" : undefined}
                        >
                           {idx}
                        </button>
                     );
                  })}

                  <button
                     style={styles.pageButton}
                     onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                     disabled={page === pageCount}
                     aria-disabled={page === pageCount}
                  >
                     Next
                  </button>
         </footer>
            </>
         )}
      </div>
   );
}