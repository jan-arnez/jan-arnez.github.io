import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const text = z.string().trim().min(1);

/**
 * One markdown file per project in `src/content/projects/`; the filename is the URL slug.
 * Frontmatter is validated at build time, so a missing or mistyped field fails the build.
 */
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: z.strictObject({
    /** Short name used on cards and "next project" links. */
    title: text,
    /** Large statement heading at the top of the project page. */
    headline: text,
    /** Optional subtitle under the headline; also the page's meta description. */
    summary: text.optional(),
    /** Small uppercase label on the card. */
    category: text,
    year: z.number().int(),
    timeline: text,
    role: text.optional(),
    scope: z.array(text).nonempty(),
    collaborators: z.array(text).default([]),
    cover: z.strictObject({
      /** Absolute path of an image or video in `public/`. Omit to show a placeholder box. */
      src: text.startsWith("/").optional(),
      /** What the cover should show; displayed in the placeholder until `src` is set. */
      note: text.optional(),
      aspect: z.enum(["square", "video"]),
      /** Hue rotation (degrees) applied to the cover so placeholder media look distinct. */
      hue: z.number().min(0).max(360).default(0),
    }),
    /** Column of the home page grid the card is placed in. */
    column: z.union([z.literal(1), z.literal(2)]),
    /** Sort order on the home page (ascending) and for "next project". */
    order: z.number().int(),
  }),
});

export const collections = { projects };
