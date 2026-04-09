import React from "react";
import { Container } from "../ui/Container";
import  PROJECTS  from "constants";
import ProjectCard from "../ProjectCard";

export const FeaturedProjects: React.FC<{ projects?: typeof PROJECTS }> = ({ projects = PROJECTS }) => {
  return (
    <section id="projects" className="py-16">
      <Container>
        <h2 className="text-3xl font-serif mb-6">Selected Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjects;
