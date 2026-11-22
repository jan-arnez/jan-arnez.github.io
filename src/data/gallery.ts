export interface GalleryItem {
  readonly title: string;
  readonly label: string;
  readonly text: string;
  /** Image or video (.mp4 autoplays muted) under /public. */
  readonly src: string;
  readonly alt: string;
  /** Tailwind aspect class for the tile; media is cropped to fit. */
  readonly aspect: string;
  readonly href: string;
  /** Masonry column (1 or 2) on wide screens. */
  readonly column: 1 | 2;
}

const post = (activity: string) =>
  `https://www.linkedin.com/feed/update/urn:li:activity:${activity}/`;

export const gallery: readonly GalleryItem[] = [
  {
    title: "DragonHack 2026",
    label: "Hackathon · 2026",
    text: "Two challenge wins in 24 hours: Highest Growth Potential from zerodays and Best Creative Use of AI from DevRev.",
    src: "/media/gallery/dragonhack.jpg",
    alt: "The winning teams lined up on stage at DragonHack 2026",
    aspect: "aspect-[3/2]",
    href: post("7452757793960345600"),
    column: 1,
  },
  {
    title: "Business Hive",
    label: "Competition · 2025",
    text: "A case-solving weekend with Knauf Insulation. A great idea is only as strong as how well you communicate it.",
    src: "/media/gallery/business-hive.mp4",
    alt: "Walking through the Business Hive competition venue",
    aspect: "aspect-square",
    href: post("7307404798784335896"),
    column: 2,
  },
  {
    title: "Startup Weekend 2026",
    label: "Competition · 2026",
    text: "Our team won Startup Weekend at the Faculty of Economics, University of Ljubljana.",
    src: "/media/gallery/startup-weekend.jpg",
    alt: "The winning team with the jury at Startup Weekend 2026",
    aspect: "aspect-[4/3]",
    href: post("7449795075683045377"),
    column: 1,
  },
  {
    title: "SaaStanak",
    label: "Event · 2025",
    text: "Talks and honest discussions about building SaaS, ahead of the SaaStanak main event.",
    src: "/media/gallery/saastanak.jpg",
    alt: "A speaker presenting to the audience at a SaaStanak event",
    aspect: "aspect-[3/2]",
    href: post("7378773329614381056"),
    column: 2,
  },
  {
    title: "Huda Izkušnja",
    label: "Hackathon · 2024",
    text: "First hackathon, first win: a 4-day Triglav Lab challenge on AI for insurance processes.",
    src: "/media/gallery/triglav.jpg",
    alt: "The winning team holding the prize cheque at Huda Izkušnja",
    aspect: "aspect-[3/2]",
    href: "/projects/triglav-hackathon/",
    column: 1,
  },
  {
    title: "LUI × Transformation Lighthouse",
    label: "Hackathon · 2025",
    text: "No win this time, but a weekend of building with great people and plenty learned.",
    src: "/media/gallery/lui-hackathon.jpg",
    alt: "Participants and mentors at the LUI and Transformation Lighthouse hackathon",
    aspect: "aspect-video",
    href: post("7300546548357099523"),
    column: 2,
  },
];
