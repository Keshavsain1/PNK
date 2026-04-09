import React from "react";
import { Container } from "../ui/Container";
import  SERVICES  from "constants";
import { PenTool, Hammer, RefreshCw, Monitor } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  PenTool: <PenTool className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  RefreshCw: <RefreshCw className="w-6 h-6" />,
  Monitor: <Monitor className="w-6 h-6" />,
};

export const ServicesSection: React.FC<{ services?: typeof SERVICES }> = ({ services = SERVICES }) => {
  return (
    <section id="services" className="py-16 bg-brand-concrete">
      <Container>
        <h2 className="text-3xl font-serif mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-brand-brass text-white">
                {ICON_MAP[s.iconName] ?? <PenTool className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{s.description}</p>
                <ul className="mt-3 text-sm text-gray-500 list-disc list-inside">
                  {s.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;
