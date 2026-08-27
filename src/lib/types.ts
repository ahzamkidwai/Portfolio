export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  tagline: string;
  phone: string;
  email: string;
  links: {
    linkedin: string;
    github: string;
    leetcode: string;
    gfg: string;
  };
  githubUsername: string;
  resumeUrl: string;
  availability: {
    show: boolean;
    label: string;
  };
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  remote: boolean;
  startDate: string;
  endDate: string; // "Present" allowed
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
  detail?: string;
}

export type ProjectCategory =
  | "AI Engineering"
  | "Blockchain / Web3"
  | "Full-Stack"
  | "Developer Tools";

export interface ProjectEntry {
  id: string;
  name: string;
  displayName: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  keyFeatures: string[];
  metrics?: string[];
  source: "resume" | "github";
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  detail?: string;
}

export interface AIStage {
  id: string;
  label: string;
  description: string;
}

export interface NavLink {
  href: string;
  label: string;
}
