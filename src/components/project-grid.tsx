import { projectHref, type Project } from "../lib/projects.ts";
import { ProjectMedia } from "./project-media.tsx";

const columns = [1, 2] as const;

export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
      {columns.map((column) => (
        // `contents` on small screens lets every card join the single outer column, where
        // the `order` style keeps them chronological instead of column 1 then column 2.
        <div key={column} className="contents lg:flex lg:flex-col lg:gap-y-8">
          {projects
            .filter((project) => project.data.column === column)
            .map((project) => (
              <article key={project.id} style={{ order: project.data.order }}>
                <a href={projectHref(project)} className="group flex flex-col gap-y-4">
                  <ProjectMedia project={project} variant="card" />
                  <div className="flex items-center justify-between gap-x-2">
                    <div className="text-lg font-medium transition-colors group-hover:text-primary">
                      {project.data.title}
                    </div>
                    <div className="shrink-0 text-sm text-muted-foreground uppercase">
                      {project.data.category} • {project.data.year}
                    </div>
                  </div>
                </a>
              </article>
            ))}
        </div>
      ))}
    </div>
  );
}
