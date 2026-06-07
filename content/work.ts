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
    start: "January 2025",
  },
  {
    role: "Account Executive",
    organization: "Gartner",
    start: "August 2023",
    end: "December 2024",
  },
  {
    role: "Account Manager",
    organization: "Gartner",
    start: "September 2022",
    end: "July 2023",
  },
  {
    role: "Summer Sales Intern",
    organization: "Gartner",
    start: "May 2022",
    end: "August 2022",
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
