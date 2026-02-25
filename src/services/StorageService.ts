/**
 * AsyncStorage Service
 * Handles all local data persistence using React Native AsyncStorage
 * Provides a unified API for CRUD operations on all data types
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MigraineEntry,
  Medication,
  MedicationIntake,
  Trigger,
  WeatherData,
  StepData,
  MoodEntry,
  FoodEntry,
  ExportData,
} from '../types';

// Storage Keys
const STORAGE_KEYS = {
  MIGRAINE_ENTRIES: '@migraine_entries',
  MEDICATIONS: '@medications',
  MEDICATION_INTAKES: '@medication_intakes',
  TRIGGERS: '@triggers',
  WEATHER_DATA: '@weather_data',
  STEP_DATA: '@step_data',
  MOOD_ENTRIES: '@mood_entries',
  FOOD_ENTRIES: '@food_entries',
};

class StorageService {
  /**
   * Generate a unique ID for records
   */
  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // ============= MIGRAINE ENTRIES =============

  async getMigraineEntries(): Promise<MigraineEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MIGRAINE_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching migraine entries:', error);
      return [];
    }
  }

  async getMigraineEntry(id: string): Promise<MigraineEntry | null> {
    const entries = await this.getMigraineEntries();
    return entries.find((e) => e.id === id) || null;
  }

  async addMigraineEntry(entry: Omit<MigraineEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<MigraineEntry> {
    const newEntry: MigraineEntry = {
      ...entry,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const entries = await this.getMigraineEntries();
    entries.push(newEntry);
    await AsyncStorage.setItem(STORAGE_KEYS.MIGRAINE_ENTRIES, JSON.stringify(entries));
    return newEntry;
  }

  async updateMigraineEntry(id: string, updates: Partial<MigraineEntry>): Promise<MigraineEntry | null> {
    const entries = await this.getMigraineEntries();
    const index = entries.findIndex((e) => e.id === id);
    if (index === -1) return null;
    entries[index] = { ...entries[index], ...updates, updatedAt: Date.now() };
    await AsyncStorage.setItem(STORAGE_KEYS.MIGRAINE_ENTRIES, JSON.stringify(entries));
    return entries[index];
  }

  async deleteMigraineEntry(id: string): Promise<boolean> {
    const entries = await this.getMigraineEntries();
    const filtered = entries.filter((e) => e.id !== id);
    if (filtered.length === entries.length) return false;
    await AsyncStorage.setItem(STORAGE_KEYS.MIGRAINE_ENTRIES, JSON.stringify(filtered));
    return true;
  }

  async getMigrainesByDate(date: string): Promise<MigraineEntry[]> {
    const entries = await this.getMigraineEntries();
    return entries.filter((e) => e.date === date);
  }

  async getMigrainesByMonth(year: number, month: number): Promise<MigraineEntry[]> {
    const entries = await this.getMigraineEntries();
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    return entries.filter((e) => e.date.startsWith(monthStr));
  }

  // ============= MEDICATIONS =============

  async getMedications(): Promise<Medication[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MEDICATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching medications:', error);
      return [];
    }
  }

  async addMedication(med: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>): Promise<Medication> {
    const newMed: Medication = {
      ...med,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const meds = await this.getMedications();
    meds.push(newMed);
    await AsyncStorage.setItem(STORAGE_KEYS.MEDICATIONS, JSON.stringify(meds));
    return newMed;
  }

  async updateMedication(id: string, updates: Partial<Medication>): Promise<Medication | null> {
    const meds = await this.getMedications();
    const index = meds.findIndex((m) => m.id === id);
    if (index === -1) return null;
    meds[index] = { ...meds[index], ...updates, updatedAt: Date.now() };
    await AsyncStorage.setItem(STORAGE_KEYS.MEDICATIONS, JSON.stringify(meds));
    return meds[index];
  }

  async deleteMedication(id: string): Promise<boolean> {
    const meds = await this.getMedications();
    const filtered = meds.filter((m) => m.id !== id);
    if (filtered.length === meds.length) return false;
    await AsyncStorage.setItem(STORAGE_KEYS.MEDICATIONS, JSON.stringify(filtered));
    return true;
  }

  // ============= MEDICATION INTAKES =============

  async getMedicationIntakes(): Promise<MedicationIntake[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MEDICATION_INTAKES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching medication intakes:', error);
      return [];
    }
  }

  async addMedicationIntake(intake: Omit<MedicationIntake, 'id' | 'createdAt' | 'updatedAt'>): Promise<MedicationIntake> {
    const newIntake: MedicationIntake = {
      ...intake,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const intakes = await this.getMedicationIntakes();
    intakes.push(newIntake);
    await AsyncStorage.setItem(STORAGE_KEYS.MEDICATION_INTAKES, JSON.stringify(intakes));
    return newIntake;
  }

  async getMedicationIntakesByDate(date: string): Promise<MedicationIntake[]> {
    const intakes = await this.getMedicationIntakes();
    return intakes.filter((i) => i.date === date);
  }

  // ============= TRIGGERS =============

  async getTriggers(): Promise<Trigger[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TRIGGERS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching triggers:', error);
      return [];
    }
  }

  async addTrigger(trigger: Omit<Trigger, 'id' | 'createdAt'>): Promise<Trigger> {
    const newTrigger: Trigger = {
      ...trigger,
      id: this.generateId(),
      createdAt: Date.now(),
    };
    const triggers = await this.getTriggers();
    triggers.push(newTrigger);
    await AsyncStorage.setItem(STORAGE_KEYS.TRIGGERS, JSON.stringify(triggers));
    return newTrigger;
  }

  async deleteTrigger(id: string): Promise<boolean> {
    const triggers = await this.getTriggers();
    const filtered = triggers.filter((t) => t.id !== id);
    if (filtered.length === triggers.length) return false;
    await AsyncStorage.setItem(STORAGE_KEYS.TRIGGERS, JSON.stringify(filtered));
    return true;
  }

  // ============= WEATHER DATA =============

  async getWeatherData(): Promise<WeatherData[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.WEATHER_DATA);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return [];
    }
  }

  async getWeatherByDate(date: string): Promise<WeatherData | null> {
    const weatherList = await this.getWeatherData();
    return weatherList.find((w) => w.date === date) || null;
  }

  async saveWeatherData(weather: Omit<WeatherData, 'id' | 'fetchedAt'>): Promise<WeatherData> {
    const existing = await this.getWeatherByDate(weather.date);
    if (existing) {
      const updated: WeatherData = { ...existing, ...weather, fetchedAt: Date.now() };
      const allWeather = await this.getWeatherData();
      const index = allWeather.findIndex((w) => w.date === weather.date);
      allWeather[index] = updated;
      await AsyncStorage.setItem(STORAGE_KEYS.WEATHER_DATA, JSON.stringify(allWeather));
      return updated;
    }
    const newWeather: WeatherData = {
      ...weather,
      id: this.generateId(),
      fetchedAt: Date.now(),
    };
    const allWeather = await this.getWeatherData();
    allWeather.push(newWeather);
    await AsyncStorage.setItem(STORAGE_KEYS.WEATHER_DATA, JSON.stringify(allWeather));
    return newWeather;
  }

  // ============= STEP DATA =============

  async getStepData(): Promise<StepData[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STEP_DATA);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching step data:', error);
      return [];
    }
  }

  async getStepsByDate(date: string): Promise<StepData | null> {
    const steps = await this.getStepData();
    return steps.find((s) => s.date === date) || null;
  }

  async saveStepData(stepData: Omit<StepData, 'id' | 'syncedAt'>): Promise<StepData> {
    const existing = await this.getStepsByDate(stepData.date);
    if (existing) {
      const updated: StepData = { ...existing, ...stepData, syncedAt: Date.now() };
      const allSteps = await this.getStepData();
      const index = allSteps.findIndex((s) => s.date === stepData.date);
      allSteps[index] = updated;
      await AsyncStorage.setItem(STORAGE_KEYS.STEP_DATA, JSON.stringify(allSteps));
      return updated;
    }
    const newStepData: StepData = {
      ...stepData,
      id: this.generateId(),
      syncedAt: Date.now(),
    };
    const allSteps = await this.getStepData();
    allSteps.push(newStepData);
    await AsyncStorage.setItem(STORAGE_KEYS.STEP_DATA, JSON.stringify(allSteps));
    return newStepData;
  }

  // ============= MOOD ENTRIES =============

  async getMoodEntries(): Promise<MoodEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching mood entries:', error);
      return [];
    }
  }

  async getMoodByDate(date: string): Promise<MoodEntry | null> {
    const moods = await this.getMoodEntries();
    return moods.find((m) => m.date === date) || null;
  }

  async saveMoodEntry(mood: Omit<MoodEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<MoodEntry> {
    const existing = await this.getMoodByDate(mood.date);
    if (existing) {
      const updated: MoodEntry = { ...existing, ...mood, updatedAt: Date.now() };
      const allMoods = await this.getMoodEntries();
      const index = allMoods.findIndex((m) => m.date === mood.date);
      allMoods[index] = updated;
      await AsyncStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(allMoods));
      return updated;
    }
    const newMood: MoodEntry = {
      ...mood,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const allMoods = await this.getMoodEntries();
    allMoods.push(newMood);
    await AsyncStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(allMoods));
    return newMood;
  }

  // ============= FOOD ENTRIES =============

  async getFoodEntries(): Promise<FoodEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FOOD_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching food entries:', error);
      return [];
    }
  }

  async addFoodEntry(food: Omit<FoodEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<FoodEntry> {
    const newFood: FoodEntry = {
      ...food,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const foods = await this.getFoodEntries();
    foods.push(newFood);
    await AsyncStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(foods));
    return newFood;
  }

  async updateFoodEntry(id: string, updates: Partial<FoodEntry>): Promise<FoodEntry | null> {
    const foods = await this.getFoodEntries();
    const index = foods.findIndex((f) => f.id === id);
    if (index === -1) return null;
    foods[index] = { ...foods[index], ...updates, updatedAt: Date.now() };
    await AsyncStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(foods));
    return foods[index];
  }

  async getFoodEntriesByDate(date: string): Promise<FoodEntry[]> {
    const foods = await this.getFoodEntries();
    return foods.filter((f) => f.date === date);
  }

  // ============= DATA EXPORT & CLEANUP =============

  async exportAllData(): Promise<ExportData> {
    return {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      migraineEntries: await this.getMigraineEntries(),
      medications: await this.getMedications(),
      medicationIntakes: await this.getMedicationIntakes(),
      triggers: await this.getTriggers(),
      weatherData: await this.getWeatherData(),
      stepData: await this.getStepData(),
      moodEntries: await this.getMoodEntries(),
      foodEntries: await this.getFoodEntries(),
    };
  }

  async deleteAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
      console.log('All data deleted successfully');
    } catch (error) {
      console.error('Error deleting all data:', error);
    }
  }
}

export default new StorageService();