---
title: ADC Smart Systems
headline: Designing a shift calendar and a design system for ADC
summary: After seeing what I was building at a startup event, ADC invited me to join the team. I designed and built the calendar for an unreleased product and redesigned their website on top of a new design system.
category: Product Design
year: 2025
timeline: 2025 – 2026 · ADC sistemi, Slovenia
scope: [Product Design, Design Systems, Web Design, Front-end]
cover:
  src: /media/adc-cover.png
  aspect: square
column: 2
order: 3
---

## Overview

### From a startup event to the team

ADC is a Slovenian company that makes smart home and building access systems: controllers that make existing shades and windows smart, and a portal that lets residents open doors, barriers and garages with their phone.

I met the team at a startup event, where I showed what I was working on. Not long after, they invited me to join.

I worked on two things: **a scheduling calendar for a product that hasn't been released yet**, and **a redesign of the company website, built on a design system in Figma.**

## The calendar

### Planning shifts should take seconds, not spreadsheets

The calendar is a scheduling view for teams. Every person has a row, every shift is a block, and everything can be changed directly on the timeline.

![The shift calendar: switching from week to day view, dragging shifts between days and times, and editing a shift in a dialog](/media/adc-calendar.mp4 "Week and day views, drag to reschedule, and editing a shift in place.")

- **Week and day views** – the week shows who works when at a glance; the day view turns shifts into bars on a 24-hour timeline.
- **Drag to reschedule** – shifts move between days and times by dragging, with the time shown under the cursor while you drop.
- **Edit in place** – clicking a shift opens a dialog for the title, note, employee, date, start and end time, location and color.

**The goal was simple: the calendar should feel like moving sticky notes on a board, not filling in a form.**

## The website

### One system instead of one-off pages

ADC's [original website](https://web.archive.org/web/20260306055033/https://www.adcsmarthome.com/) had grown page by page, and it showed: spacing, type and components varied from section to section.

I knew I wouldn't be at ADC for long, so a one-off redesign wasn't enough. The team needed something they could keep building on after I left.

I started with a **design system in Figma** – color and type tokens, a spacing scale, and components like buttons, product cards and section layouts – and redesigned the site on top of it, now at [adcsmartsystems.com](https://adcsmartsystems.com/adc-city/entrance-doors). Then I **set up the codebase** with the same tokens and components, so the team could add new pages on their own without losing the look.

Every page was assembled from the same parts, which kept the site consistent and made new sections quick to put together.

## Outcome

### What a design system is for

Sadly, it didn't last the way I'd hoped. After I left, the team moved from building pages with the design system to vibe coding them with AI on top of what was there. New pages no longer start from the shared components, so the design has drifted, and parts of the site have picked up a generic, AI-made look.

That was the clearest lesson of the project: **a design system isn't a Figma file, it's a habit.** AI makes it faster to ship pages, but without a system to build from, it also makes it faster to lose consistency.
