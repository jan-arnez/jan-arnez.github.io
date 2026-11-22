import { existsSync } from "node:fs";
import type { Element, ElementContent, Root } from "hast";

const VIDEO_PATTERN = /\.(?:mp4|webm|mov)$/iu;
/** A paragraph like `[MEDIA - what goes here]`: a slot for media that hasn't been added yet. */
const MEDIA_PLACEHOLDER_PATTERN = /^\[MEDIA\b[\s\S]*\]$/u;

function isWhitespace(node: ElementContent): boolean {
  return node.type === "text" && node.value.trim() === "";
}

/** The image of a paragraph that contains nothing else. */
function soleImage(node: Element): Element | undefined {
  if (node.tagName !== "p") {
    return undefined;
  }
  const [only, ...rest] = node.children.filter((child) => !isWhitespace(child));
  return rest.length === 0 && only?.type === "element" && only.tagName === "img" ? only : undefined;
}

/** `/media/clip.mp4` → `/media/clip-poster.png`, if that file exists in `public/`. */
function posterFor(src: string): string | undefined {
  if (!src.startsWith("/")) {
    return undefined;
  }
  const poster = src.replace(VIDEO_PATTERN, "-poster.png");
  return existsSync(`public${poster}`) ? poster : undefined;
}

function toFigure(image: Element): Element {
  const src = image.properties.src ?? "";
  const alt = image.properties.alt ?? "";
  const title = image.properties.title;

  const media: Element = VIDEO_PATTERN.test(src)
    ? {
        type: "element",
        tagName: "video",
        properties: {
          src,
          poster: posterFor(String(src)),
          ariaLabel: alt,
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
        },
        children: [],
      }
    : {
        type: "element",
        tagName: "img",
        properties: { src, alt, loading: "lazy", decoding: "async" },
        children: [],
      };

  const caption: Element[] =
    title !== undefined && title !== ""
      ? [
          {
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: [{ type: "text", value: title }],
          },
        ]
      : [];

  return { type: "element", tagName: "figure", properties: {}, children: [media, ...caption] };
}

/** A paragraph whose only content is a `[MEDIA - …]` note. */
function mediaPlaceholder(node: Element): Element | undefined {
  const [only, ...rest] = node.children;
  if (node.tagName !== "p" || rest.length > 0 || only?.type !== "text") {
    return undefined;
  }
  const note = only.value.trim();
  return MEDIA_PLACEHOLDER_PATTERN.test(note)
    ? {
        type: "element",
        tagName: "div",
        properties: { className: ["media-placeholder"] },
        children: [{ type: "text", value: note }],
      }
    : undefined;
}

function transform(node: Root | Element): void {
  for (const [index, child] of node.children.entries()) {
    if (child.type !== "element") {
      continue;
    }
    const image = soleImage(child);
    if (image !== undefined) {
      node.children[index] = toFigure(image);
      continue;
    }
    const placeholder = mediaPlaceholder(child);
    if (placeholder !== undefined) {
      node.children[index] = placeholder;
      continue;
    }
    if (child.tagName === "a" && /^https?:/u.test(child.properties.href ?? "")) {
      child.properties.target = "_blank";
      child.properties.rel = ["noreferrer"];
    }
    transform(child);
  }
}

/**
 * Markdown post-processing:
 * - an image on its own line becomes `<figure>` with its title as `<figcaption>`
 *   (`.mp4`/`.webm`/`.mov` render as autoplaying, muted, looping video);
 * - a paragraph that is just `[MEDIA - …]` becomes an empty media box showing that note;
 * - external links open in a new tab.
 */
export function rehypeFigures() {
  return (tree: Root): void => {
    transform(tree);
  };
}
