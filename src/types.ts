export const SCHEMA_VERSION = 1;

/** FontAwesome 4.7 icons offered for contact lines. */
export const CONTACT_ICONS = {
  address: { label: "Address", char: "\uf041" },
  email: { label: "Email", char: "\uf003" },
  phone: { label: "Phone", char: "\uf095" },
  globe: { label: "Website", char: "\uf0ac" },
  briefcase: { label: "Portfolio", char: "\uf0b1" },
  linkedin: { label: "LinkedIn", char: "\uf0e1" },
  github: { label: "GitHub", char: "\uf09b" },
} as const;

export type ContactIcon = keyof typeof CONTACT_ICONS;

export interface ContactLine {
  icon: ContactIcon;
  text: string;
}

export interface WorkEntry {
  company: string;
  location: string;
  dates: string;
  title: string;
  /** Intro paragraphs shown before the bullet list. */
  paragraphs: string[];
  bullets: string[];
}

export interface QualificationEntry {
  institution: string;
  location: string;
  dates: string;
  title: string;
  paragraphs: string[];
}

export interface HeadingItem {
  heading: string;
  text: string;
}

export interface Achievement {
  title: string;
  year: string;
  text: string;
}

export interface CVData {
  version: number;
  name: string;
  contacts: ContactLine[];
  personalStatement: string;
  work: WorkEntry[];
  qualifications: QualificationEntry[];
  technicalSkills: string[];
  personalSkills: HeadingItem[];
  achievements: Achievement[];
  interests: string[];
  referees: string;
  /** Footer line printed at the bottom of each page, e.g. "Jane Doe | 021 123 4567 | jane@example.com" */
  footerText: string;
}

export function emptyCV(): CVData {
  return {
    version: SCHEMA_VERSION,
    name: "",
    contacts: [],
    personalStatement: "",
    work: [],
    qualifications: [],
    technicalSkills: [],
    personalSkills: [],
    achievements: [],
    interests: [],
    referees: "Referees available on request.",
    footerText: "",
  };
}
