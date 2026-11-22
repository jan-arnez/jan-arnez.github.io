import { useEffect, useState, type ReactNode } from "react";

export interface NavSection {
  readonly id: string;
  readonly label: string;
}

const itemClass = (active: boolean) =>
  `relative transition-colors hover:text-foreground ${
    active
      ? "text-primary before:absolute before:top-1/2 before:-left-3 before:size-1 before:-translate-y-1/2 before:bg-primary hover:text-primary"
      : "text-muted-foreground"
  }`;

function SideList({ label, children }: { label: string; children: ReactNode }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-col gap-1.5 text-[15px]">{children}</ul>
    </nav>
  );
}

const pages = [
  { href: "/", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/gallery/", label: "Gallery" },
] as const;

/** Site pages; `current` is the pathname of the page being rendered. */
export function PageNav({ current }: { current: string }) {
  return (
    <SideList label="Pages">
      {pages.map(({ href, label }) => (
        <li key={href}>
          <a
            href={href}
            aria-current={current === href ? "page" : undefined}
            className={itemClass(current === href)}
          >
            {label}
          </a>
        </li>
      ))}
    </SideList>
  );
}

/** Portion of the viewport a section's top must pass before it counts as the current one. */
const ACTIVE_LINE = 0.4;

/**
 * The section whose top has most recently scrolled past `ACTIVE_LINE`. At the very bottom of
 * the page the last section wins, since a short final section may never reach the line.
 */
function currentSection(sections: readonly NavSection[]): string | undefined {
  const { innerHeight, scrollY } = window;
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
    return sections.at(-1)?.id;
  }
  let current = sections[0]?.id;
  for (const { id } of sections) {
    const top = document.querySelector(`#${CSS.escape(id)}`)?.getBoundingClientRect().top;
    if (top !== undefined && top <= innerHeight * ACTIVE_LINE) {
      current = id;
    }
  }
  return current;
}

/** In-page index for a project (hydrated island); highlights the section being read. */
export function SectionNav({ sections }: { sections: readonly NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      setActive(currentSection(sections));
    }
    function schedule() {
      if (frame === 0) {
        frame = requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  return (
    <SideList label="Sections">
      {sections.map(({ id, label }) => (
        <li key={id}>
          <a href={`#${id}`} className={itemClass(active === id)}>
            {label}
          </a>
        </li>
      ))}
    </SideList>
  );
}
