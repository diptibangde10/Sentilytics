
import React from "react";

interface HeroSectionProps {
  title: string;
  description?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  return (
    <div className="fitapp-hero py-12 px-4 rounded-xl mb-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
