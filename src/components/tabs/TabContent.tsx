
import React from "react";
import HeroSection from "../dashboard/HeroSection";

interface TabContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ title, description, children }) => {
  return (
    <div>
      <HeroSection 
        title={title}
        description={description}
      />
      
      <div className="slide-up" style={{ animationDuration: '0.6s' }}>
        {children}
      </div>
    </div>
  );
};

export default TabContent;
