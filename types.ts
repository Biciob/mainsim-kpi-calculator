export interface CalculatorInput {
  id: string;
  label: string;
  placeholder?: string;
  unit?: string;
}

export interface CalculationResult {
  value: number;
  formattedValue: string;
  unit: string;
  message: string;
}

export interface CalculatorConfig {
  id: string;
  title: string;
  description: string;
  inputs: CalculatorInput[];
  // Returns the calculated result or null if inputs are invalid
  calculate: (values: Record<string, number>) => number | null;
  unit: string;
  // Generates a context message based on the result
  interpret: (value: number) => string;
}

export interface CalculatorState {
  inputs: Record<string, string>; // Keep as strings to handle empty states better
  result: CalculationResult | null;
}