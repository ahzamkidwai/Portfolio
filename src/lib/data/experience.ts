import { ExperienceEntry } from "@/lib/types";

/**
 * Extracted directly from the resume. Do not add dates, employers,
 * technologies, or achievements that are not present in the source resume.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "pulastya-ai",
    company: "Pulastya AI",
    role: "Software Developer",
    location: "Remote",
    remote: true,
    startDate: "March 2026",
    endDate: "Present",
    summary:
      "Building and shipping mobile applications and backend systems, including work on Government of Telangana healthcare data platforms.",
    highlights: [
      "Built and shipped the Orchid-Research mobile application using React Native (Expo) and JavaScript, integrating third-party APIs, implementing deep linking, and publishing the app on the Google Play Store.",
      "Reduced app load times and improved UI responsiveness through lazy loading, efficient state management, and Expo build optimization techniques.",
      "Delivered enhancements for Government of Telangana platforms, including the Suryapet District Health Care Management System and Wanaparthy District system, streamlining data workflows and maintaining data integrity across modules.",
      "Partnered with cross-functional engineering teams to design and maintain backend APIs supporting real-time updates, following software engineering best practices across the development lifecycle.",
    ],
    technologies: ["React Native", "Expo", "JavaScript", "REST APIs", "PostgreSQL"],
  },
  {
    id: "sse-smallstepseveryday",
    company: "SSE – SmallStepsEveryDay",
    role: "Full Stack Developer",
    location: "Remote",
    remote: true,
    startDate: "January 2025",
    endDate: "June 2025",
    summary:
      "Built backend services and a Next.js frontend for an real estate platform, tuning full-stack performance along the way.",
    highlights: [
      "Built backend services using Spring Boot to power core business logic, developing REST endpoints for user authentication, product management, and order processing.",
      "Designed a relational database schema in MySQL, implementing stored procedures and complex joins to support data integrity and transaction processing for an e-commerce platform.",
      "Built and maintained the frontend using Next.js and TypeScript, applying component-based architecture to improve code reuse and user experience.",
      "Boosted page speed by 30% through backend caching strategies combined with frontend techniques including lazy loading, code-splitting, and Server-Side Rendering (SSR).",
    ],
    technologies: ["Spring Boot", "PostgreSQL", "Next.js", "TypeScript", "REST APIs", "SSR"],
  },
  {
    id: "afucent-tech",
    company: "Afucent Technologies",
    role: "Programmer Analyst Intern",
    location: "Lucknow, India",
    remote: false,
    startDate: "July 2024",
    endDate: "December 2024",
    summary:
      "Developed, optimized, and deployed production-grade mobile applications using React Native, taking features from development to production deployment on the Google Play Store.",
    highlights: [
      "Developed and shipped the BeDelighted mobile application using React Native (CLI) and JavaScript, building scalable UI components, optimized navigation flows, and smooth user interactions across multiple application modules.",
      "Improved application efficiency and user experience by optimizing component rendering, state management, API handling, lazy loading, and asset delivery, resulting in ~30% faster screen load times and noticeably smoother navigation.",
      "Integrated Google Maps services, Firebase, Cloudinary, REST APIs, and deep linking to build feature-rich mobile workflows, implementing reliable data handling, real-time updates, navigation, and third-party service integrations.",
      "Managed the complete mobile development lifecycle from feature development and debugging to build generation and production deployment, successfully releasing 2 application versions on the Google Play Store while maintaining stability and performance.",
    ],
    technologies: ["React Native", "CLI", "JavaScript", "Google Maps", "Google Firebase", "Cloudinary", "Deep Linking", "REST APIs", "Google Play Console"],
  },

];
