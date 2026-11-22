---
title: Triglav Hackathon
headline: Building a conversational data assistant for Triglav
summary: A four-day hackathon at Triglav Lab, where our team won with Tavis, an AI assistant that answers actuarial and business questions in plain language, straight from the company's shared drive.
category: Hackathon
year: 2024
timeline: October 2024 · Triglav Lab, Ljubljana
scope: [Hackathon, AI, Product Development, Full-stack]
cover:
  src: /media/tavis-conversation--triglav.mp4
  note: "Hero video (20–25 s) from the Tavis demo: the question is typed into the input field, the answer appears with key metrics, the monthly bar chart animates in, and the Sources section expands. Dark interface, no text overlays."
  aspect: video
column: 1
order: 4
---

## Overview

### What if working with data was as simple as asking a question?

In October 2024, I participated in my first hackathon: **Huda Izkušnja**, a four-day challenge organized by Triglav Lab in collaboration with the University of Ljubljana's School of Economics and Business.

The challenge was to rethink traditional insurance workflows using artificial intelligence.

Our team won.

More importantly, the experience gave me an opportunity to explore how AI could make complex business data easier to access and understand.

## The solution

### From raw data to clear answers

The idea was to make interacting with business data feel more like having a conversation.

Actuaries and analysts spend a lot of time digging through folders of spreadsheets and reports on a shared drive before they can even start answering a question. Instead of manually searching for the right file and preparing visualizations, users could ask in natural language and receive a structured answer.

We called the assistant **T.A.V.I.S.**, short for _Triglav's Actuarial Virtual Intelligent System_, or simply **Tavis**.

It presents relevant information through interactive components, including key metrics, charts, and the data sources behind them.

![Two views of the same Tavis answer: new policyholders in 2023 with metrics and a monthly bar chart, and the same answer with its four sources expanded](/media/tavis-solution.png "The same answer, collapsed and with its sources expanded.")

One aspect I particularly valued was making the source information accessible alongside the answer.

**The goal wasn't just to generate answers. It was to make data easier to explore and verify.**

## How it works

### Three parts: ingest, reason, render

Tavis is split into a Python backend that understands the company's files and a Next.js frontend that turns the model's answers into interactive UI.

![Tavis architecture: shared drive, Python ingestion, API, Next.js with the AI SDK, and UI components, connected by files, index, JSON and stream](/media/tavis-architecture.png "From files on the shared drive to a rendered answer.")

#### 1. Python backend: reading the shared drive

The knowledge lived where it already lives in most companies: a shared drive full of spreadsheets, exports and reports. Rather than asking people to move their data somewhere new, the backend goes to it.

- **Crawling** – on a schedule, a Python service walks the shared drive, diffs it against the last run, and only picks up new and changed files.
- **Parsing** – each file type gets its own parser. Spreadsheets and CSVs are loaded into tables (with sheet names, headers and column types preserved), while PDFs and documents are split into text chunks.
- **Indexing** – every table and chunk is stored with its metadata (file path, sheet, last modified), so any number Tavis shows can be traced back to the exact file it came from.
- **Query API** – a thin HTTP API exposes the index: `GET /datasets` lists what is available, `POST /query` runs filters and aggregations such as sums, averages or monthly breakdowns, and `GET /sources/:id` returns the file, sheet or page behind a result.

Doing the calculations in Python instead of letting the model do arithmetic was a deliberate choice. The model decides _what_ to compute; the backend computes it. That keeps the numbers exact.

![Terminal output of the Tavis ingestion run: crawling the shared drive, parsing sheets and documents, and building the index](/media/tavis-ingestion.mp4 "An ingestion run: only changed files are parsed again.")

#### 2. AI SDK: tools instead of guesses

The chat runs on a Next.js route (`/api/chat`) using the **Vercel AI SDK**'s `streamText()`. The model doesn't answer from memory; it is given tools that map onto the backend API:

- `query_data` – filter and aggregate data from the indexed tables
- `get_sources` – fetch the files, sheets and pages a result is based on

The AI SDK handles the multi-step loop: the model decides what to look up, calls the tools, and only then writes the final answer. Responses are streamed, so the user sees progress immediately instead of waiting for the whole answer.

#### 3. Next.js frontend: generative UI

Tool results render as typed React components, not as a wall of text. The numbers come back as metric tiles, the monthly breakdown as an actual bar chart, and the **Sources** section lists every file used, down to the sheet name or PDF page range, so the answer can be checked against the original data in one click.

![A Tavis answer card with metric tiles, a monthly bar chart, and sources listing files, sheets and PDF pages](/media/tavis-answer-card.png "Every answer cites the files, sheets and pages it came from.")

### Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **AI layer:** Vercel AI SDK (streaming, tool calling, generative UI)
- **Backend:** Python (file crawling, parsing, data aggregation, HTTP API)
- **Data source:** Triglav's shared drive (Excel, CSV, PDF and document files)

## Outcome

### More than a hackathon win

![Award ceremony at Huda Izkušnja, Triglav Lab](/media/triglav-hackathon-award.jpg "Huda Izkušnja award ceremony, October 2024. Photo: Triglav Lab")

Winning my first hackathon was an important milestone.

It also opened an unexpected opportunity: I received a personal invitation to collaborate with Triglav.

What started as a four-day challenge became an opportunity to work with an established company and explore real-world applications of AI.

The biggest lesson I took away was that **the value of AI isn't in how complex the technology is, but in how effectively it solves a real problem.**

---

_Event: [Huda Izkušnja — Triglav Lab](https://lab.triglav.si/dogodki/galerija/2024/huda-izkusnja) · [Original LinkedIn post](https://www.linkedin.com/posts/jan-arnez_first-hackathon-first-win-i-recently-ugcPost-7272981970744147969-MGnw/)_
