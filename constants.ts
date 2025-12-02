import { CalculatorConfig } from './types';

// Helper to safely parse float
const safeParse = (val: number | undefined) => val || 0;

export const CALCULATORS: CalculatorConfig[] = [
  {
    id: 'mtbf',
    title: 'MTBF (Tempo Medio Tra Guasti)',
    description: 'Il Mean Time Between Failure indica l\'affidabilità degli asset misurando il tempo medio operativo tra due guasti consecutivi.',
    unit: 'ore',
    inputs: [
      { id: 'operatingTime', label: 'Tempo operativo totale', placeholder: 'Es. 1000', unit: 'ore' },
      { id: 'failures', label: 'Numero di guasti', placeholder: 'Es. 4' },
    ],
    calculate: (values) => {
      const time = safeParse(values.operatingTime);
      const count = safeParse(values.failures);
      if (count === 0) return null;
      return time / count;
    },
    interpret: (val) => "Maggiore è questo valore, maggiore è l'affidabilità del sistema.",
  },
  {
    id: 'mttr',
    title: 'MTTR (Tempo Medio di Riparazione)',
    description: 'Il Mean Time To Repair misura la manutenibilità, ovvero il tempo medio necessario per riparare un guasto e ripristinare l\'operatività.',
    unit: 'ore',
    inputs: [
      { id: 'downtime', label: 'Tempo totale di fermo', placeholder: 'Es. 20', unit: 'ore' },
      { id: 'incidents', label: 'Numero di interventi', placeholder: 'Es. 5' },
    ],
    calculate: (values) => {
      const time = safeParse(values.downtime);
      const count = safeParse(values.incidents);
      if (count === 0) return null;
      return time / count;
    },
    interpret: (val) => "Il tempo medio di ripristino è di " + val.toFixed(2) + " unità di tempo.",
  },
  {
    id: 'planned-maintenance',
    title: 'Percentuale Manutenzione Pianificata',
    description: 'Misura la proattività del team: rapporta le ore spese in manutenzione programmata rispetto al totale delle ore di manutenzione.',
    unit: '%',
    inputs: [
      { id: 'plannedHours', label: 'Ore manutenzione programmata', placeholder: 'Es. 40', unit: 'ore' },
      { id: 'totalHours', label: 'Ore totali di manutenzione', placeholder: 'Es. 60', unit: 'ore' },
    ],
    calculate: (values) => {
      const planned = safeParse(values.plannedHours);
      const total = safeParse(values.totalHours);
      if (total === 0) return null;
      return (planned / total) * 100;
    },
    interpret: (val) => val >= 80 ? "Ottimo livello di prevenzione." : "Troppa manutenzione reattiva (guasti imprevisti).",
  },
  {
    id: 'oee',
    title: 'OEE (Overall Equipment Effectiveness)',
    description: 'Lo standard globale per misurare la produttività manifatturiera. Combina Disponibilità, Prestazioni e Qualità in un unico indice.',
    unit: '%',
    inputs: [
      { id: 'availability', label: 'Disponibilità', placeholder: '0-100', unit: '%' },
      { id: 'performance', label: 'Efficienza Operativa', placeholder: '0-100', unit: '%' },
      { id: 'quality', label: 'Qualità', placeholder: '0-100', unit: '%' },
    ],
    calculate: (values) => {
      const a = safeParse(values.availability);
      const p = safeParse(values.performance);
      const q = safeParse(values.quality);
      // Formula assuming inputs are percentages (e.g., 90 for 90%)
      return (a / 100) * (p / 100) * (q / 100) * 100;
    },
    interpret: (val) => val >= 85 ? "OEE di classe mondiale." : val >= 60 ? "Valore tipico, margini di miglioramento." : "Bassa efficienza complessiva.",
  },
  {
    id: 'schedule-compliance',
    title: 'Aderenza alla Pianificazione (Schedule Compliance)',
    description: 'Verifica se la manutenzione viene eseguita quando previsto. È cruciale per l\'efficienza operativa.',
    unit: '%',
    inputs: [
      { id: 'completed', label: 'Ordini di lavoro completati in tempo', placeholder: 'Es. 45' },
      { id: 'planned', label: 'Ordini di lavoro pianificati totali', placeholder: 'Es. 50' },
    ],
    calculate: (values) => {
      const completed = safeParse(values.completed);
      const planned = safeParse(values.planned);
      if (planned === 0) return null;
      return (completed / planned) * 100;
    },
    interpret: (val) => val >= 90 ? "Ottima aderenza alla pianificazione." : val >= 70 ? "Aderenza accettabile, ma migliorabile." : "Necessario rivedere i processi di pianificazione.",
  },
  {
    id: 'equipment-downtime',
    title: 'Tempo di Fermo (Equipment Downtime)',
    description: 'La percentuale di tempo in cui l\'asset non è produttivo rispetto al tempo totale osservato.',
    unit: '%',
    inputs: [
      { id: 'downtime', label: 'Ore di downtime', placeholder: 'Es. 10', unit: 'ore' },
      { id: 'totalTime', label: 'Periodo totale osservato', placeholder: 'Es. 160', unit: 'ore' },
    ],
    calculate: (values) => {
      const downtime = safeParse(values.downtime);
      const total = safeParse(values.totalTime);
      if (total === 0) return null;
      return (downtime / total) * 100;
    },
    interpret: (val) => val <= 5 ? "Downtime minimo, ottima continuità." : val <= 15 ? "Downtime nella media." : "Downtime critico, investigare le cause.",
  },
  {
    id: 'equipment-availability',
    title: 'Disponibilità Asset (Availability)',
    description: 'La probabilità che una macchina sia operativa e pronta all\'uso quando richiesto.',
    unit: '%',
    inputs: [
      { id: 'availableTime', label: 'Tempo disponibile', placeholder: 'Es. 100', unit: 'ore' },
      { id: 'plannedDowntime', label: 'Downtime pianificato', placeholder: 'Es. 5', unit: 'ore' },
    ],
    calculate: (values) => {
      const available = safeParse(values.availableTime);
      const plannedDown = safeParse(values.plannedDowntime);
      if (available === 0) return null;
      return ((available - plannedDown) / available) * 100;
    },
    interpret: (val) => val >= 90 ? "Disponibilità eccellente." : "Disponibilità migliorabile tramite manutenzione predittiva.",
  },
  {
    id: 'performance-efficiency',
    title: 'Efficienza Prestazionale',
    description: 'Confronta la velocità reale di produzione con quella ideale progettuale.',
    unit: '%',
    inputs: [
      { id: 'unitsProduced', label: 'Numero unità prodotte', placeholder: 'Es. 1000' },
      { id: 'idealCycleTime', label: 'Tempo ciclo ideale per unità', placeholder: 'Es. 0.5', unit: 'minuti' },
      { id: 'operatingTime', label: 'Tempo operativo effettivo', placeholder: 'Es. 600', unit: 'minuti' },
    ],
    calculate: (values) => {
      const units = safeParse(values.unitsProduced);
      const cycleTime = safeParse(values.idealCycleTime);
      const opTime = safeParse(values.operatingTime);
      if (opTime === 0) return null;
      return ((units * cycleTime) / opTime) * 100;
    },
    interpret: (val) => val >= 95 ? "Efficienza produttiva ottimale." : "Possibili rallentamenti o micro-fermate rilevati.",
  },
  {
    id: 'quality-rate',
    title: 'Tasso di Qualità',
    description: 'Percentuale di output conforme agli standard di qualità (Good Parts / Total Parts).',
    unit: '%',
    inputs: [
      { id: 'acceptableUnits', label: 'Numero unità di qualità accettabile', placeholder: 'Es. 950' },
      { id: 'totalUnits', label: 'Numero unità prodotte', placeholder: 'Es. 1000' },
    ],
    calculate: (values) => {
      const acceptable = safeParse(values.acceptableUnits);
      const total = safeParse(values.totalUnits);
      if (total === 0) return null;
      return (acceptable / total) * 100;
    },
    interpret: (val) => val >= 98 ? "Qualità eccellente." : "Tasso di scarto elevato, controllare i processi.",
  },
];