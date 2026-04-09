import React from "react";
import { Container } from "../ui/Container";
import  PROJECTS  from "constants";
import { Button } from "../ui/Button";

export const HeroSection: React.FC = () => {
  const heroImage = PROJECTS?.[0]?.imageUrl ?? "";

  return (
    <section id="home-hero" className="relative pt-24 pb-20">
      <div className="absolute inset-0 -z-10">
        {heroImage ? (
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover opacity-40" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-brand-concrete to-brand-cream" />
        )}
      </div>

      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight text-brand-dark">
            Thoughtful interiors. Craft-led execution.
          </h1>
          <p className="mt-6 text-gray-700 text-lg">
            We design spaces that balance material honesty with timeless form — from concept to handover.
          </p>

          <div className="mt-8 flex gap-4">
            <Button as="a" href="#projects" className="bg-brand-brass text-white">
              View Projects
            </Button>
            <Button as="a" href="#contact" variant="ghost">
              Get in touch
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
