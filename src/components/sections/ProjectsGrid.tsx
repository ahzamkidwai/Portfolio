// "use client";

// import { useMemo, useState } from "react";
// import Container from "@/components/ui/Container";
// import SectionHeading from "@/components/ui/SectionHeading";
// import ProjectCard from "./ProjectCard";
// import ProjectModal from "./ProjectModal";
// import { projects } from "@/lib/data/projects";
// import { ProjectCategory, ProjectEntry } from "@/lib/types";
// import { cn } from "@/lib/utils";

// const categories: ("All" | ProjectCategory)[] = [
//   "All",
//   "AI Engineering",
//   "Blockchain / Web3",
//   "Full-Stack",
//   "Developer Tools",
// ];

// export default function ProjectsGrid() {
//   const [filter, setFilter] = useState<(typeof categories)[number]>("All");
//   const [selected, setSelected] = useState<ProjectEntry | null>(null);

//   const featured = useMemo(() => projects.filter((p) => p.featured), []);
//   const rest = useMemo(
//     () =>
//       projects.filter(
//         (p) => !p.featured && (filter === "All" || p.category === filter)
//       ),
//     [filter]
//   );

//   return (
//     <section id="projects" className="py-24 md:py-32">
//       <Container>
//         <SectionHeading
//           eyebrow="Projects"
//           title="Selected work."
//           description="Extracted from my resume and pinned GitHub repositories — no fabricated metrics or links."
//         />

//         <div className="mb-10">
//           <p className="eyebrow mb-4">Featured</p>
//           <div className="grid gap-6 md:grid-cols-3">
//             {featured.map((project) => (
//               <ProjectCard key={project.id} project={project} featured onOpen={() => setSelected(project)} />
//             ))}
//           </div>
//         </div>

//         <div className="mb-6 flex flex-wrap gap-2">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setFilter(cat)}
//               className={cn(
//                 "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
//                 filter === cat
//                   ? "border-signal bg-signal-soft text-signal-dim"
//                   : "border-line-strong text-muted hover:text-ink"
//               )}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {rest.map((project) => (
//             <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
//           ))}
//         </div>
//       </Container>

//       <ProjectModal project={selected} onClose={() => setSelected(null)} />
//     </section>
//   );
// }


"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "@/lib/data/projects";
import { ProjectCategory, ProjectEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories: ("All" | ProjectCategory)[] = [
  "All",
  "AI Engineering",
  "Blockchain / Web3",
  "Full-Stack",
  "Developer Tools",
];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<ProjectEntry | null>(null);

  const filtered = useMemo(
    () => projects.filter((p) => filter === "All" || p.category === filter),
    [filter]
  );

  return (
    <section id="projects" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Selected work."
          description="Extracted from my resume and pinned GitHub repositories — no fabricated metrics or links."
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
                filter === cat
                  ? "border-signal bg-signal-soft text-signal-dim"
                  : "border-line-strong text-muted hover:text-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
          ))}
        </div>
      </Container>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}