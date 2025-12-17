import React, { useState, useEffect } from 'react';
import { CalculatorConfig, CalculationResult } from '../types';
import { CalculatorInput } from './CalculatorInput';
import { RotateCcw, Calculator as CalcIcon, Info } from 'lucide-react';

interface Props {
  config: CalculatorConfig;
}

export const ActiveCalculator: React.FC<Props> = ({ config }) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset state when calculator type changes
  useEffect(() => {
    setInputs({});
    setResult(null);
    setError(null);
  }, [config.id]);

  const handleInputChange = (id: string, value: string) => {
    setInputs(prev => ({ ...prev, [id]: value }));
    // Clear error on change
    if (error) setError(null);
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setError(null);
  };

  const handleCalculate = () => {
    // Validate all inputs are present
    const missingInputs = config.inputs.some(input => !inputs[input.id] || inputs[input.id].trim() === '');
    
    if (missingInputs) {
      setError("Per favore compila tutti i campi richiesti.");
      return;
    }

    // Convert to numbers
    const numericValues: Record<string, number> = {};
    Object.keys(inputs).forEach(key => {
      numericValues[key] = parseFloat(inputs[key]);
    });

    const rawResult = config.calculate(numericValues);

    if (rawResult === null || isNaN(rawResult) || !isFinite(rawResult)) {
      setError("Errore nel calcolo. Verifica che i valori inseriti siano corretti (es. divisione per zero).");
      setResult(null);
      return;
    }

    // Smart formatting: if number is very small (like failure rate), show more decimals
    const formatted = Number.isInteger(rawResult) 
      ? rawResult.toString() 
      : (Math.abs(rawResult) < 0.1 ? rawResult.toFixed(5) : rawResult.toFixed(2));

    setResult({
      value: rawResult,
      formattedValue: formatted,
      unit: config.unit,
      message: config.interpret(rawResult)
    });
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-fade-in relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6958dd] to-[#404142]"></div>
      
      {/* Header */}
      <div className="bg-white p-6 md:p-10 border-b border-gray-100">
        <h2 className="text-3xl font-bold text-[#404142] mb-4">
          {config.title}
        </h2>
        <p className="text-gray-500 leading-relaxed text-lg">
          {config.description}
        </p>
      </div>

      <div className="p-6 md:p-10 bg-[#fcfcfc]">
        {/* Inputs */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 lg:gap-10 mb-10">
          {config.inputs.map((input) => (
            <CalculatorInput
              key={input.id}
              id={input.id}
              label={input.label}
              placeholder={input.placeholder}
              unit={input.unit}
              value={inputs[input.id] || ''}
              onChange={(val) => handleInputChange(input.id, val)}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 text-sm border border-red-100 shadow-sm">
            <Info className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button
            onClick={handleCalculate}
            className="flex-1 inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl shadow-lg text-white bg-[#6958dd] hover:bg-[#5849c2] focus:outline-none focus:ring-4 focus:ring-[#6958dd]/30 transition-all transform hover:-translate-y-1"
          >
            <CalcIcon className="w-6 h-6 mr-2.5" />
            Calcola
          </button>
          <button
            onClick={handleReset}
            className="inline-flex justify-center items-center px-8 py-4 border-2 border-gray-100 text-lg font-semibold rounded-2xl text-gray-500 bg-white hover:bg-gray-50 hover:text-[#6958dd] hover:border-[#6958dd]/30 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div className="relative overflow-hidden bg-[#404142] rounded-3xl p-8 md:p-10 text-white shadow-2xl animate-slide-up ring-4 ring-gray-50">
            {/* Abstract Shapes for Texture */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#6958dd] opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-[#ffffff] opacity-5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#6958dd] bg-white/10 inline-block px-3 py-1 rounded-full mb-4 backdrop-blur-sm border border-white/5">
                Risultato Calcolato
              </h3>
              
              <div className="flex flex-wrap items-baseline gap-3 mb-6">
                <span className="text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-sm">
                  {result.formattedValue}
                </span>
                <span className="text-3xl md:text-4xl font-light text-gray-300">
                  {result.unit}
                </span>
              </div>
              
              <div className="flex items-start gap-4 p-5 bg-[#f7f7f7]/10 backdrop-blur-md rounded-2xl border border-white/10">
                <Info className="w-6 h-6 text-[#6958dd] mt-0.5 flex-shrink-0" />
                <p className="text-gray-100 font-medium text-lg leading-relaxed">
                  {result.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};