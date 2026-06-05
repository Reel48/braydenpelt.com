import type { WorkEntry, EducationEntry } from "@/lib/types";

/**
 * Professional roles, newest first. Shape:
 *   { role, organization, location?, start, end?, summary?, highlights?, url? }
 * Omit `end` (or use "Present") for your current role.
 */
export const work: WorkEntry[] = [];

/**
 * Education, newest first. Shape:
 *   { credential, institution, field?, location?, start, end?, notes? }
 */
export const education: EducationEntry[] = [];
