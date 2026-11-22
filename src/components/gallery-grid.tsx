import type { GalleryItem } from "../data/gallery.ts";

const VIDEO_PATTERN = /\.(?:mp4|webm|mov)$/iu;
const columns = [1, 2] as const;

function GalleryMedia({ item }: { item: GalleryItem }) {
  const className =
    "size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]";
  return (
    <div className={`overflow-hidden bg-foreground/5 ${item.aspect}`}>
      {VIDEO_PATTERN.test(item.src) ? (
        <video
          src={item.src}
          aria-label={item.alt}
          autoPlay
          muted
          loop
          playsInline
          className={className}
        />
      ) : (
        <img src={item.src} alt={item.alt} loading="lazy" className={className} />
      )}
    </div>
  );
}

/** Two-column masonry of moments; each tile links to its post (or project page). */
export function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
      {columns.map((column) => (
        <div key={column} className="flex flex-col gap-y-12">
          {items
            .filter((item) => item.column === column)
            .map((item) => {
              const external = item.href.startsWith("http");
              return (
                <figure key={item.src}>
                  <a
                    href={item.href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex flex-col gap-y-4"
                  >
                    <GalleryMedia item={item} />
                    <figcaption className="flex flex-col gap-y-1.5">
                      <div className="flex items-center justify-between gap-x-2">
                        <div className="text-lg font-medium transition-colors group-hover:text-primary">
                          {item.title}
                        </div>
                        <div className="shrink-0 text-sm text-muted-foreground uppercase">
                          {item.label}
                        </div>
                      </div>
                      <p className="max-w-md leading-relaxed text-muted-foreground">{item.text}</p>
                    </figcaption>
                  </a>
                </figure>
              );
            })}
        </div>
      ))}
    </div>
  );
}
