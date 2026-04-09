import React from "react";
import { Container } from "../ui/Container";
import  STATS  from "constants";

export const StatsSection: React.FC<{ stats?: typeof STATS }> = ({ stats = STATS }) => {
  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.id} className="bg-white/90 p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-brand-dark">{s.value}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
              {s.subLabel && <div className="text-xs text-gray-400 mt-1">{s.subLabel}</div>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
