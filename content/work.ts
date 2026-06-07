import type { WorkEntry, EducationEntry } from "@/lib/types";

/**
 * Professional roles, newest first. Shape:
 *   { role, organization, location?, start, end?, summary?, highlights?, url? }
 * Omit `end` (or use "Present") for your current role.
 */
export const work: WorkEntry[] = [
  {
    role: "Senior Account Executive",
    organization: "Gartner",
    location: "Remote",
    start: "January 2025",
    logo: "/images/work/gartner.png",
    highlights: [
      "Manage a book of business exceeding $1,000,000 in annual contract value",
      "Advise C-suite leaders across finance, IT, supply chain, and AI (CFO, CTO, CSCO)",
    ],
  },
  {
    role: "Account Executive",
    organization: "Gartner",
    location: "Irving, Texas",
    start: "August 2023",
    end: "December 2024",
    logo: "/images/work/gartner.png",
    highlights: [
      "Earned Winner's Circle, Gartner's top sales-performance distinction",
      "Drove $230,000 in book-of-business growth and $145,000 in net contract value increase (NCVI)",
      "Sustained 92% client retention across the book of business",
    ],
  },
  {
    role: "Account Manager",
    organization: "Gartner",
    location: "Irving, Texas",
    start: "September 2022",
    end: "July 2023",
    logo: "/images/work/gartner.png",
    highlights: [
      "First of 40+ reps in the region to earn full-year Winner's Circle, reaching it by May of my first full year in the role",
      "Maintained 100% client retention across the book of business",
      "Generated $80,000 in NCVI",
    ],
  },
  {
    role: "Summer Sales Intern",
    organization: "Gartner",
    location: "Remote",
    start: "May 2022",
    end: "August 2022",
    logo: "/images/work/gartner.png",
    highlights: [
      "Ranked first of 30+ interns on the company's achievement-based leaderboard",
      "Supported account research and preparation for client calls",
      "Gained hands-on exposure to the demands of a full-time sales role",
    ],
  },
];

/**
 * Education, newest first. Shape:
 *   { credential, institution, field?, location?, start, end?, highlights?, logo? }
 */
export const education: EducationEntry[] = [
  {
    credential: "B.B.A. Marketing",
    institution: "Texas State University",
    field: "Concentration in Professional Sales",
    location: "San Marcos, Texas",
    start: "2018",
    end: "2022",
    logo: "/images/education/texas-state.png",
    highlights: [
      "Honors College",
      "Dean's List",
      "President, Phi Kappa Psi fraternity",
      "Member, .EXE Computer Science Club",
    ],
  },
  {
    credential: "High School Diploma",
    institution: "Hardin-Jefferson High School",
    location: "Sour Lake, Texas",
    start: "2014",
    end: "2018",
    logo: "/images/education/hardin-jefferson.png",
    highlights: [
      "National Honor Society",
      "Quarterback, varsity football",
      "District champion, varsity tennis",
      "One-act play team",
    ],
  },
];
