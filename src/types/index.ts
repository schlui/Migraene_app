/**
 * Core TypeScript type definitions for Migraine Tracking App
 * Defines all data models and interfaces used throughout the application
 */

// ============= MIGRAINE ENTRY =============
export interface MigraineEntry {
  id: string;
  date: string; // YYYY-MM-DD format
  painIntensity: number; // 1-10 scale
  duration?: number; // minutes (optional)
  symptoms: string[]; // multi-select: e.g., ["nausea", "light-sensitivity"]
  notes?: string;
  triggers: string[]; // trigger IDs
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

// ============= MEDICATION =============
export interface Medication {
  id: string;
  name: string;
  dosage?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface MedicationIntake {
  id: string;
  medicationId: string;
  date: string; // YYYY-MM-DD format
  dose: string;
  effectiveness?: number; // 1-5 scale (optional)
  linkedMigraineId?: string; // optional link to a migraine entry
  createdAt: number;
  updatedAt: number;
}

// ============= TRIGGERS =============
export interface Trigger {
  id: string;
  name: string;
  category: "stress" | "sleep" | "weather" | "food" | "activity" | "hormonal" | "custom";
  customLabel?: string; // for custom triggers
  createdAt: number;
}

// ============= WEATHER DATA =============
export interface WeatherData {
  id: string;
  date: string; // YYYY-MM-DD format
  temperature: number; // Celsius
  humidity?: number; // percentage
  airPressure?: number; // hPa
  condition?: string; // e.g., "Sunny", "Rainy", "Cloudy"
  fetched: boolean;
  fetchedAt?: number;
}

// ============= STEP COUNT =============
export interface StepData {
  id: string;
  date: string; // YYYY-MM-DD format
  steps: number;
  synced: boolean;
  syncedAt?: number;
}

// ============= MOOD =============
export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD format
  mood: number; // 1-5 scale
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

// ============= FOOD PHOTO & INGREDIENTS =============
export interface FoodEntry {
  id: string;
  date: string; // YYYY-MM-DD format
  photoUri?: string; // local or cloud URI
  ingredients: Ingredient[];
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Ingredient {
  id: string;
  name: string;
  confidence?: number; // AI confidence level (0-1)
  userAdded?: boolean; // true if manually added/edited by user
}

// ============= INSIGHTS / ANALYTICS =============
export interface InsightData {
  migraineFrequency: {
    monthly: { [month: string]: number }; // e.g., "2025-02": 5
  };
  commonTriggers: {
    triggerId: string;
    triggerName: string;
    count: number;
    percentage: number;
  }[];
  correlations: {
    highAirPressureMigraines: number; // percentage
    lowStepCountMigraines: number; // percentage
    moodOnMigraineDays: number; // average mood 1-5
    moodOnNormalDays: number; // average mood 1-5
    frequentIngredients: { ingredient: string; count: number }[];
  };
}

// ============= EXPORT DATA =============
export interface ExportData {
  version: string;
  exportDate: string;
  migraineEntries: MigraineEntry[];
  medications: Medication[];
  medicationIntakes: MedicationIntake[];
  triggers: Trigger[];
  weatherData: WeatherData[];
  stepData: StepData[];
  moodEntries: MoodEntry[];
  foodEntries: FoodEntry[];
}