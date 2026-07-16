import type { CVData } from "./types";
import { SCHEMA_VERSION } from "./types";

/** Generic sample CV so new users see how the sections work. */
export const sampleCV: CVData = {
  version: SCHEMA_VERSION,
  name: "JANE EXAMPLE",
  contacts: [
    { icon: "address", text: "12 Sample Street, Wellington, New Zealand" },
    { icon: "email", text: "jane.example@email.com" },
    { icon: "phone", text: "021 000 0000" },
    { icon: "globe", text: "http://www.linkedin.com/in/janeexample" },
    { icon: "briefcase", text: "janeexample.github.io" },
  ],
  personalStatement:
    "Motivated and detail-oriented engineer with several years of experience delivering software " +
    "products from concept to production. Strong communicator who enjoys working in " +
    "cross-functional teams and mentoring others.",
  work: [
    {
      company: "Acme Ltd.",
      location: "Wellington, New Zealand",
      dates: "Jan 2023 - Present",
      title: "Senior Software Engineer",
      paragraphs: [
        "Acme builds cloud tooling for the logistics industry, serving customers across APAC.",
      ],
      bullets: [
        "Designing and implementing backend services (Python, PostgreSQL).",
        "Leading code reviews and mentoring two junior engineers.",
        "Introduced CI/CD pipelines, reducing release time from days to hours.",
      ],
    },
    {
      company: "Widget Co.",
      location: "Auckland, New Zealand",
      dates: "Feb 2020 - Dec 2022",
      title: "Software Engineer",
      paragraphs: [
        "Widget Co. develops embedded devices for smart-home applications.",
      ],
      bullets: [
        "Developed firmware features in C++ for a family of sensor products.",
        "Built automated hardware-in-the-loop test rigs.",
      ],
    },
  ],
  qualifications: [
    {
      institution: "University of Auckland",
      location: "Auckland, New Zealand",
      dates: "2016 - 2019",
      title: "BE (Hons) Software Engineering",
      paragraphs: ["Final year project | Real-time analytics dashboard for campus energy use."],
    },
  ],
  technicalSkills: [
    "Software development | Python | C++ | TypeScript | SQL | Git",
    "Cloud infrastructure | AWS | Docker | CI/CD",
    "Testing | Unit & integration testing | Test automation",
    "Agile | Scrum | JIRA | Confluence",
  ],
  personalSkills: [
    {
      heading: "Communication | Team Player",
      text: "I communicate clearly with stakeholders and teammates and enjoy collaborative problem solving.",
    },
    {
      heading: "Initiative | Self-starter",
      text: "I work well independently, take ownership of problems and see them through to completion.",
    },
  ],
  achievements: [
    {
      title: "Reduced release time significantly",
      year: "2024",
      text: "By introducing automated CI/CD pipelines and test suites, releases went from a multi-day manual process to an automated one-hour pipeline.",
    },
  ],
  interests: [
    "Certified Cloud Practitioner | AWS | 2023",
    "Tramping, photography and woodworking",
  ],
  referees: "Referees available on request.",
  footerText: "Jane Example | 021 000 0000 | jane.example@email.com",
};
