import React, { useState } from 'react';
import { Header } from './components/Header';
import { ActiveCalculator } from './components/ActiveCalculator';
import { CALCULATORS } from './constants';
import { ChevronRight, LayoutDashboard, ArrowRight, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(CALCULATORS[0].id);

  const activeConfig = CALCULATORS.find(c => c.id === selectedId) || CALCULATORS[0];

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col font-sans selection:bg-[#6958dd] selection:text-white">
      <Header />

      <div className="bg-gradient-to-b from-white to-[#f7f7f7] pb-8 pt-12 md:pt-16 border-b border-gray-100/50">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
           <h1 className="text-4xl md:text-6xl font-extrabold text-[#404142] mb-6 tracking-tight leading-tight">
            Strumenti per la <br className="hidden md:block" />
            <span className="text-[#6958dd]">Manutenzione Intelligente</span>
           </h1>
           <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
             Seleziona un KPI dal menu per calcolare e analizzare le performance dei tuoi asset in pochi secondi.
           </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] gap-8 items-start">
          
          {/* Sidebar Area */}
          <aside className="space-y-6">
            
            {/* Mobile Dropdown */}
            <div className="md:hidden">
              <label htmlFor="calculator-select" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Seleziona KPI
              </label>
              <div className="relative">
                <select
                  id="calculator-select"
                  className="block w-full pl-4 pr-10 py-4 text-base border-gray-200 focus:outline-none focus:ring-[#6958dd] focus:border-[#6958dd] rounded-xl shadow-sm bg-white border appearance-none text-[#404142] font-medium"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  {CALCULATORS.map((calc) => (
                    <option key={calc.id} value={calc.id}>
                      {calc.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6958dd]">
                  <ChevronRight className="h-5 w-5 rotate-90" />
                </div>
              </div>
            </div>

            {/* Desktop Sidebar List */}
            <div className="hidden md:flex flex-col gap-6 sticky top-28">
              
              <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden ring-1 ring-black/5">
                <div className="p-6 bg-[#fcfcfc] border-b border-gray-100 flex items-center gap-3">
                  <div className="p-2 bg-[#f0effd] rounded-lg">
                    <LayoutDashboard className="w-5 h-5 text-[#6958dd]" />
                  </div>
                  <span className="font-bold text-[#404142] uppercase tracking-wider text-sm">Lista KPI</span>
                </div>
                <nav className="flex flex-col py-2 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
                  {CALCULATORS.map((calc) => (
                    <button
                      key={calc.id}
                      onClick={() => setSelectedId(calc.id)}
                      className={`
                        w-full text-left px-6 py-4 transition-all duration-200 border-l-[6px] flex justify-between items-center group relative overflow-hidden
                        ${selectedId === calc.id 
                          ? 'border-[#6958dd] bg-[#fcfcfc]' 
                          : 'border-transparent hover:bg-gray-50'}
                      `}
                    >
                      <span className={`text-[15px] leading-snug z-10 transition-colors ${selectedId === calc.id ? 'font-bold text-[#6958dd]' : 'font-medium text-gray-600 group-hover:text-[#404142]'}`}>
                        {calc.title}
                      </span>
                      {selectedId === calc.id && (
                        <ChevronRight className="w-4 h-4 text-[#6958dd] flex-shrink-0 ml-2 animate-pulse" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

            </div>
          </aside>

          {/* Main Content Area */}
          <div className="space-y-12">
            
            {/* Calculator Component */}
            <section>
               <ActiveCalculator config={activeConfig} />
            </section>

            {/* NEW Full Width CTA Section */}
            <section className="bg-[#404142] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl group">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6958dd] rounded-full blur-[100px] opacity-20 -mr-16 -mt-16 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-5 -ml-16 -mb-16"></div>

              <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6958dd]/20 border border-[#6958dd]/30 text-[#a59bf0] text-sm font-semibold mb-6">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Leader in Italia</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                  Ottieni di più con il software manutenzione <br/> <span className="text-[#6958dd]">N°1 in Italia</span>.
                </h2>
                
                <p className="text-gray-300 mb-10 text-lg leading-relaxed max-w-2xl">
                  Vuoi scoprire di più sulle tariffe, sull’implementazione o altri aspetti del CMMS mainsim? 
                  Mettiti in contatto con i nostri esperti. Valuteremo le tue sfide, ti mostreremo in che modo 
                  il CMMS mainsim può aiutarti a vincerle e ti guideremo nel cambiamento.
                  <br/><span className="text-white font-medium block mt-2">Richiedi una consulenza gratuita.</span>
                </p>
                
                <a 
                  href="https://www.mainsim.com/richiesta-demo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all duration-300 bg-[#6958dd] rounded-full hover:bg-[#7b6ce0] hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#6958dd]/30 group-hover:ring-[#6958dd]/50"
                >
                  Parla con un esperto
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;