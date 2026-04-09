import React from "react";
import { Container } from "../ui/Container";
import  TEAM  from "constants";
import TeamCard from "../TeamCard";

export const LeadershipSection: React.FC<{ team?: typeof TEAM }> = ({ team = TEAM }) => {
  return (
    <section id="team" className="py-16 bg-brand-cream">
      <Container>
        <h2 className="text-3xl font-serif mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((m) => (
            <TeamCard key={m.id} member={m} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LeadershipSection;
