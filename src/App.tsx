import React, { useState, useEffect, useRef } from 'react';

const THEME_PALETTES: Record<string, Record<string, string>> = {
  blue: {
    bgMain: '#12101e',
    panelBg: '#16213e',
    headerBg: '#0f3460',
    subpanelBg: '#0a1128',
    borderSubtle: '#0f3460',
    textPrimary: '#f0f0f0',
    accentPink: '#e94560',
    accentGreen: '#4ecca3',
    accentCyan: '#38bdf8',
    accentYellow: '#facc15',
    accentOrange: '#fb923c'
  },
  pink: {
    bgMain: '#2b1129',
    panelBg: '#3d1b3b',
    headerBg: '#5a2055',
    subpanelBg: '#1e0b1d',
    borderSubtle: '#5a2055',
    textPrimary: '#fff0f6',
    accentPink: '#ff3377',
    accentGreen: '#4ecca3',
    accentCyan: '#38bdf8',
    accentYellow: '#facc15',
    accentOrange: '#fb923c'
  },
  emerald: {
    bgMain: '#081c15',
    panelBg: '#1b4332',
    headerBg: '#2d6a4f',
    subpanelBg: '#040f0c',
    borderSubtle: '#40916c',
    textPrimary: '#d8f3dc',
    accentPink: '#ff758f',
    accentGreen: '#52b788',
    accentCyan: '#74c69d',
    accentYellow: '#ffb703',
    accentOrange: '#fb8500'
  }
};

class SoundManager {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBlip() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {}
  }

  playEat() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.16);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {}
  }

  playCoin() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  playLevelUp() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const noteTime = now + idx * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, noteTime);
        gain.gain.setValueAtTime(0.09, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteTime);
        osc.stop(noteTime + 0.08);
      });
    } catch {}
  }

  playTrash() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }
}

const soundManager = new SoundManager();

const POPULAR_FOOD_EMOJIS = [
  '🥩', '🍗', '🍳', '🐟', '🍤', '🥛', '🧀', '🥓',
  '🍚', '🍞', '🥔', '🍠', '🍌', '🍎', '🫐', '🌾',
  '🥑', '🧈', '🥜', '🌰', '🥦', '🥬', '🥕', '🥒',
  '🍅', '🌽', '🥗', '🍕', '🍔', '🌮', '🥟', '🥤',
  '🥞', '🧇', '🍦', '🍩', '🍫', '🧃', '🫒', '🥣'
];

const DEFAULT_FOOD_ITEMS = [
  { id: 'chicken-breast', name: 'Chicken Breast', category: 'protein', defaultGrams: 150, caloriesPer100g: 165, proteinPer100g: 31, carbsPer100g: 0, fatPer100g: 3.6, icon: '🍗' },
  { id: 'ground-beef', name: 'Ground Beef (90/10)', category: 'protein', defaultGrams: 150, caloriesPer100g: 215, proteinPer100g: 26, carbsPer100g: 0, fatPer100g: 12, icon: '🥩' },
  { id: 'beef-steak', name: 'Beef Steak', category: 'protein', defaultGrams: 200, caloriesPer100g: 240, proteinPer100g: 27, carbsPer100g: 0, fatPer100g: 14, icon: '🥩' },
  { id: 'salmon', name: 'Salmon Fillet', category: 'protein', defaultGrams: 150, caloriesPer100g: 208, proteinPer100g: 20, carbsPer100g: 0, fatPer100g: 13, icon: '🐟' },
  { id: 'whole-eggs', name: 'Whole Eggs (2 eggs ~100g)', category: 'protein', defaultGrams: 100, caloriesPer100g: 143, proteinPer100g: 13, carbsPer100g: 0.7, fatPer100g: 9.5, icon: '🍳' },
  { id: 'whey-protein', name: 'Whey Protein Powder', category: 'protein', defaultGrams: 30, caloriesPer100g: 380, proteinPer100g: 80, carbsPer100g: 4, fatPer100g: 2, icon: '🥤' },
  { id: 'greek-yogurt-0', name: 'Greek Yogurt (0% Fat)', category: 'protein', defaultGrams: 170, caloriesPer100g: 59, proteinPer100g: 10, carbsPer100g: 3.6, fatPer100g: 0.4, icon: '🥛' },
  { id: 'white-rice', name: 'White Rice (Cooked)', category: 'carbs', defaultGrams: 150, caloriesPer100g: 130, proteinPer100g: 2.7, carbsPer100g: 28.2, fatPer100g: 0.3, icon: '🍚' },
  { id: 'pasta', name: 'Pasta / Spaghetti (Cooked)', category: 'carbs', defaultGrams: 150, caloriesPer100g: 158, proteinPer100g: 5.8, carbsPer100g: 30.9, fatPer100g: 0.9, icon: '🍝' },
  { id: 'rolled-oats', name: 'Rolled Oats (Raw)', category: 'carbs', defaultGrams: 60, caloriesPer100g: 389, proteinPer100g: 16.9, carbsPer100g: 66.3, fatPer100g: 6.9, icon: '🥣' },
  { id: 'potato', name: 'Potato (Boiled/Baked)', category: 'carbs', defaultGrams: 200, caloriesPer100g: 87, proteinPer100g: 1.9, carbsPer100g: 20.1, fatPer100g: 0.1, icon: '🥔' },
  { id: 'sweet-potato', name: 'Sweet Potato (Baked)', category: 'carbs', defaultGrams: 180, caloriesPer100g: 86, proteinPer100g: 1.6, carbsPer100g: 20.1, fatPer100g: 0.1, icon: '🍠' },
  { id: 'banana', name: 'Banana (1 medium ~120g)', category: 'carbs', defaultGrams: 120, caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 22.8, fatPer100g: 0.3, icon: '🍌' },
  { id: 'blueberries', name: 'Blueberries / Berries', category: 'carbs', defaultGrams: 100, caloriesPer100g: 57, proteinPer100g: 0.7, carbsPer100g: 14.5, fatPer100g: 0.3, icon: '🫐' },
  { id: 'olive-oil', name: 'Olive Oil', category: 'fats', defaultGrams: 14, caloriesPer100g: 884, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100, icon: '🫒' },
  { id: 'peanut-butter', name: 'Peanut Butter', category: 'fats', defaultGrams: 32, caloriesPer100g: 588, proteinPer100g: 25, carbsPer100g: 20, fatPer100g: 50, icon: '🥜' },
  { id: 'avocado', name: 'Avocado', category: 'fats', defaultGrams: 100, caloriesPer100g: 160, proteinPer100g: 2, carbsPer100g: 8.5, fatPer100g: 14.7, icon: '🥑' },
  { id: 'broccoli', name: 'Broccoli', category: 'veggies', defaultGrams: 100, caloriesPer100g: 34, proteinPer100g: 2.8, carbsPer100g: 7, fatPer100g: 0.4, icon: '🥦' },
  { id: 'spinach', name: 'Spinach', category: 'veggies', defaultGrams: 80, caloriesPer100g: 23, proteinPer100g: 2.9, carbsPer100g: 3.6, fatPer100g: 0.4, icon: '🥬' }
];

const INITIAL_SAVED_MEALS = [
  {
    id: 'sample-meal-1',
    name: 'Oatmeal & Protein Breakfast',
    category: 'breakfast',
    ingredients: [
      { id: 'i-1', foodId: 'rolled-oats', name: 'Rolled Oats', grams: 70, calories: 272, protein: 11.8, carbs: 46.4, fat: 4.8, icon: '🥣' },
      { id: 'i-2', foodId: 'whey-protein', name: 'Whey Protein Powder', grams: 35, calories: 133, protein: 28.0, carbs: 1.4, fat: 0.7, icon: '🥤' },
      { id: 'i-3', foodId: 'blueberries', name: 'Blueberries', grams: 80, calories: 46, protein: 0.6, carbs: 11.6, fat: 0.2, icon: '🫐' },
      { id: 'i-4', foodId: 'peanut-butter', name: 'Peanut Butter', grams: 20, calories: 118, protein: 5.0, carbs: 4.0, fat: 10.0, icon: '🥜' }
    ],
    totalGrams: 205,
    totalCalories: 569,
    totalProtein: 45.4,
    totalCarbs: 63.4,
    totalFat: 15.7,
    loggedAt: new Date().toISOString(),
    isFavorite: true
  },
  {
    id: 'sample-meal-2',
    name: 'Chicken Rice & Broccoli Plate',
    category: 'lunch',
    ingredients: [
      { id: 'i-5', foodId: 'chicken-breast', name: 'Chicken Breast', grams: 180, calories: 297, protein: 55.8, carbs: 0, fat: 6.5, icon: '🍗' },
      { id: 'i-6', foodId: 'white-rice', name: 'White Rice (Cooked)', grams: 180, calories: 234, protein: 4.9, carbs: 50.8, fat: 0.5, icon: '🍚' },
      { id: 'i-7', foodId: 'broccoli', name: 'Broccoli', grams: 120, calories: 41, protein: 3.4, carbs: 8.4, fat: 0.5, icon: '🥦' },
      { id: 'i-8', foodId: 'olive-oil', name: 'Olive Oil', grams: 10, calories: 88, protein: 0, carbs: 0, fat: 10.0, icon: '🫒' }
    ],
    totalGrams: 490,
    totalCalories: 660,
    totalProtein: 64.1,
    totalCarbs: 59.2,
    totalFat: 17.5,
    loggedAt: new Date().toISOString(),
    isFavorite: true
  }
];

const STORAGE_KEYS = {
  MEALS: 'retro_macro_meals_v12',
  GOALS: 'retro_macro_goals_v12',
  TEMPLATES: 'retro_macro_templates_v12',
  STATS: 'retro_macro_stats_v12',
  SCANLINES: 'retro_macro_scanlines_v12',
  MUTED: 'retro_macro_muted_v12',
  THEME: 'retro_macro_theme_v12',
  CUSTOM_FOODS: 'retro_macro_custom_foods_v12',
  DELETED_FOOD_IDS: 'retro_macro_deleted_ids_v12',
  HISTORY: 'retro_macro_history_v12'
};

const DEFAULT_GOALS = { calories: 2400, protein: 160, carbs: 250, fat: 70 };
const getTodayDateStr = () => new Date().toISOString().split('T')[0];

async function queryGeminiSensei(userQuery: string, currentCalories: number, currentProtein: number, goals: { calories: number; protein: number }) {
  const systemPrompt = `You are Sensei, an 8-bit retro RPG fitness and nutrition coach. Give short, punchy, fun RPG-themed advice (under 60 words). Use retro terms like HP, STR, Mana, Quests, and Boss Battles.`;
  const prompt = `Current status: Consumed ${Math.round(currentCalories)}/${goals.calories} kcal, ${Math.round(currentProtein)}g/${goals.protein}g protein. User question/request: "${userQuery}"`;
  
  const apiKey = "";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      })
    });
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) return text;
    throw new Error("No text response");
  } catch {
    return `⚔️ Sensei says: "Focus on hitting your daily ${goals.protein}g protein target with chicken, eggs, or whey to conquer today's quest!"`;
  }
}

// Icons
const IconFlame = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 23c-4.97 0-9-3.582-9-8 0-4 3-7.5 5-11 2 3.5 3 4.5 4 4.5 1.5 0 2-1 1.5-3 3 2.5 7.5 7.5 7.5 10.5 0 3.866-4.03 7-9 7z"/></svg>
);
const IconVolume2 = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
);
const IconVolumeX = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/></svg>
);
const IconMonitor = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
);
const IconSparkles = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>
);
const IconBot = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h0M16 16h0"/></svg>
);
const IconScroll = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.3-2-3c-.7-1.7-2-3-4-3H5C3.3 4 2 5.3 2 7v10c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3z"/></svg>
);
const IconUtensils = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2v20M18 8h3M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20"/></svg>
);
const IconRefreshCw = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
);
const IconSettings2 = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7h-9M14 17H5M5 7h2M19 17h2M7 5v4M14 15v4"/></svg>
);
const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
);
const IconZap = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const IconPlus = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
);
const IconMinus = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
);
const IconTrash2 = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
);
const IconEdit3 = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
);
const IconChevronDown = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
);
const IconChevronUp = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
);
const IconCopy = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
);
const IconChefHat = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 13.8a4.5 4.5 0 112.61-8.2A5 5 0 0118 7a4.5 4.5 0 011.39 8.8V19a2 2 0 01-2 2H6.61A2 2 0 014.6 19v-5.2zM6 17h12"/></svg>
);
const IconSearch = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
);
const IconX = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
);
const IconPalette = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.75 1.7-1.7 0-.42-.16-.81-.43-1.1-.28-.3-.43-.7-.43-1.12 0-.92.75-1.68 1.68-1.68H16c3.3 0 6-2.7 6-6 0-4.7-4.5-8.5-10-8.5z"/></svg>
);
const IconAward = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
);
const IconBarChart3 = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3"/></svg>
);
const IconCalculator = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="12" y1="10" x2="10"/><line x1="8" y1="10" x2="8" y2="10"/></svg>
);
const IconSend = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
);

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return THEME_PALETTES[saved || ''] ? saved : 'blue';
    } catch { return 'blue'; }
  });

  const activePalette = THEME_PALETTES[theme || 'blue'] || THEME_PALETTES.blue;

  const [meals, setMeals] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEALS);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
      return saved ? JSON.parse(saved) : DEFAULT_GOALS;
    } catch { return DEFAULT_GOALS; }
  });

  const [templates, setTemplates] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
      return saved ? JSON.parse(saved) : INITIAL_SAVED_MEALS;
    } catch { return INITIAL_SAVED_MEALS; }
  });

  const [userStats, setUserStats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      return saved ? JSON.parse(saved) : {
        level: 1, xp: 0, xpToNextLevel: 100, streakDays: 1, lastActiveDate: getTodayDateStr(), rankTitle: 'Novice Initiate', totalMealsLogged: 0
      };
    } catch {
      return { level: 1, xp: 0, xpToNextLevel: 100, streakDays: 1, lastActiveDate: getTodayDateStr(), rankTitle: 'Novice Initiate', totalMealsLogged: 0 };
    }
  });

  const [history, setHistory] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [scanlinesEnabled, setScanlinesEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCANLINES);
      return saved !== null ? JSON.parse(saved) : true;
    } catch { return true; }
  });

  const [isMuted, setIsMuted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MUTED);
      return saved !== null ? JSON.parse(saved) : false;
    } catch { return false; }
  });

  const [customFoods, setCustomFoods] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [deletedFoodIds, setDeletedFoodIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DELETED_FOOD_IDS);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  useEffect(() => {
    soundManager.muted = isMuted;
    localStorage.setItem(STORAGE_KEYS.MUTED, JSON.stringify(isMuted));
  }, [isMuted]);

  const currentCalories = meals.reduce((acc, m) => acc + m.totalCalories, 0);
  const currentProtein = meals.reduce((acc, m) => acc + m.totalProtein, 0);
  const currentCarbs = meals.reduce((acc, m) => acc + m.totalCarbs, 0);
  const currentFat = meals.reduce((acc, m) => acc + m.totalFat, 0);

  useEffect(() => {
    const todayStr = getTodayDateStr();
    setHistory((prev: Record<string, any>) => ({
      ...prev,
      [todayStr]: {
        dateStr: todayStr,
        calories: currentCalories,
        protein: Math.round(currentProtein),
        carbs: Math.round(currentCarbs),
        fat: Math.round(currentFat),
        mealCount: meals.length
      }
    }));
  }, [meals, currentCalories, currentProtein, currentCarbs, currentFat]);

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals)); }, [meals]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates)); }, [templates]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(userStats)); }, [userStats]);
  useEffect(() => { if (theme) localStorage.setItem(STORAGE_KEYS.THEME, theme); }, [theme]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SCANLINES, JSON.stringify(scanlinesEnabled)); }, [scanlinesEnabled]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(customFoods)); }, [customFoods]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.DELETED_FOOD_IDS, JSON.stringify(deletedFoodIds)); }, [deletedFoodIds]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history)); }, [history]);

  const checkAndUpdateStreak = () => {
    const todayStr = getTodayDateStr();
    const lastActive = userStats.lastActiveDate;

    if (lastActive === todayStr) return;

    const todayDate = new Date(todayStr);
    const lastDate = new Date(lastActive);
    const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    setUserStats((prev: any) => {
      let newStreak = prev.streakDays;
      if (diffDays === 1) {
        newStreak += 1;
        showToast(`🔥 STREAK INCREASED! ${newStreak} DAYS`);
      } else if (diffDays > 1) {
        newStreak = 1;
        showToast(`⚡ Streak Reset to Day 1! Welcome back!`);
      }
      return { ...prev, streakDays: newStreak, lastActiveDate: todayStr };
    });
  };

  const addXP = (amount: number) => {
    checkAndUpdateStreak();
    setUserStats((prev: any) => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNextLevel;

      if (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel += 1;
        newXPToNext = Math.round(newXPToNext * 1.4);
        soundManager.playLevelUp();
        showToast(`LEVEL UP! Reached Level ${newLevel}! 🎉`);
      }

      const titles = [
        'Novice Initiate', 'Apprentice Cook', 'Sous Chef', 'Elite Chef',
        'Master Alchemist', 'Macro Berserker', 'Protein Paladin', 'Grand Guild Master'
      ];
      const rankTitle = titles[Math.min(newLevel - 1, titles.length - 1)];

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext,
        rankTitle,
        totalMealsLogged: prev.totalMealsLogged + 1
      };
    });
  };

  const handleSaveMeal = (meal: any, saveAsTemplate: boolean) => {
    if (editingMeal) {
      setMeals((prev: any[]) => prev.map(m => (m.id === meal.id ? meal : m)));
      setEditingMeal(null);
      showToast('Meal recipe updated!');
    } else {
      setMeals((prev: any[]) => [...prev, meal]);
      addXP(50);
      showToast(`Logged "${meal.name}" (+50 XP)`);
    }

    if (saveAsTemplate) {
      setTemplates((prev: any[]) => {
        const exists = prev.some(t => t.name.toLowerCase() === meal.name.toLowerCase());
        if (exists) return prev;
        return [...prev, meal];
      });
      showToast('Recipe added to Spellbook!');
    }
  };

  const handleDeleteMeal = (id: string) => {
    soundManager.playTrash();
    setMeals((prev: any[]) => prev.filter(m => m.id !== id));
    showToast('Meal discarded.');
  };

  const handleDuplicateMeal = (meal: any) => {
    soundManager.playEat();
    const duplicated = {
      ...meal,
      id: 'meal-' + Date.now(),
      loggedAt: new Date().toISOString()
    };
    setMeals((prev: any[]) => [...prev, duplicated]);
    addXP(30);
    showToast(`Re-logged "${meal.name}" (+30 XP)`);
  };

  const handleLogTemplate = (template: any) => {
    soundManager.playEat();
    const logged = {
      ...template,
      id: 'meal-' + Date.now(),
      loggedAt: new Date().toISOString()
    };
    setMeals((prev: any[]) => [...prev, logged]);
    addXP(40);
    showToast(`Logged "${template.name}" (+40 XP)`);
  };

  return (
    <div
      style={{ backgroundColor: activePalette.bgMain, color: activePalette.textPrimary, fontFamily: "'VT323', monospace" }}
      className="min-h-screen flex flex-col select-none transition-colors duration-300 relative text-lg sm:text-xl overflow-x-hidden"
    >
      {toastMessage && (
        <div className="fixed top-3 right-3 z-50 bg-black text-white px-3 py-2 border-3 sm:border-4 border-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-pixel text-[10px] sm:text-xs flex items-center gap-2 animate-bounce max-w-[92vw]">
          <IconSparkles className="w-4 h-4 text-yellow-300 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {scanlinesEnabled && (
        <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,6px_100%] shadow-[inset_0_0_80px_rgba(0,0,0,0.7)]" />
      )}

      <div className="w-full max-w-7xl mx-auto p-2 sm:p-5 flex-1 flex flex-col min-w-0">
        <div
          style={{ backgroundColor: activePalette.bgMain }}
          className="border-3 sm:border-8 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col overflow-hidden"
        >
          <RetroHeader
            theme={theme}
            onThemeChange={setTheme}
            scanlinesEnabled={scanlinesEnabled}
            onToggleScanlines={() => setScanlinesEnabled(!scanlinesEnabled)}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
            userStats={userStats}
            palette={activePalette}
            onOpenCalc={() => { soundManager.playBlip(); setIsCalcModalOpen(true); }}
          />

          <div className="px-3 sm:px-8 mb-4 sm:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() => {
                soundManager.playBlip();
                setEditingMeal(null);
                setIsMealModalOpen(true);
              }}
              className="w-full sm:w-auto bg-emerald-600 border-3 sm:border-4 border-black text-white hover:bg-emerald-500 active:translate-y-1 py-3 sm:py-3.5 px-5 sm:px-7 font-bold uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2.5 font-pixel text-xs sm:text-sm cursor-pointer"
            >
              <IconChefHat className="w-5 h-5 text-yellow-300 shrink-0" />
              <span>CRAFT MEAL +</span>
            </button>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              <div className="font-pixel text-[10px] sm:text-xs text-yellow-400 bg-black py-2.5 px-3 border-2 border-black flex items-center gap-2 w-full sm:w-auto justify-center">
                <IconAward className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>LOGGED MEALS: {userStats.totalMealsLogged}</span>
              </div>
            </div>
          </div>

          <main className="flex-1 px-3 sm:px-8 pb-5 sm:pb-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-w-0">
            <div className="lg:col-span-5 space-y-4 sm:space-y-6 flex flex-col min-w-0">
              <CircularGaugeSlider
                currentCalories={currentCalories}
                currentProtein={currentProtein}
                goals={goals}
                onUpdateGoals={setGoals}
                palette={activePalette}
              />
              <MacroBreakdownBar
                currentCalories={currentCalories}
                currentProtein={currentProtein}
                currentCarbs={currentCarbs}
                currentFat={currentFat}
                goals={goals}
                palette={activePalette}
              />
            </div>

            <div className="lg:col-span-7 space-y-4 sm:space-y-6 flex flex-col min-w-0">
              <SenseiCoach
                currentCalories={currentCalories}
                currentProtein={currentProtein}
                goals={goals}
                palette={activePalette}
              />
              <WeeklyHistoryChart
                history={history}
                goals={goals}
                palette={activePalette}
              />
              <DailyLogList
                meals={meals}
                onDeleteMeal={handleDeleteMeal}
                onEditMeal={(meal: any) => {
                  setEditingMeal(meal);
                  setIsMealModalOpen(true);
                }}
                onDuplicateMeal={handleDuplicateMeal}
                palette={activePalette}
              />
              <SavedMealTemplates
                templates={templates}
                onLogTemplate={handleLogTemplate}
                onDeleteTemplate={(id: string) => setTemplates((prev: any[]) => prev.filter(t => t.id !== id))}
                palette={activePalette}
              />
            </div>
          </main>
        </div>
      </div>

      <MealCreatorModal
        isOpen={isMealModalOpen}
        onClose={() => {
          setIsMealModalOpen(false);
          setEditingMeal(null);
        }}
        onSaveMeal={handleSaveMeal}
        initialMeal={editingMeal}
        customFoods={customFoods}
        deletedFoodIds={deletedFoodIds}
        onAddCustomFood={(food: any) => setCustomFoods((prev: any[]) => [food, ...prev])}
        onDeleteFood={(id: string, isCustom: boolean) => {
          if (isCustom) {
            setCustomFoods((prev: any[]) => prev.filter(f => f.id !== id));
          } else {
            setDeletedFoodIds((prev: string[]) => (prev.includes(id) ? prev : [...prev, id]));
          }
        }}
        palette={activePalette}
      />

      <MacroCalculatorModal
        isOpen={isCalcModalOpen}
        onClose={() => setIsCalcModalOpen(false)}
        onApplyGoals={(newGoals: any) => {
          setGoals(newGoals);
          soundManager.playCoin();
          showToast("New macro goals applied!");
        }}
        palette={activePalette}
      />
    </div>
  );
}

function RetroHeader({
  theme,
  onThemeChange,
  scanlinesEnabled,
  onToggleScanlines,
  isMuted,
  onToggleMute,
  userStats,
  palette,
  onOpenCalc
}: any) {
  const xpPercent = Math.min(Math.round((userStats.xp / userStats.xpToNextLevel) * 100), 100);

  return (
    <header
      style={{ backgroundColor: palette.headerBg }}
      className="flex flex-col lg:flex-row lg:items-center justify-between px-3 sm:px-8 py-3 sm:py-4 border-b-3 sm:border-b-8 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 sm:mb-6 gap-3"
    >
      <div>
        <h1 className="text-xl sm:text-3xl font-pixel font-bold uppercase text-white tracking-tight leading-tight">
          MACRO QUEST
        </h1>
        <div className="font-silk text-[9px] sm:text-xs text-cyan-300 font-bold mt-1">
          CUSTOM MEALS FORGE • RPG NUTRITION
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        <div className="flex items-center justify-between sm:justify-start gap-2 bg-black/60 p-2 border-2 border-black">
          <div className="flex flex-col items-start shrink-0">
            <span className="text-[8px] sm:text-[9px] uppercase text-pink-400 font-pixel font-bold">RANK</span>
            <span className="text-sm sm:text-lg font-retro text-white uppercase tracking-wider font-bold">
              LVL {userStats.level}
            </span>
          </div>
          <div className="flex-1 sm:w-28 sm:flex-none h-4 sm:h-5 bg-black border-2 border-white p-0.5">
            <div style={{ width: `${xpPercent}%` }} className="h-full bg-emerald-500 transition-all duration-300" />
          </div>
          
          <div className="bg-black/80 border-2 border-pink-500 px-2 py-1 flex items-center gap-1 shrink-0">
            <IconFlame className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="font-pixel text-xs text-pink-400 font-bold leading-none">{userStats.streakDays}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end">
          <button
            onClick={onOpenCalc}
            className="flex-1 sm:flex-none pixel-btn bg-amber-600 text-white px-2.5 py-2 text-[9px] sm:text-[10px] flex items-center justify-center gap-1.5 cursor-pointer font-bold hover:bg-amber-500 border-2 border-black"
            title="Macro Calculator Wizard"
          >
            <IconCalculator className="w-3.5 h-3.5" />
            <span>WIZARD</span>
          </button>

          <div className="flex items-center bg-black border-2 border-black px-2 py-1">
            <IconPalette className="w-3.5 h-3.5 text-yellow-400 mr-1.5 shrink-0" />
            <select
              value={theme}
              onChange={(e) => {
                soundManager.playBlip();
                onThemeChange(e.target.value);
              }}
              className="bg-transparent text-yellow-400 font-retro text-sm sm:text-base font-bold focus:outline-none cursor-pointer"
            >
              <option value="blue" className="bg-[#1a1a2e] text-white">👾 Blue</option>
              <option value="pink" className="bg-[#3d1b3b] text-[#ff80bf]">🌸 Pink</option>
              <option value="emerald" className="bg-[#081c15] text-[#52b788]">🐉 Emerald</option>
            </select>
          </div>

          <button
            onClick={() => { soundManager.playBlip(); onToggleScanlines(); }}
            className={`pixel-btn px-2.5 py-2 text-[9px] sm:text-[10px] flex items-center gap-1 cursor-pointer border-2 border-black ${scanlinesEnabled ? 'bg-cyan-600 text-white' : 'bg-black text-slate-400'}`}
          >
            <IconMonitor className="w-3.5 h-3.5" />
            <span>CRT</span>
          </button>
          <button
            onClick={() => { onToggleMute(); soundManager.playBlip(); }}
            className={`pixel-btn px-2.5 py-2 text-[9px] sm:text-[10px] flex items-center gap-1 cursor-pointer border-2 border-black ${!isMuted ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}
          >
            {!isMuted ? <IconVolume2 className="w-3.5 h-3.5" /> : <IconVolumeX className="w-3.5 h-3.5 text-white" />}
            <span>{!isMuted ? 'SFX' : 'MUTED'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function CircularGaugeSlider({ currentCalories, currentProtein, goals, onUpdateGoals, palette }: any) {
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [tempCalories, setTempCalories] = useState(goals.calories);
  const [tempProtein, setTempProtein] = useState(goals.protein);
  const [tempCarbs, setTempCarbs] = useState(goals.carbs);
  const [tempFat, setTempFat] = useState(goals.fat);

  const calRatio = goals.calories > 0 ? Math.min(currentCalories / goals.calories, 1) : 0;
  const proRatio = goals.protein > 0 ? Math.min(currentProtein / goals.protein, 1) : 0;
  const remainingCalories = Math.max(0, goals.calories - currentCalories);
  const calPercent = Math.round(calRatio * 100);
  const proPercent = Math.round(proRatio * 100);

  return (
    <section
      style={{ backgroundColor: palette.panelBg }}
      className="p-3.5 sm:p-6 border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative flex flex-col items-center justify-center select-none min-w-0"
    >
      <div className="w-full flex items-center justify-between border-b-2 sm:border-b-4 border-black pb-2 sm:pb-3 mb-3 sm:mb-4">
        <h2 className="text-[10px] sm:text-sm font-pixel font-bold uppercase text-yellow-300">
          CIRCULAR VISUALIZER
        </h2>
        <button
          onClick={() => {
            soundManager.playBlip();
            setTempCalories(goals.calories);
            setTempProtein(goals.protein);
            setTempCarbs(goals.carbs);
            setTempFat(goals.fat);
            setIsEditingGoals(!isEditingGoals);
          }}
          className="pixel-btn bg-black text-yellow-400 px-2.5 py-1.5 text-[9px] sm:text-[10px] flex items-center gap-1.5 border border-black cursor-pointer font-bold hover:bg-yellow-400 hover:text-black"
        >
          <IconSettings2 className="w-3.5 h-3.5" />
          <span>{isEditingGoals ? 'CLOSE' : 'TARGETS'}</span>
        </button>
      </div>

      {isEditingGoals && (
        <div
          style={{ backgroundColor: palette.subpanelBg }}
          className="w-full border-2 sm:border-4 border-black p-3 sm:p-4 mb-3 sm:mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left"
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <IconSparkles className="w-4 h-4 text-amber-400" />
            <span className="font-pixel text-[9px] sm:text-[11px] text-yellow-300 uppercase font-bold">MANUAL TARGET CALIBRATION</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
            <div>
              <label className="block text-[8px] sm:text-[10px] uppercase text-rose-400 font-pixel mb-1 font-bold">ENERGY (KCAL)</label>
              <input
                type="number"
                value={tempCalories}
                onChange={(e) => setTempCalories(Number(e.target.value))}
                className="w-full bg-black border-2 border-black p-1.5 sm:p-2 text-base sm:text-2xl font-retro text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[8px] sm:text-[10px] uppercase text-emerald-400 font-pixel mb-1 font-bold">PROTEIN (G)</label>
              <input
                type="number"
                value={tempProtein}
                onChange={(e) => setTempProtein(Number(e.target.value))}
                className="w-full bg-black border-2 border-black p-1.5 sm:p-2 text-base sm:text-2xl font-retro text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[8px] sm:text-[10px] uppercase text-amber-400 font-pixel mb-1 font-bold">CARBS (G)</label>
              <input
                type="number"
                value={tempCarbs}
                onChange={(e) => setTempCarbs(Number(e.target.value))}
                className="w-full bg-black border-2 border-black p-1.5 sm:p-2 text-base sm:text-2xl font-retro text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[8px] sm:text-[10px] uppercase text-orange-400 font-pixel mb-1 font-bold">FATS (G)</label>
              <input
                type="number"
                value={tempFat}
                onChange={(e) => setTempFat(Number(e.target.value))}
                className="w-full bg-black border-2 border-black p-1.5 sm:p-2 text-base sm:text-2xl font-retro text-white font-bold"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditingGoals(false)}
              className="pixel-btn bg-black text-slate-300 px-3 py-1.5 text-[9px] cursor-pointer border-2 border-black"
            >
              CANCEL
            </button>
            <button
              onClick={() => {
                soundManager.playCoin();
                onUpdateGoals({ calories: tempCalories, protein: tempProtein, carbs: tempCarbs, fat: tempFat });
                setIsEditingGoals(false);
              }}
              className="pixel-btn bg-emerald-600 text-white font-bold px-3.5 py-1.5 text-[9px] flex items-center gap-1.5 cursor-pointer border-2 border-black"
            >
              <IconCheck className="w-3.5 h-3.5" /> LOCK
            </button>
          </div>
        </div>
      )}

      <div className="relative w-52 h-52 xs:w-60 xs:h-60 sm:w-80 sm:h-80 max-w-full flex items-center justify-center my-2 shrink-0">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#000000" strokeWidth="8.5" opacity="0.6" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={palette.accentPink}
            strokeWidth="8.5"
            strokeDasharray="276.46"
            strokeDashoffset={276.46 - (Math.min(calPercent / 100, 1) * 276.46)}
            strokeLinecap="butt"
            className="transition-all duration-700 ease-out"
          />
          <circle cx="50" cy="50" r="34.5" fill="none" stroke="#000000" strokeWidth="6" opacity="0.6" />
          <circle
            cx="50"
            cy="50"
            r="34.5"
            fill="none"
            stroke={palette.accentGreen}
            strokeWidth="6"
            strokeDasharray="216.77"
            strokeDashoffset={216.77 - (Math.min(proPercent / 100, 1) * 216.77)}
            strokeLinecap="butt"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="text-center z-10 max-w-[150px] sm:max-w-[180px] px-2 flex flex-col items-center justify-center">
          <div className="text-2xl xs:text-3xl sm:text-4xl font-bold font-retro text-white leading-none">
            {remainingCalories.toLocaleString()}
          </div>
          <div className="text-[8px] xs:text-[9px] uppercase tracking-wider text-rose-400 font-pixel font-bold mt-1">
            KCAL LEFT
          </div>
          <div className="w-10 h-[2px] bg-slate-700 my-1.5" />
          <div className="text-base xs:text-lg sm:text-xl font-bold font-retro text-emerald-400 leading-none whitespace-nowrap">
            {Math.round(currentProtein)}g / {goals.protein}g
          </div>
          <div className="text-[8px] xs:text-[9px] uppercase tracking-wider text-emerald-400 font-pixel font-bold mt-1 whitespace-nowrap">
            PROTEIN ({proPercent}%)
          </div>
        </div>
      </div>
    </section>
  );
}

function MacroBreakdownBar({ currentCalories, currentProtein, currentCarbs, currentFat, goals, palette }: any) {
  const renderRetroSegments = (current: number, target: number, colorHex: string) => {
    const totalBlocks = 16;
    const filledBlocks = target > 0 ? Math.min(Math.round((current / target) * totalBlocks), totalBlocks) : 0;
    const isOver = current > target;
    return (
      <div className="flex items-center gap-[3px] bg-black p-1.5 border-2 border-black overflow-hidden">
        {Array.from({ length: totalBlocks }).map((_, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: idx < filledBlocks ? (isOver ? '#ef4444' : colorHex) : palette.subpanelBg }}
            className="h-3 flex-1 min-w-0 transition-all duration-300"
          />
        ))}
      </div>
    );
  };

  return (
    <div
      style={{ backgroundColor: palette.panelBg }}
      className="p-3.5 sm:p-6 border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-0"
    >
      <div className="flex items-center justify-between border-b-2 sm:border-b-4 border-black pb-2 sm:pb-3 mb-3 sm:mb-4">
        <h3 className="font-pixel text-[10px] sm:text-sm text-yellow-300 uppercase flex items-center gap-2 font-bold">
          <span>⚔️ HERO ATTRIBUTES</span>
        </h3>
        <span className="font-silk text-[8px] sm:text-[10px] text-cyan-300 font-bold uppercase">WARRIOR STATUS</span>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <div className="flex items-center justify-between font-pixel text-[9px] sm:text-[10px] mb-1">
            <span className="text-rose-400 font-bold truncate">HP [CALORIES]</span>
            <span className="font-retro text-base sm:text-2xl text-rose-400 font-bold shrink-0 ml-1">
              {Math.round(currentCalories)} / {goals.calories} kcal
            </span>
          </div>
          {renderRetroSegments(currentCalories, goals.calories, palette.accentPink)}
        </div>

        <div>
          <div className="flex items-center justify-between font-pixel text-[9px] sm:text-[10px] mb-1">
            <span className="text-emerald-400 font-bold truncate">STR [PROTEIN]</span>
            <span className="font-retro text-base sm:text-2xl text-emerald-400 font-bold shrink-0 ml-1">
              {Math.round(currentProtein)}g / {goals.protein}g
            </span>
          </div>
          {renderRetroSegments(currentProtein, goals.protein, palette.accentGreen)}
        </div>

        <div>
          <div className="flex items-center justify-between font-pixel text-[9px] sm:text-[10px] mb-1">
            <span className="text-amber-400 font-bold truncate">DEX [CARBS]</span>
            <span className="font-retro text-base sm:text-2xl text-amber-400 font-bold shrink-0 ml-1">
              {Math.round(currentCarbs)}g / {goals.carbs}g
            </span>
          </div>
          {renderRetroSegments(currentCarbs, goals.carbs, palette.accentYellow)}
        </div>

        <div>
          <div className="flex items-center justify-between font-pixel text-[9px] sm:text-[10px] mb-1">
            <span className="text-orange-400 font-bold truncate">DEF [FATS]</span>
            <span className="font-retro text-base sm:text-2xl text-orange-400 font-bold shrink-0 ml-1">
              {Math.round(currentFat)}g / {goals.fat}g
            </span>
          </div>
          {renderRetroSegments(currentFat, goals.fat, palette.accentOrange)}
        </div>
      </div>
    </div>
  );
}

function SenseiCoach({ currentCalories, currentProtein, goals, palette }: any) {
  const [displayedText, setDisplayedText] = useState('');
  const [fullTargetText, setFullTargetText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const wisdomList = [
    "Feast on high-tier protein warrior! Grilled Chicken Breast or Salmon with White Rice grants maximum STR.",
    "Consume a Whey Protein Shake with a Banana or 170g Greek Yogurt for instant protein gains.",
    "Oats, sweet potatoes, and white rice provide pure mana to power your intense gym raids!",
    "Consistency is the true legendary weapon. Log every meal to maintain your streak!",
    "Balance your fats with avocados and olive oil to keep your armor defenses high!"
  ];

  useEffect(() => {
    generateBriefing();
  }, []);

  useEffect(() => {
    if (!fullTargetText) return;
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullTargetText.length) {
        setDisplayedText(fullTargetText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [fullTargetText]);

  const generateBriefing = () => {
    soundManager.playBlip();
    const calPct = goals.calories > 0 ? Math.round((currentCalories / goals.calories) * 100) : 0;
    const remainingCal = Math.max(0, goals.calories - currentCalories);
    const proPct = goals.protein > 0 ? Math.round((currentProtein / goals.protein) * 100) : 0;
    const remainingPro = Math.max(0, goals.protein - currentProtein);

    let text = `📜 Quest Briefing: Consumed ${Math.round(currentCalories)} / ${goals.calories} kcal (${calPct}%). `;
    text += `Protein at ${Math.round(currentProtein)}g / ${goals.protein}g (${proPct}%). `;
    if (remainingPro > 0) {
      text += `Need ${Math.round(remainingPro)}g more protein and ${remainingCal} kcal today!`;
    } else {
      text += `✨ Victory! Daily protein target completely conquered!`;
    }
    setFullTargetText(text);
  };

  const getSenseiWisdom = () => {
    soundManager.playBlip();
    const randomTip = wisdomList[Math.floor(Math.random() * wisdomList.length)];
    setFullTargetText(`🧙‍♂️ Sensei Wisdom: "${randomTip}"`);
  };

  const handleAskAiSensei = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim() || isAiLoading) return;
    soundManager.playBlip();
    setIsAiLoading(true);
    setFullTargetText("🧙‍♂️ Sensei is reading the cosmic macro scrolls...");

    const advice = await queryGeminiSensei(userQuestion, currentCalories, currentProtein, goals);
    setIsAiLoading(false);
    setFullTargetText(advice);
    setUserQuestion('');
  };

  return (
    <section
      style={{ backgroundColor: palette.panelBg }}
      className="p-3.5 sm:p-6 border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col min-w-0"
    >
      <div className="flex items-center justify-between border-b-2 sm:border-b-4 border-black pb-2 sm:pb-3 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <IconBot className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 shrink-0" />
          <div className="min-w-0">
            <h3 className="font-pixel text-[10px] sm:text-sm text-yellow-300 uppercase font-bold truncate">
              AI SENSEI COACH
            </h3>
            <div className="font-mono text-[9px] sm:text-xs text-cyan-300 font-bold truncate">GEMINI POWERED</div>
          </div>
        </div>
        <button
          onClick={generateBriefing}
          className="pixel-btn bg-black text-white border border-black px-2 sm:px-2.5 py-1 text-[8px] sm:text-[9px] flex items-center gap-1 cursor-pointer font-bold hover:bg-yellow-400 hover:text-black shrink-0"
        >
          <IconRefreshCw className={`w-3.5 h-3.5 ${isTyping || isAiLoading ? 'animate-spin' : ''}`} />
          <span>REFRESH</span>
        </button>
      </div>

      <div
        style={{ backgroundColor: palette.subpanelBg }}
        className="p-2.5 sm:p-3.5 border-2 sm:border-4 border-black mb-3 flex items-start gap-3 shadow-[2px_2px_0px_0px_#000]"
      >
        <div className="flex flex-col items-center shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black border-2 border-pink-500 flex items-center justify-center text-xl sm:text-2xl">
            🧙‍♂️
          </div>
          <span className="font-pixel text-[8px] text-pink-400 font-bold mt-1">SENSEI</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm sm:text-lg text-white leading-relaxed min-h-[56px] sm:min-h-[64px] p-2 sm:p-2.5 bg-black border-2 border-black relative break-words">
            {displayedText ? (
              <span>"{displayedText}"</span>
            ) : (
              <span className="text-slate-400 italic text-sm sm:text-base">"Ask me anything about your macros or post-workout meals!"</span>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleAskAiSensei} className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Ask Sensei: e.g. What should I eat for dinner?"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          className="flex-1 bg-black border-2 border-black px-3 py-2 font-retro text-base sm:text-lg text-white font-bold focus:outline-none focus:border-yellow-400"
        />
        <button
          type="submit"
          disabled={isAiLoading}
          className="pixel-btn bg-cyan-600 text-white border-2 border-black px-3 sm:px-4 text-[9px] sm:text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:bg-cyan-500 shrink-0"
        >
          <IconSend className="w-3.5 h-3.5" />
          <span>ASK</span>
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={generateBriefing}
          className="flex-1 min-w-[110px] pixel-btn bg-pink-600 text-white border-2 border-black py-2 px-2 text-[9px] sm:text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-pink-500"
        >
          <IconScroll className="w-3.5 h-3.5 shrink-0" />
          <span>BRIEFING</span>
        </button>
        <button
          onClick={getSenseiWisdom}
          className="flex-1 min-w-[110px] pixel-btn bg-emerald-600 text-white border-2 border-black py-2 px-2 text-[9px] sm:text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-emerald-500"
        >
          <IconSparkles className="w-3.5 h-3.5 shrink-0" />
          <span>WISDOM</span>
        </button>
      </div>
    </section>
  );
}

function WeeklyHistoryChart({ history, goals, palette }: any) {
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = i === 0 ? 'TODAY' : d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    days.push({ dateStr, dayLabel, record: history[dateStr] });
  }

  return (
    <section
      style={{ backgroundColor: palette.panelBg }}
      className="p-3.5 sm:p-6 border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-0"
    >
      <div className="flex items-center justify-between border-b-2 sm:border-b-4 border-black pb-2 sm:pb-3 mb-3 sm:mb-4">
        <h3 className="font-pixel text-[10px] sm:text-sm text-yellow-300 font-bold uppercase flex items-center gap-2">
          <IconBarChart3 className="w-4 h-4 text-cyan-300 shrink-0" />
          <span>📜 7-DAY HISTORY</span>
        </h3>
        <span className="font-silk text-[8px] sm:text-[10px] text-cyan-300 font-bold uppercase">PAST 6D + TODAY</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-3 items-end h-28 sm:h-40 bg-black p-2 sm:p-3 border-2 sm:border-4 border-black">
        {days.map((dayItem, idx) => {
          const rec = dayItem.record;
          const calories = rec ? rec.calories : 0;
          const protein = rec ? rec.protein : 0;
          const heightPct = goals.calories > 0 ? Math.min(Math.round((calories / goals.calories) * 100), 100) : 0;
          const isTargetMet = protein >= goals.protein && calories > 0;

          return (
            <div key={dayItem.dateStr} className="flex flex-col items-center justify-end h-full w-full group relative">
              <div className="absolute -top-10 z-20 hidden group-hover:flex flex-col items-center bg-slate-900 border-2 border-black text-white p-1 text-[8px] sm:text-[9px] font-mono whitespace-nowrap shadow-md">
                <span>{calories} kcal</span>
                <span className="text-emerald-400">{protein}g P</span>
              </div>

              <div className="w-full bg-slate-900 border border-slate-800 h-full flex items-end">
                <div
                  style={{ height: `${Math.max(heightPct, calories > 0 ? 8 : 0)}%` }}
                  className={`w-full transition-all duration-500 ${isTargetMet ? 'bg-emerald-500' : calories > 0 ? 'bg-pink-500' : 'bg-transparent'}`}
                />
              </div>

              <span className={`font-pixel text-[7px] xs:text-[8px] sm:text-[9px] mt-1.5 sm:mt-2 font-bold truncate max-w-full ${idx === 6 ? 'text-yellow-300' : 'text-slate-400'}`}>
                {dayItem.dayLabel}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-slate-400 mt-2 flex-wrap gap-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 inline-block border border-black" /> Met</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-pink-500 inline-block border border-black" /> Active</span>
        </div>
        <span className="font-pixel text-[7px] sm:text-[8px] text-yellow-400">{goals.calories} KCAL / {goals.protein}G P</span>
      </div>
    </section>
  );
}

function DailyLogList({ meals, onDeleteMeal, onEditMeal, onDuplicateMeal, palette }: any) {
  const [expandedMealIds, setExpandedMealIds] = useState<Record<string, boolean>>({});

  return (
    <section
      style={{ backgroundColor: palette.panelBg }}
      className="p-3.5 sm:p-6 border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col min-w-0"
    >
      <div className="flex items-center justify-between border-b-2 sm:border-b-4 border-black pb-2 sm:pb-3 mb-3 sm:mb-4">
        <h2 className="text-[10px] sm:text-sm font-pixel font-bold uppercase text-rose-400 flex items-center gap-2">
          <IconUtensils className="w-4 h-4 text-rose-400 shrink-0" />
          <span>QUEST LOG ({meals.length})</span>
        </h2>
        <span className="font-silk text-[8px] sm:text-[10px] text-yellow-300 font-bold uppercase">ACTIVE INVENTORY</span>
      </div>

      {meals.length === 0 ? (
        <div className="p-4 sm:p-8 bg-black border-2 sm:border-4 border-black opacity-70 flex flex-col items-center justify-center min-h-[90px] border-dashed text-center">
          <span className="text-[9px] sm:text-[11px] uppercase font-pixel text-rose-400 font-bold">INVENTORY EMPTY</span>
          <span className="text-sm sm:text-base font-retro text-slate-300 mt-1">(Craft a meal to fuel your quest!)</span>
        </div>
      ) : (
        <div className="space-y-3">
          {meals.map((meal: any) => {
            const isExpanded = !!expandedMealIds[meal.id];
            return (
              <div key={meal.id} className="p-3 bg-black border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] min-w-0">
                <div className="flex items-center justify-between mb-1.5 gap-2 flex-wrap">
                  <span className="text-sm sm:text-base text-yellow-400 font-bold font-retro">
                    {meal.category.toUpperCase()} • {meal.totalGrams}g
                  </span>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <button
                      onClick={() => onDuplicateMeal(meal)}
                      className="pixel-btn bg-slate-800 text-white border border-black p-1.5 text-[8px] font-bold cursor-pointer hover:bg-emerald-600"
                      title="Eat again"
                    >
                      <IconCopy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onEditMeal(meal)}
                      className="pixel-btn bg-blue-600 text-white border border-black p-1.5 text-[8px] font-bold cursor-pointer hover:bg-blue-500"
                      title="Edit recipe"
                    >
                      <IconEdit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteMeal(meal.id)}
                      className="pixel-btn bg-rose-600 text-white border border-black p-1.5 text-[8px] font-bold cursor-pointer hover:bg-rose-500"
                      title="Discard meal"
                    >
                      <IconTrash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setExpandedMealIds((p: any) => ({ ...p, [meal.id]: !p[meal.id] }))}
                      className="pixel-btn bg-black text-white border border-black p-1.5 text-[8px] font-bold cursor-pointer"
                    >
                      {isExpanded ? <IconChevronUp className="w-3.5 h-3.5" /> : <IconChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-base sm:text-xl font-bold text-white font-mono break-words">
                  <span>{meal.ingredients[0]?.icon || '🍲'}</span>
                  <span className="truncate max-w-[200px] xs:max-w-[280px] sm:max-w-none">{meal.name}</span>
                </div>

                <div className="flex justify-between text-sm sm:text-lg font-retro mt-1.5 pt-1.5 border-t border-slate-800 gap-2 flex-wrap">
                  <span className="text-rose-400 font-bold">{meal.totalCalories} kcal</span>
                  <span className="text-emerald-400 font-bold">{meal.totalProtein}g P</span>
                  <span className="text-amber-400 font-bold">{meal.totalCarbs}g C</span>
                  <span className="text-orange-400 font-bold">{meal.totalFat}g F</span>
                </div>

                {isExpanded && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800 bg-slate-900 p-2 sm:p-2.5">
                    <div className="font-pixel text-[8px] sm:text-[9px] text-yellow-300 font-bold mb-1.5">INGREDIENTS BREAKDOWN:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {meal.ingredients.map((ing: any) => (
                        <div key={ing.id} className="flex items-center justify-between bg-black p-1.5 border border-black">
                          <span className="font-mono text-xs sm:text-sm text-white font-bold truncate">{ing.icon} {ing.name} ({ing.grams}g)</span>
                          <span className="font-mono text-xs sm:text-sm text-emerald-400 font-bold ml-1.5">{ing.calories} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function SavedMealTemplates({ templates, onLogTemplate, onDeleteTemplate, palette }: any) {
  return (
    <section
      style={{ backgroundColor: palette.panelBg }}
      className="p-3.5 sm:p-6 border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-0"
    >
      <div className="flex items-center justify-between border-b-2 sm:border-b-4 border-black pb-2 sm:pb-3 mb-3 sm:mb-4">
        <h3 className="font-pixel text-[10px] sm:text-sm text-yellow-300 font-bold uppercase flex items-center gap-2">
          <span>📖 RECIPE SPELLBOOK</span>
        </h3>
        <span className="font-silk text-[8px] sm:text-[10px] text-cyan-300 font-bold uppercase">1-CLICK CONSUME</span>
      </div>

      {templates.length === 0 ? (
        <div className="p-4 sm:p-6 bg-black border-2 sm:border-4 border-black text-center text-slate-400 font-mono text-xs sm:text-sm">
          No saved meal recipes yet. Check "Save Recipe to Spellbook" when crafting a custom meal!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {templates.map((template: any) => (
            <div key={template.id} className="p-2.5 sm:p-3 bg-black border-2 sm:border-4 border-black flex flex-col justify-between shadow-[2px_2px_0px_0px_#000] min-w-0">
              <div className="flex items-start justify-between gap-1.5 mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl sm:text-2xl shrink-0">{template.ingredients[0]?.icon || '🍲'}</span>
                  <div className="min-w-0">
                    <div className="font-mono text-sm sm:text-base font-bold text-white truncate">{template.name}</div>
                    <div className="font-retro text-sm text-slate-400">{template.ingredients.length} items ({template.totalGrams}g)</div>
                  </div>
                </div>
                <button onClick={() => onDeleteTemplate(template.id)} className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer shrink-0">
                  <IconTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-slate-800 gap-1.5">
                <div className="font-retro text-sm sm:text-base text-slate-300 flex gap-2">
                  <span className="text-rose-400 font-bold">{template.totalCalories} kcal</span>
                  <span className="text-emerald-400 font-bold">{template.totalProtein}g P</span>
                </div>
                <button
                  onClick={() => onLogTemplate(template)}
                  className="pixel-btn bg-emerald-600 text-white border border-black px-2.5 py-1 text-[8px] sm:text-[9px] font-bold flex items-center gap-1 cursor-pointer hover:bg-emerald-500 shrink-0"
                >
                  <IconZap className="w-3 h-3 fill-white" /> LOG
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function MealCreatorModal({
  isOpen,
  onClose,
  onSaveMeal,
  initialMeal,
  customFoods,
  deletedFoodIds = [],
  onAddCustomFood,
  onDeleteFood,
  palette
}: any) {
  const [mealName, setMealName] = useState(initialMeal?.name || '');
  const [category, setCategory] = useState(initialMeal?.category || 'lunch');
  const [ingredients, setIngredients] = useState(initialMeal?.ingredients || []);
  const [saveAsTemplate, setSaveAsTemplate] = useState(initialMeal?.isFavorite || false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeTab, setActiveTab] = useState('pantry');
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCategory, setNewFoodCategory] = useState('protein');
  const [newFoodIcon, setNewFoodIcon] = useState('🥩');
  const [newFoodCalories, setNewFoodCalories] = useState(150);
  const [newFoodProtein, setNewFoodProtein] = useState(20);
  const [newFoodCarbs, setNewFoodCarbs] = useState(5);
  const [newFoodFat, setNewFoodFat] = useState(3);

  useEffect(() => {
    if (isOpen) {
      setMealName(initialMeal?.name || '');
      setCategory(initialMeal?.category || 'lunch');
      setIngredients(initialMeal?.ingredients || []);
      setSaveAsTemplate(initialMeal?.isFavorite || false);
    }
  }, [isOpen, initialMeal]);

  if (!isOpen) return null;

  const allAvailableFoods = [
    ...DEFAULT_FOOD_ITEMS.filter((f) => !deletedFoodIds.includes(f.id)),
    ...customFoods,
  ];

  const totalGrams = ingredients.reduce((acc: number, curr: any) => acc + curr.grams, 0);
  const totalCalories = ingredients.reduce((acc: number, curr: any) => acc + curr.calories, 0);
  const totalProtein = Math.round(ingredients.reduce((acc: number, curr: any) => acc + curr.protein, 0) * 10) / 10;
  const totalCarbs = Math.round(ingredients.reduce((acc: number, curr: any) => acc + curr.carbs, 0) * 10) / 10;
  const totalFat = Math.round(ingredients.reduce((acc: number, curr: any) => acc + curr.fat, 0) * 10) / 10;

  const handleAddFoodToRecipe = (food: any) => {
    soundManager.playBlip();
    const defaultG = food.defaultGrams || 100;
    const ratio = defaultG / 100;
    const newIngredient = {
      id: 'ing-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      foodId: food.id,
      name: food.name,
      grams: defaultG,
      calories: Math.round(food.caloriesPer100g * ratio),
      protein: Math.round(food.proteinPer100g * ratio * 10) / 10,
      carbs: Math.round(food.carbsPer100g * ratio * 10) / 10,
      fat: Math.round(food.fatPer100g * ratio * 10) / 10,
      icon: food.icon,
      c100: food.caloriesPer100g,
      p100: food.proteinPer100g,
      carb100: food.carbsPer100g,
      f100: food.fatPer100g
    };
    setIngredients((prev: any[]) => [...prev, newIngredient]);
  };

  const handleUpdateGrams = (ingId: string, newGrams: number) => {
    const grams = Math.max(1, Number(newGrams) || 1);
    setIngredients((prev: any[]) => prev.map(ing => {
      if (ing.id !== ingId) return ing;
      const ratio = grams / 100;
      const c100 = ing.c100 || (ing.calories / ing.grams) * 100;
      const p100 = ing.p100 || (ing.protein / ing.grams) * 100;
      const carb100 = ing.carb100 || (ing.carbs / ing.grams) * 100;
      const f100 = ing.f100 || (ing.fat / ing.grams) * 100;

      return {
        ...ing,
        grams,
        calories: Math.round(c100 * ratio),
        protein: Math.round(p100 * ratio * 10) / 10,
        carbs: Math.round(carb100 * ratio * 10) / 10,
        fat: Math.round(f100 * ratio * 10) / 10
      };
    }));
  };

  const handleCreateNewCustomIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFoodName.trim()) return;
    soundManager.playLevelUp();

    const created = {
      id: 'custom-' + Date.now(),
      name: newFoodName.trim(),
      category: newFoodCategory,
      defaultGrams: 100,
      caloriesPer100g: Number(newFoodCalories) || 100,
      proteinPer100g: Number(newFoodProtein) || 0,
      carbsPer100g: Number(newFoodCarbs) || 0,
      fatPer100g: Number(newFoodFat) || 0,
      icon: newFoodIcon,
      isCustom: true
    };

    onAddCustomFood(created);
    handleAddFoodToRecipe(created);

    setNewFoodName('');
    setActiveTab('pantry');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.length === 0) return;
    soundManager.playEat();
    const finalMeal = {
      id: initialMeal?.id || 'meal-' + Date.now(),
      name: mealName.trim() || `Custom ${category.toUpperCase()} Plate`,
      category,
      ingredients,
      totalGrams,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      loggedAt: initialMeal?.loggedAt || new Date().toISOString(),
      isFavorite: saveAsTemplate
    };
    onSaveMeal(finalMeal, saveAsTemplate);
    onClose();
  };

  const filteredFoods = allAvailableFoods.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div
        style={{ backgroundColor: palette.panelBg, color: palette.textPrimary }}
        className="w-full max-w-5xl max-h-[96vh] sm:max-h-[94vh] flex flex-col border-4 sm:border-8 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-w-0"
      >
        <div
          style={{ backgroundColor: palette.headerBg }}
          className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 border-b-4 sm:border-b-8 border-black shrink-0"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <IconChefHat className="w-6 h-6 sm:w-7 sm:h-7 text-white shrink-0" />
            <h2 className="text-xs sm:text-base font-bold font-pixel uppercase text-white truncate">CRAFT CUSTOM MEAL</h2>
          </div>
          <button onClick={onClose} className="pixel-btn bg-rose-600 text-white border border-black px-2.5 sm:px-3 py-1.5 text-[9px] sm:text-xs font-bold cursor-pointer shrink-0">
            <IconX className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-w-0">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 min-w-0">
            <div
              style={{ backgroundColor: palette.subpanelBg }}
              className="space-y-2.5 sm:space-y-3 p-3 sm:p-4 border-2 sm:border-4 border-black"
            >
              <div>
                <label className="block text-[9px] sm:text-[10px] uppercase font-pixel font-bold text-yellow-300 mb-1">MEAL TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. High Protein Chicken Bowl"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="w-full bg-black border-2 sm:border-4 border-black p-2 sm:p-2.5 text-lg sm:text-xl font-retro text-white font-bold"
                />
              </div>

              <div className="flex items-center justify-between bg-black border-2 border-black p-2 sm:p-2.5 flex-wrap gap-1.5">
                <label className="flex items-center gap-2 cursor-pointer font-pixel text-[9px] sm:text-[10px] text-yellow-300 font-bold">
                  <input
                    type="checkbox"
                    checked={saveAsTemplate}
                    onChange={(e) => setSaveAsTemplate(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                  <span>SAVE RECIPE TO SPELLBOOK</span>
                </label>
                <span className="font-retro text-sm text-slate-400 hidden xs:inline">(Reusable template)</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
                <div className="bg-black p-2 text-center border border-black">
                  <div className="text-[8px] sm:text-[10px] uppercase text-emerald-400 font-pixel font-bold">Protein</div>
                  <div className="text-lg sm:text-xl font-retro font-bold text-white">{totalProtein}g</div>
                </div>
                <div className="bg-black p-2 text-center border border-black">
                  <div className="text-[8px] sm:text-[10px] uppercase text-amber-400 font-pixel font-bold">Carbs</div>
                  <div className="text-lg sm:text-xl font-retro font-bold text-white">{totalCarbs}g</div>
                </div>
                <div className="bg-black p-2 text-center border border-black">
                  <div className="text-[8px] sm:text-[10px] uppercase text-orange-400 font-pixel font-bold">Fats</div>
                  <div className="text-lg sm:text-xl font-retro font-bold text-white">{totalFat}g</div>
                </div>
              </div>
            </div>

            <div className="bg-black border-2 sm:border-4 border-black p-3 sm:p-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="font-pixel text-[10px] sm:text-xs text-yellow-300 font-bold">ITEMS ({ingredients.length})</span>
                <span className="font-retro text-base sm:text-lg text-rose-400 font-bold">{totalCalories} kcal Total</span>
              </div>
              <div className="space-y-2 max-h-[180px] sm:max-h-[220px] overflow-y-auto">
                {ingredients.length === 0 ? (
                  <div className="text-slate-500 font-mono text-sm text-center py-4">Add items from pantry below...</div>
                ) : (
                  ingredients.map((ing: any) => (
                    <div key={ing.id} className="p-2 sm:p-2.5 bg-slate-900 border border-black flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="font-mono text-sm text-white font-bold truncate block">{ing.icon} {ing.name}</span>
                        <span className="font-retro text-sm text-emerald-400 font-bold">{ing.calories} kcal | {ing.protein}g P</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleUpdateGrams(ing.id, ing.grams - 10)}
                          className="pixel-btn bg-slate-800 text-white w-7 h-7 flex items-center justify-center p-0"
                        >
                          <IconMinus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          value={ing.grams}
                          onChange={(e) => handleUpdateGrams(ing.id, Number(e.target.value))}
                          className="w-14 bg-black border border-black text-center font-retro text-base text-yellow-300 font-bold py-0.5"
                        />
                        <span className="text-sm font-retro text-slate-400 font-bold">g</span>
                        <button
                          onClick={() => handleUpdateGrams(ing.id, ing.grams + 10)}
                          className="pixel-btn bg-slate-800 text-white w-7 h-7 flex items-center justify-center p-0"
                        >
                          <IconPlus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setIngredients((prev: any[]) => prev.filter(i => i.id !== ing.id))}
                          className="pixel-btn bg-rose-600 text-white p-1.5 ml-1"
                        >
                          <IconTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-600 border-3 sm:border-4 border-black p-3 sm:p-3.5 text-[10px] sm:text-xs font-bold uppercase hover:bg-emerald-500 text-white font-pixel cursor-pointer transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              LOG MEAL (+50 XP)
            </button>
          </div>

          <div className="lg:col-span-5 space-y-3 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-pixel text-[9px] sm:text-[10px] text-yellow-300 font-bold uppercase truncate">PANTRY</span>
              <div className="flex border-2 border-black shrink-0">
                <button
                  onClick={() => setActiveTab('pantry')}
                  className={`px-2 py-1 text-[8px] font-bold font-pixel cursor-pointer ${activeTab === 'pantry' ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}
                >
                  PANTRY
                </button>
                <button
                  onClick={() => setActiveTab('new_ingredient')}
                  className={`px-2 py-1 text-[8px] font-bold font-pixel flex items-center gap-1 cursor-pointer ${activeTab === 'new_ingredient' ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}
                >
                  <IconPlus className="w-3 h-3 text-emerald-400" />
                  <span>+ CUSTOM</span>
                </button>
              </div>
            </div>

            {activeTab === 'pantry' ? (
              <>
                <div className="flex items-center bg-black border-2 sm:border-4 border-black px-2 py-1 sm:py-1.5">
                  <IconSearch className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search pantry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent font-retro text-base sm:text-lg text-white font-bold focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-[260px] sm:max-h-[350px] overflow-y-auto">
                  {filteredFoods.map((food: any) => (
                    <div key={food.id} className="p-2 sm:p-2.5 bg-black border border-black flex items-center justify-between">
                      <div className="min-w-0 pr-1.5">
                        <div className="font-mono text-sm text-white font-bold truncate">{food.icon} {food.name}</div>
                        <div className="font-retro text-sm text-slate-400">{food.caloriesPer100g} kcal/100g ({food.proteinPer100g}g P)</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => onDeleteFood(food.id, food.isCustom)} className="pixel-btn bg-rose-600 text-white border border-black p-1.5 cursor-pointer">
                          <IconTrash2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleAddFoodToRecipe(food)} className="pixel-btn bg-emerald-600 text-white border border-black p-1.5 cursor-pointer hover:bg-emerald-500">
                          <IconPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleCreateNewCustomIngredient} className="bg-black border-2 sm:border-4 border-black p-3 sm:p-4 space-y-3">
                <div className="font-pixel text-[9px] sm:text-[10px] text-yellow-300 font-bold uppercase">CREATE INGREDIENT</div>

                <div>
                  <label className="block text-[8px] sm:text-[9px] font-pixel text-slate-300 mb-1">NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Protein Bar, Milk"
                    value={newFoodName}
                    onChange={(e) => setNewFoodName(e.target.value)}
                    className="w-full bg-slate-900 border-2 border-black p-1.5 font-retro text-base sm:text-lg text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[8px] sm:text-[9px] font-pixel text-slate-300 mb-1">SELECT EMOJI ICON</label>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl p-1.5 bg-slate-900 border-2 border-black">{newFoodIcon}</span>
                    <input
                      type="text"
                      maxLength={2}
                      value={newFoodIcon}
                      onChange={(e) => setNewFoodIcon(e.target.value)}
                      className="w-14 bg-slate-900 border-2 border-black p-1 text-center text-lg text-white"
                    />
                  </div>
                  <div className="grid grid-cols-6 xs:grid-cols-8 gap-1 max-h-[70px] overflow-y-auto p-1.5 bg-slate-900 border-2 border-black">
                    {POPULAR_FOOD_EMOJIS.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setNewFoodIcon(emoji)}
                        className={`text-base p-1 hover:bg-yellow-400 hover:text-black rounded cursor-pointer ${newFoodIcon === emoji ? 'bg-yellow-400' : ''}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[8px] font-pixel text-rose-400">KCAL / 100G</label>
                    <input
                      type="number"
                      value={newFoodCalories}
                      onChange={(e) => setNewFoodCalories(Number(e.target.value))}
                      className="w-full bg-slate-900 border-2 border-black p-1 font-retro text-base text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-pixel text-emerald-400">PROTEIN (G)</label>
                    <input
                      type="number"
                      value={newFoodProtein}
                      onChange={(e) => setNewFoodProtein(Number(e.target.value))}
                      className="w-full bg-slate-900 border-2 border-black p-1 font-retro text-base text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-pixel text-amber-400">CARBS (G)</label>
                    <input
                      type="number"
                      value={newFoodCarbs}
                      onChange={(e) => setNewFoodCarbs(Number(e.target.value))}
                      className="w-full bg-slate-900 border-2 border-black p-1 font-retro text-base text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-pixel text-orange-400">FAT (G)</label>
                    <input
                      type="number"
                      value={newFoodFat}
                      onChange={(e) => setNewFoodFat(Number(e.target.value))}
                      className="w-full bg-slate-900 border-2 border-black p-1 font-retro text-base text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full pixel-btn bg-emerald-600 text-white py-2 text-[9px] font-bold cursor-pointer hover:bg-emerald-500"
                >
                  + SAVE & ADD TO MEAL
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MacroCalculatorModal({ isOpen, onClose, onApplyGoals, palette }: any) {
  const [weightKg, setWeightKg] = useState(75);
  const [goalType, setGoalType] = useState('maintain');
  const [activityLevel] = useState(1.4);

  if (!isOpen) return null;

  const calcBmr = Math.round(weightKg * 22);
  const tdee = Math.round(calcBmr * activityLevel);

  let targetCal = tdee;
  if (goalType === 'cut') targetCal = Math.round(tdee * 0.8);
  if (goalType === 'bulk') targetCal = Math.round(tdee * 1.15);

  const recProtein = Math.round(weightKg * 2.2);
  const recFat = Math.round(weightKg * 0.9);
  const recCarbs = Math.max(50, Math.round((targetCal - (recProtein * 4 + recFat * 9)) / 4));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div
        style={{ backgroundColor: palette.panelBg, color: palette.textPrimary }}
        className="w-full max-w-lg border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4"
      >
        <div className="flex items-center justify-between border-b-2 border-black pb-2.5">
          <div className="flex items-center gap-2">
            <IconCalculator className="w-5 h-5 text-yellow-300" />
            <h2 className="font-pixel text-xs sm:text-sm text-yellow-300 uppercase font-bold">MACRO WIZARD</h2>
          </div>
          <button onClick={onClose} className="pixel-btn bg-rose-600 text-white px-2.5 py-1 text-xs">
            <IconX className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 font-retro text-xl">
          <div>
            <label className="block font-pixel text-[9px] text-amber-300 mb-1">BODY WEIGHT (KG)</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full bg-black border-2 border-black p-2 text-white font-bold"
            />
          </div>

          <div>
            <label className="block font-pixel text-[9px] text-amber-300 mb-1">QUEST GOAL</label>
            <div className="grid grid-cols-3 gap-1.5">
              {['cut', 'maintain', 'bulk'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setGoalType(type)}
                  className={`pixel-btn py-1.5 uppercase text-[9px] ${goalType === type ? 'bg-yellow-400 text-black font-bold' : 'bg-black text-white'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black p-3.5 border-2 border-black space-y-1.5">
            <div className="font-pixel text-[9px] text-emerald-400">RECOMMENDED TARGETS:</div>
            <div className="flex justify-between text-white font-bold">
              <span>ENERGY: <span className="text-rose-400">{targetCal} kcal</span></span>
              <span>PROTEIN: <span className="text-emerald-400">{recProtein}g</span></span>
            </div>
            <div className="flex justify-between text-white font-bold">
              <span>CARBS: <span className="text-amber-400">{recCarbs}g</span></span>
              <span>FAT: <span className="text-orange-400">{recFat}g</span></span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onApplyGoals({ calories: targetCal, protein: recProtein, carbs: recCarbs, fat: recFat });
            onClose();
          }}
          className="w-full pixel-btn bg-emerald-600 text-white py-2.5 text-xs font-bold"
        >
          APPLY WIZARD TARGETS
        </button>
      </div>
    </div>
  );
}
