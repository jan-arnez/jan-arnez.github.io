import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

/** All projects in display order. */
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection("projects");
  return projects.toSorted((a, b) => a.data.order - b.data.order);
}

export function projectHref(project: Pick<Project, "id">): string {
  return `/projects/${encodeURIComponent(project.id)}/`;
}
