---
title: Agentic Design System
headline: Beautiful UI at the speed of AI, without losing reliability
summary: What I'm building now. A Figma-meets-Storybook workspace where a moodboard becomes a design system. AI restyles a base set of components to match the board, and every component is checked in every state.
category: In Progress
year: 2026
timeline: 2026 – present · Side project
role: Design Engineer
scope: [Product Design, Design Systems, Design Engineering, AI]
cover:
  src: /media/agentic-design-system/cover.mp4
  aspect: square
column: 1
order: 0
---

## Overview

### Design systems live in two places that never meet

A design system usually has two homes. **Figma** holds the look: tokens, components, and pages of examples. **Storybook** holds the truth: the real components, their props and every state they can be in.

Keeping the two in sync is a job of its own, and from my time at ADC I know what happens when nobody does it. The system drifts.

I'm building one workspace for both. You design on a canvas like in Figma, but the components on it are real code, documented and tested like in Storybook. An AI agent does the repetitive work in between.

> I want this to be the place where beautiful UI is made at the speed of AI, and where reliability doesn't suffer for it.

## The idea

### From a moodboard to a tested system

![The four steps: moodboard, restyle primitives, grow the system, test every state](/media/agentic-design-system/flow.png "The flow I'm designing toward. The canvas is the part I'm building now.")

1. **Moodboard**: collect references, screenshots and notes on an infinite canvas.
2. **Restyle primitives**: an AI agent takes a base set of components (buttons, inputs, menus) and restyles them to match the board.
3. **Grow the system**: keep working from there. Add your own components, tokens, and rules for when to use each one.
4. **Test every state**: with Vercel's AI SDK, the agent will build components directly into the system and render each one in every state: hover, focus, loading, disabled, error, long text.

## The canvas

### Where it starts: a board you can think on

Right now I'm building the canvas, because everything else starts there. You can drop in images, add sticky notes and pin them to an image, move and resize everything, and undo any change.

![A moodboard on the canvas with images, sticky notes and an open comment thread](/media/agentic-design-system/moodboard.png "A moodboard with notes pinned to images and a comment thread.")

Comments are pinned to a spot on the canvas, so feedback stays next to the thing it's about. Threads have replies and can be resolved, the same way they work in design reviews.

### Projects that start with a structure

Every project starts from a template. A design system project comes with pages for foundations (colors, type, spacing, icons), one page per component, and patterns. Each page has a starter note saying what belongs there.

![The template picker with Blank, Design system, Complex component, Explore ideas and Screen flow](/media/agentic-design-system/templates.png "Templates for a design system, one complex component, an open moodboard or a screen flow.")

![The design system editor with its page tree](/media/agentic-design-system/editor.png "A design system project: foundations, components and patterns as pages.")

### Tokens like Figma variables

Tokens work like Figma variables: collections of named values, with one value per mode. Colors get a Light and a Dark value. Spacing, radius and font sizes get one value each.

![The tokens window with color tokens in light and dark mode](/media/agentic-design-system/tokens.png "Color tokens with a value for each mode.")

## A system built for AI

### Constraints are what make AI reliable

AI writes UI fast, but left alone it invents a new shade of gray, a new padding and a new button on every screen. So before building the product, I built the design system it runs on, made so that an agent **can't easily do the wrong thing**.

It has 60+ primitives, layouts and patterns, built on three ideas:

- **Base UI for behavior.** Focus, keyboard navigation, menus, dialogs and accessibility come from [Base UI](https://base-ui.com). My components only add the look and a small, typed API.
- **CSS that can only use tokens.** Lint rules reject hex colors, raw pixel spacing, font sizes, z-indexes and durations. Every value has to be a variable from the token file.
- **Docs that agents can query.** Storybook runs an MCP server, so an agent can look up which components exist and how each one should be used before it writes a line of code.

### Small, typed APIs

A component exposes only the options that make sense. The comments on the props are the usage rules, so the editor and the agent both see them. (Snippets are trimmed from the real `Button`.)

```tsx
export type ButtonProps = {
  /** The text. Long text ends with an ellipsis and shows on hover. */
  children: string;
  /**
   * primary: the one main action of a view.
   * secondary: other actions. ghost: quiet actions in rows and bars.
   * danger: delete, remove, log out.
   */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  icon?: IconName;
  /** A keyboard shortcut after the text, for example ["⌘", "K"]. */
  shortcut?: readonly string[];
  /** Shows a spinner and blocks clicks. The width does not change. */
  loading?: boolean;
};
```

Using it takes one line, and there's no `className` to override:

```tsx
<Button variant="primary" icon="plus" shortcut={["⌘", "N"]}>
  New project
</Button>
```

### CSS where variants only change variables

Each component defines its own variables from the tokens. A variant changes those variables and nothing else, so a new style is a change to the token file, not a rewrite of every component.

```css
.ui-button {
  --button-height: var(--control-md);
  --button-bg: var(--bg-control);
  --button-fg: var(--fg-default);

  block-size: var(--button-height);
  padding-inline: var(--space-2-5);
  border-radius: var(--radius-control);
  background: var(--button-bg);
  color: var(--button-fg);
  font: var(--text-label);

  /* Variants: reassign variables, nothing else */
  &[data-variant="primary"] {
    --button-bg: var(--bg-inverse);
    --button-fg: var(--fg-inverse);
  }
}
```

The rules are enforced, not just suggested. If an agent writes `padding: 12px` or `color: #333`, the check fails:

```js
// stylelint.config.mjs
"color-no-hex": true,
"declaration-property-unit-disallowed-list": {
  "/^(padding|margin|gap|row-gap|column-gap|inset)/": ["px", "rem", "em"],
  "/^border(-.*)?-radius$/": ["px", "rem", "em"],
},
"declaration-no-important": true,
```

This is also what makes step two of the flow possible. When the whole look lives in tokens, an AI can restyle every primitive to match a moodboard by changing values, and the behavior, accessibility and states stay the same.

### Every component knows how it should be used

Every component has a Storybook page that says **when to use it, when not to, and what to use instead**, with its anatomy and every state as a story.

![Storybook documentation for Button with when to use and when not to use](/media/agentic-design-system/storybook.png "Each component's docs list when to use it, when not to, and what to use instead.")

The agent reads the same pages through Storybook's MCP server. Before building any UI, it follows the same steps every time:

1. **`docs-list`** – see which components exist.
2. **`docs-show`** – read the whole doc for each component it will use: when to use it, when not to, props and examples.
3. **Build** – import only from the library, never from source paths or with one-off styles.
4. **Document** – a new component or prop updates its docs. A check fails if a component has no docs page or a required section is missing.

So the agent builds with your system instead of making up its own, and every screen it makes looks like it belongs.

## What's next

### From canvas to agent

The canvas comes first because it's where every project starts. Next is the agent: connecting the Vercel AI SDK so it can take a moodboard, restyle the base components to match it, and add new components to the library with their docs and states.

The goal is that a design system stops being a file that drifts and becomes something that **checks itself**, so UI can be made at the speed of AI without giving up reliability.
