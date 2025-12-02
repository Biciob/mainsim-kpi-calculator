import React from 'react';
import { Calculator } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-[#6958dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-[#6958dd] p-2.5 rounded-xl shadow-lg transform transition-transform hover:scale-105">
             <Calculator className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-[#404142] leading-none">
              mainsim
            </span>
            <span className="text-xs font-medium text-[#6958dd] uppercase tracking-widest mt-0.5">
              KPI Calculator
            </span>
          </div>
        </div>
        
        <a 
          href="https://www.mainsim.com/richiesta-demo/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center justify-center px-8 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-[#404142] rounded-full hover:bg-[#6958dd] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6958dd] transform hover:-translate-y-0.5"
        >
          Richiedi una demo
        </a>
      </div>
    </header>
  );
};