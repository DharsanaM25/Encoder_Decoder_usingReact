import React from 'react';
import { Code } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code size={32} className="text-white" />
            <h1 className="text-2xl font-bold tracking-tight">Morph</h1>
          </div>
          <div className="text-sm md:text-base opacity-90">
            Transform your text with ease
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;