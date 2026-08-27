import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import EngineeringVisualization from "@/components/sections/EngineeringVisualization";
import Skills from "@/components/sections/Skills";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import GitHubActivity from "@/components/sections/GitHubActivity";
import CodingProfiles from "@/components/sections/CodingProfiles";
import Education from "@/components/sections/Education";
import Achievements from "@/components/sections/Achievements";
import ResumeSection from "@/components/sections/ResumeSection";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ExperienceTimeline />
      {/* <EngineeringVisualization /> */}
      <Skills />
      <ProjectsGrid />
      {/* <GitHubActivity /> */}
      {/* <CodingProfiles /> */}
      <Education />
      {/* <Achievements /> */}
      {/* <ResumeSection /> */}
      <Contact />
    </>
  );
}
