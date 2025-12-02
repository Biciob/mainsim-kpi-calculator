import React from 'react';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  unit?: string;
}

export const CalculatorInput: React.FC<Props> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder,
  unit 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="number"
          name={id}
          id={id}
          className="block w-full rounded-md border-gray-300 pl-4 pr-12 py-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white border outline-none transition-colors"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            // Prevent non-numeric keys except decimal point and control keys
            if (
              !/[0-9]/.test(e.key) && 
              !['Backspace', 'Delete', 'Tab', 'Enter', '.', 'ArrowLeft', 'ArrowRight'].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
        />
        {unit && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};
