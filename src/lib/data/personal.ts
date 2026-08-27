import { NavLink, PersonalInfo } from "@/lib/types";

/**
 * Central personal information. Update these values to customize the site —
 * no component logic needs to change.
 */
export const personal: PersonalInfo = {
  name: "Ahzam Naseem Kidwai",
  title: "Software Development Engineer | AI Engineer",
  location: "Lucknow, Uttar Pradesh, India",
  tagline:
    "I build scalable software applications, AI-powered systems, intelligent agents, and RAG applications — from full-stack products to the pipelines that make them think.",
  phone: "+91-945-041-1390",
  email: "ahzamnaseem.kidwai@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/ahzam-naseem-kidwai-54b998242/",
    github: "https://github.com/ahzamkidwai",
    leetcode: "https://leetcode.com/u/ahzamkidwai/",
    gfg: "https://www.geeksforgeeks.org/user/ahzamnaseemkidwai/",
  },
  githubUsername: "ahzamkidwai",
  resumeUrl: "/resume.pdf",
  availability: {
    show: true,
    label: "Open to Software Engineering / AI Engineering opportunities",
  },
};

export const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export const siteConfig = {
  name: "Ahzam Naseem Kidwai — Portfolio",
  description:
    "Software Development Engineer & AI Engineer specializing in full-stack applications, AI agents, RAG systems, and blockchain/Web3 development.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com",
  ogImage: "/og-image.png",
};
