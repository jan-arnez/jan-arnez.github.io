import type { Project } from "../lib/projects.ts";

const VIDEO_PATTERN = /\.(?:mp4|webm|mov)$/iu;

interface ProjectMediaProps {
  readonly project: Project;
  /** Hero media is always widescreen; cards use the aspect from frontmatter. */
  readonly variant: "card" | "hero";
}

/** Empty media slot shown until a real file is added; keeps the author's note visible. */
function MediaPlaceholder({ note }: { note: string | undefined }) {
  return (
    <div className="flex size-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
      {note ?? "Media coming soon"}
    </div>
  );
}

/**
 * Cover media shared between the home card and the project hero. Both carry the
 * same `view-transition-name`, so navigating between the pages morphs one into the other.
 */
export function ProjectMedia({ project, variant }: ProjectMediaProps) {
  const { src, note, aspect, hue } = project.data.cover;
  const filter = `hue-rotate(${hue}deg) saturate(0.7) contrast(1.1)`;

  return (
    <div
      className={`project-media overflow-hidden bg-foreground/5 ${
        variant === "card" && aspect === "square" ? "aspect-square" : "aspect-video"
      }`}
      style={{ viewTransitionName: `project-media-${project.id}` }}
    >
      {src === undefined ? (
        <MediaPlaceholder note={note} />
      ) : (
        <CoverFile src={src} filter={filter} />
      )}
    </div>
  );
}

function CoverFile({ src, filter }: { src: string; filter: string }) {
  return VIDEO_PATTERN.test(src) ? (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      style={{ filter }}
      className="size-full object-cover"
    />
  ) : (
    <img src={src} alt="" style={{ filter }} className="size-full object-cover" />
  );
}
