export interface Experience {
  readonly year: string;
  readonly company: string;
  readonly role: string;
}

export const experience: readonly Experience[] = [
  { year: "2026", company: "Celtra", role: "Frontend Validation" },
  { year: "2025", company: "ADC Systems", role: "Design Engineer" },
  { year: "2024", company: "Triglav", role: "AI Product Engineer" },
  { year: "2022", company: "Creatim", role: "Frontend Developer Intern" },
];
