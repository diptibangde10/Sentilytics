
import { ReactNode } from "react";
import Header from "@/components/Header";

interface MainLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MainLayout = ({ children, activeTab, setActiveTab }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* FitApp style footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sentiment Analysis Platform</h3>
              <p className="text-gray-300">
                Powerful tools to help businesses understand customer feedback and improve their products and services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-accent">Dashboard</a></li>
                <li><a href="#" className="text-gray-300 hover:text-accent">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-accent">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-accent">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300">
                Have questions? Reach out to our team.
              </p>
              <a href="#" className="block mt-3 fitapp-button inline-flex">
                Contact Support
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>© 2025 Sentiment Analysis Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
