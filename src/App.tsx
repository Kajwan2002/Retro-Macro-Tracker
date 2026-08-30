import React, { useState, useEffect } from 'react';
import {
  Flame,
  Volume2,
  VolumeX,
  Monitor,
  Sparkles,
  Bot,
  Scroll,
  Utensils,
  RefreshCw,
  Settings2,
  Check,
  Zap,
  Plus,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronUp,
  Copy,
  ChefHat,
  Search,
  X,
  Palette,
  Award,
  BarChart3
} from 'lucide-react';

export type FoodCategory = 'protein' | 'carbs' | 'fats' | 'veggies' | 'dairy' | 'custom' | 'other';
export type MealTimeSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'potion';
export type RetroTheme = 'blue' | 'pink';

export interface ThemePalette {
  bgMain: string;
  panelBg: string;
  headerBg: string;
  subpanelBg: string;
  borderSubtle: string;
  textPrimary: string;
  textMuted: string;
  accentPink: string;
  accentGreen: string;
  accentCyan: string;
  accentYellow: string;
  accentOrange: string;
}

export const THEME_PALETTES: Record<RetroTheme, ThemePalette> = {
  blue: {
    bgMain: '#12101e',
    panelBg: '#16213e',
    headerBg: '#0f3460',
    subpanelBg: '#0a1128',
    borderSubtle: '#0f3460',
    textPrimary: '#f0f0f0',
    textMuted: '#94a3b8',
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
    textMuted: '#e4a7d6',
    accentPink: '#ff3377',
    accentGreen: '#4ecca3',
    accentCyan: '#38bdf8',
    accentYellow: '#facc15',
    accentOrange: '#fb923c'
  }
};

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  defaultGrams: number;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  icon: string;
  isCustom?: boolean;
}

export interface MealIngredient {
  id: string;
  foodId?: string;
  name: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  icon?: string;
}

export interface CustomMeal {
  id: string;
  name: string;
  category: MealTimeSlot;
  ingredients: MealIngredient[];
  totalGrams: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  loggedAt: string; // ISO String timestamp
  isFavorite?: boolean;
}

export interface DailyHistoryRecord {
  dateStr: string; // YYYY-MM-DD
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealCount: number;
}

export interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  rankTitle: string;
  totalMealsLogged: number;
}

class SoundManager {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playBlip() {
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

  public playEat() {
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

  public playCoin() {
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

  public playLevelUp() {
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

  public playTrash() {
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

export const CATEGORY_DEFAULT_ICONS: Record<string, string> = {
  protein: '🥩',
  carbs: '🍚',
  fats: '🥑',
  veggies: '🥦',
  dairy: '🧀',
  other: '🥣',
  custom: '🧪'
};

export const POPULAR_FOOD_EMOJIS = [
  '🥩', '🍗', '🍳', '🐟', '🍤', '🥛', '🧀', '🥓',
  '🍚', '🍞', '🥔', '🍠', '🍌', '🍎', '🫐', '🌾',
  '🥑', '🧈', '🥜', '🌰', '🥦', '🥬', '🥕', '🥒',
  '🍅', '🌽', '🥗', '🍕', '🍔', '🌮', '🥟', '🥤',
  '🥞', '🧇', '🍦', '🍩', '🍫', '🧃', '🫒', '🥣'
];

export const DEFAULT_FOOD_ITEMS: FoodItem[] = [
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

export const INITIAL_SAVED_MEALS: CustomMeal[] = [
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
  }
];

const STORAGE_KEYS = {
  MEALS: 'retro_macro_meals_v10',
  GOALS: 'retro_macro_goals_v10',
  TEMPLATES: 'retro_macro_templates_v10',
  STATS: 'retro_macro_stats_v10',
  SCANLINES: 'retro_macro_scanlines_v10',
  MUTED: 'retro_macro_muted_v10',
  THEME: 'retro_macro_theme_v10',
  CUSTOM_FOODS: 'retro_macro_custom_foods_v10',
  DELETED_FOOD_IDS: 'retro_macro_deleted_ids_v10',
  HISTORY: 'retro_macro_history_v10'
};

const DEFAULT_GOALS: DailyGoals = {
  calories: 2400,
  protein: 160,
  carbs: 250,
  fat: 70
};

const getTodayDateStr = () => new Date().toISOString().split('T')[0];

const DEFAULT_STATS: UserStats = {
  level: 0,
  xp: 0,
  xpToNextLevel: 100,
  streakDays: 0,
  lastActiveDate: getTodayDateStr(),
  rankTitle: 'Novice Initiate',
  totalMealsLogged: 0
};

export default function App() {
  const [theme, setTheme] = useState<RetroTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved === 'pink' ? 'pink' : 'blue';
    } catch {
      return 'blue';
    }
  });

  const activePalette = THEME_PALETTES[theme];

  const [meals, setMeals] = useState<CustomMeal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEALS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [goals, setGoals] = useState<DailyGoals>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
      return saved ? JSON.parse(saved) : DEFAULT_GOALS;
    } catch {
      return DEFAULT_GOALS;
    }
  });

  const [templates, setTemplates] = useState<CustomMeal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
      return saved ? JSON.parse(saved) : INITIAL_SAVED_MEALS;
    } catch {
      return INITIAL_SAVED_MEALS;
    }
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [history, setHistory] = useState<Record<string, DailyHistoryRecord>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCANLINES);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MUTED);
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [customFoods, setCustomFoods] = useState<FoodItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deletedFoodIds, setDeletedFoodIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DELETED_FOOD_IDS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<CustomMeal | null>(null);
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    soundManager.muted = isMuted;
    localStorage.setItem(STORAGE_KEYS.MUTED, JSON.stringify(isMuted));
  }, [isMuted]);

  // Dynamic Daily Totals
  const currentCalories = meals.reduce((acc, m) => acc + m.totalCalories, 0);
  const currentProtein = meals.reduce((acc, m) => acc + m.totalProtein, 0);
  const currentCarbs = meals.reduce((acc, m) => acc + m.totalCarbs, 0);
  const currentFat = meals.reduce((acc, m) => acc + m.totalFat, 0);

  // Sync today's history automatically when meals change
  useEffect(() => {
    const todayStr = getTodayDateStr();
    setHistory(prev => ({
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

  // Persist State
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals)); }, [meals]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates)); }, [templates]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(userStats)); }, [userStats]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.THEME, theme); }, [theme]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SCANLINES, JSON.stringify(scanlinesEnabled)); }, [scanlinesEnabled]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(customFoods)); }, [customFoods]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.DELETED_FOOD_IDS, JSON.stringify(deletedFoodIds)); }, [deletedFoodIds]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history)); }, [history]);

  // Dynamic Streak Calculation
  const checkAndUpdateStreak = () => {
    const todayStr = getTodayDateStr();
    const lastActive = userStats.lastActiveDate;

    if (lastActive === todayStr) return; // Already logged today

    const todayDate = new Date(todayStr);
    const lastDate = new Date(lastActive);
    const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    setUserStats(prev => {
      let newStreak = prev.streakDays;
      if (diffDays === 1) {
        newStreak = newStreak === 0 ? 1 : newStreak + 1;
        showToast(`🔥 STREAK INCREASED! ${newStreak} Days Active!`);
      } else if (diffDays > 1) {
        newStreak = 1;
        showToast(`⚡ Streak Reset. Welcome back on your macro quest!`);
      }
      return {
        ...prev,
        streakDays: newStreak,
        lastActiveDate: todayStr
      };
    });
  };

  const addXP = (amount: number) => {
    checkAndUpdateStreak();
    setUserStats(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNextLevel;

      if (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel += 1;
        newXPToNext = Math.round(newXPToNext * 1.4);
        soundManager.playLevelUp();
        showToast(`LEVEL UP! Reached Level ${newLevel}!`);
      }

      const titles = [
        'Novice Initiate',
        'Apprentice Cook',
        'Sous Chef',
        'Elite Chef',
        'Master Alchemist',
        'Macro Berserker',
        'Protein Paladin',
        'Grand Guild Master'
      ];
      const rankTitle = titles[Math.min(newLevel, titles.length - 1)];

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext,
        rankTitle,
        totalMealsLogged: prev.totalMealsLogged + 1,
        streakDays: prev.streakDays === 0 ? 1 : prev.streakDays
      };
    });
  };

  const handleSaveMeal = (meal: CustomMeal, saveAsTemplate: boolean) => {
    if (editingMeal) {
      setMeals(prev => prev.map(m => (m.id === meal.id ? meal : m)));
      setEditingMeal(null);
      showToast('Meal recipe updated!');
    } else {
      setMeals(prev => [...prev, meal]);
      addXP(50);
      showToast(`Logged "${meal.name}" (+50 XP)`);
    }

    if (saveAsTemplate) {
      setTemplates(prev => {
        const exists = prev.some(t => t.name.toLowerCase() === meal.name.toLowerCase());
        if (exists) return prev;
        return [...prev, meal];
      });
    }
  };

  const handleDeleteMeal = (id: string) => {
    soundManager.playTrash();
    setMeals(prev => prev.filter(m => m.id !== id));
    showToast('Meal discarded.');
  };

  const handleDuplicateMeal = (meal: CustomMeal) => {
    soundManager.playEat();
    const duplicated: CustomMeal = {
      ...meal,
      id: 'meal-' + Date.now(),
      loggedAt: new Date().toISOString()
    };
    setMeals(prev => [...prev, duplicated]);
    addXP(30);
    showToast(`Re-logged "${meal.name}" (+30 XP)`);
  };

  const handleLogTemplate = (template: CustomMeal) => {
    soundManager.playEat();
    const logged: CustomMeal = {
      ...template,
      id: 'meal-' + Date.now(),
      loggedAt: new Date().toISOString()
    };
    setMeals(prev => [...prev, logged]);
    addXP(40);
    showToast(`Logged "${template.name}" (+40 XP)`);
  };

  return (
    <div
      style={{ backgroundColor: activePalette.bgMain, color: activePalette.textPrimary, fontFamily: "'VT323', monospace" }}
      className="min-h-screen flex flex-col select-none transition-colors duration-300 relative text-lg"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&display=swap');
        
        .font-pixel { font-family: 'Press Start 2P', monospace; }
        .font-silk { font-family: 'Silkscreen', monospace; }
        .font-retro { font-family: 'VT323', monospace; }

        .crt-scanlines {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 9999;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.4) 50%
          ), linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.03),
            rgba(0, 255, 0, 0.01),
            rgba(0, 0, 255, 0.03)
          );
          background-size: 100% 4px, 6px 100%;
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.7);
        }

        .pixel-btn {
          font-family: 'Press Start 2P', monospace;
          font-size: 10px;
          line-height: 1.2;
          border: 3px solid #000;
          box-shadow: 3px 3px 0px 0px #000;
          transition: transform 0.05s ease, box-shadow 0.05s ease;
          cursor: pointer;
          user-select: none;
        }
        .pixel-btn:hover { filter: brightness(1.15); }
        .pixel-btn:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0px 0px #000; }
      `}</style>

      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-pixel text-xs flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {scanlinesEnabled && <div className="crt-scanlines" />}

      <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 flex-1 flex flex-col">
        <div
          style={{ backgroundColor: activePalette.bgMain }}
          className="border-4 sm:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col"
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
          />

          <div className="px-3 sm:px-8 mb-6 flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={() => {
                soundManager.playBlip();
                setEditingMeal(null);
                setIsMealModalOpen(true);
              }}
              className="bg-emerald-600 border-4 border-black text-white hover:bg-emerald-500 active:translate-y-1 py-3.5 px-6 font-bold uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3 font-pixel text-xs cursor-pointer"
            >
              <ChefHat className="w-5 h-5 text-yellow-300" />
              <span>Craft Meal +</span>
            </button>

            <div className="font-pixel text-[10px] text-yellow-400 bg-black p-2.5 border-2 border-black flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>TOTAL MEALS LOGGED: {userStats.totalMealsLogged}</span>
            </div>
          </div>

          <main className="flex-1 px-2 sm:px-8 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-6 flex flex-col">
              <CircularGaugeSlider
                currentCalories={currentCalories}
                currentProtein={currentProtein}
                goals={goals}
                onUpdateGoals={setGoals}
                isEditingGoals={isEditingGoals}
                setIsEditingGoals={setIsEditingGoals}
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

            <div className="lg:col-span-7 space-y-6 flex flex-col">
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
                onEditMeal={(meal) => {
                  setEditingMeal(meal);
                  setIsMealModalOpen(true);
                }}
                onDuplicateMeal={handleDuplicateMeal}
                palette={activePalette}
              />
              <SavedMealTemplates
                templates={templates}
                onLogTemplate={handleLogTemplate}
                onDeleteTemplate={(id) => setTemplates(prev => prev.filter(t => t.id !== id))}
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
        onAddCustomFood={(food) => setCustomFoods(prev => [food, ...prev])}
        onDeleteFood={(id, isCustom) => {
          if (isCustom) {
            setCustomFoods(prev => prev.filter(f => f.id !== id));
          } else {
            setDeletedFoodIds(prev => (prev.includes(id) ? prev : [...prev, id]));
          }
        }}
        onRestoreDefaultFoods={() => setDeletedFoodIds([])}
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
  palette
}: {
  theme: RetroTheme;
  onThemeChange: (t: RetroTheme) => void;
  scanlinesEnabled: boolean;
  onToggleScanlines: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  userStats: UserStats;
  palette: ThemePalette;
}) {
  const xpPercent = Math.min(Math.round((userStats.xp / userStats.xpToNextLevel) * 100), 100);

  return (
    <header
      style={{ backgroundColor: palette.headerBg }}
      className="flex flex-col lg:flex-row lg:items-center justify-between px-4 sm:px-8 py-4 border-b-8 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 gap-4"
    >
      <div>
        <h1 className="text-xl sm:text-3xl font-pixel font-bold uppercase text-white tracking-tight">
          MACRO QUEST
        </h1>
        <div className="font-silk text-[10px] sm:text-xs text-cyan-300 font-bold mt-1">
          CUSTOM MEALS FORGE • RPG NUTRITION
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-6 justify-between lg:justify-end w-full lg:w-auto">
        <div className="flex items-center gap-2 sm:gap-3 bg-black/60 p-2 border-2 border-black">
          <div className="flex flex-col items-start sm:items-end shrink-0">
            <span className="text-[9px] uppercase text-pink-400 font-pixel font-bold">PLAYER RANK</span>
            <span className="text-base sm:text-lg font-retro text-white uppercase tracking-wider font-bold">
              {userStats.rankTitle} LVL {userStats.level}
            </span>
          </div>
          <div className="w-20 sm:w-36 h-5 sm:h-6 bg-black border-2 border-white p-0.5 shrink-0">
            <div style={{ width: `${xpPercent}%` }} className="h-full bg-emerald-500 transition-all duration-300" />
          </div>
          <div className="bg-black/80 border-2 border-pink-500 px-1.5 sm:px-2 py-0.5 sm:py-1 flex items-center gap-1 shrink-0">
            <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span className="font-pixel text-[10px] text-pink-400 font-bold">{userStats.streakDays}D STREAK</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-black border-2 border-black px-2 py-1">
            <Palette className="w-3.5 h-3.5 text-yellow-400 mr-1.5" />
            <select
              value={theme}
              onChange={(e) => {
                soundManager.playBlip();
                onThemeChange(e.target.value as RetroTheme);
              }}
              className="bg-transparent text-yellow-400 font-retro text-lg font-bold focus:outline-none cursor-pointer"
            >
              <option value="blue" className="bg-[#1a1a2e] text-white">👾 Arcade Blue</option>
              <option value="pink" className="bg-[#3d1b3b] text-[#ff80bf]">🌸 Cute Pink</option>
            </select>
          </div>

          <button
            onClick={() => { soundManager.playBlip(); onToggleScanlines(); }}
            className={`pixel-btn px-2.5 py-1.5 text-[9px] flex items-center gap-1 cursor-pointer ${scanlinesEnabled ? 'bg-cyan-600 text-white' : 'bg-black text-slate-400'}`}
          >
            <Monitor className="w-3 h-3" />
            <span className="hidden sm:inline">CRT</span>
          </button>
          <button
            onClick={() => { onToggleMute(); soundManager.playBlip(); }}
            className={`pixel-btn px-2.5 py-1.5 text-[9px] flex items-center gap-1 cursor-pointer ${!isMuted ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}
          >
            {!isMuted ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3 text-white" />}
            <span className="hidden sm:inline">{!isMuted ? 'SFX ON' : 'MUTED'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function CircularGaugeSlider({
  currentCalories,
  currentProtein,
  goals,
  onUpdateGoals,
  isEditingGoals,
  setIsEditingGoals,
  palette
}: {
  currentCalories: number;
  currentProtein: number;
  goals: DailyGoals;
  onUpdateGoals: (g: DailyGoals) => void;
  isEditingGoals: boolean;
  setIsEditingGoals: (b: boolean) => void;
  palette: ThemePalette;
}) {
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
      className="p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative flex flex-col items-center justify-center select-none"
    >
      <div className="w-full flex items-center justify-between border-b-4 border-black pb-3 mb-4">
        <h2 className="text-xs sm:text-sm font-pixel font-bold uppercase text-yellow-300">
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
          className="pixel-btn bg-black text-yellow-400 px-3 py-1.5 text-[9px] flex items-center gap-1.5 border-2 border-black cursor-pointer font-bold hover:bg-yellow-400 hover:text-black"
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>{isEditingGoals ? 'CLOSE' : 'TARGETS'}</span>
        </button>
      </div>

      {isEditingGoals && (
        <div
          style={{ backgroundColor: palette.subpanelBg }}
          className="w-full border-4 border-black p-4 mb-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-pixel text-[10px] text-yellow-300 uppercase font-bold">MANUAL TARGET CALIBRATION</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-[10px] uppercase text-rose-400 font-pixel mb-1 font-bold">ENERGY (KCAL)</label>
              <input
                type="number"
                min="500"
                max="10000"
                value={tempCalories}
                onChange={(e) => setTempCalories(Number(e.target.value))}
                className="w-full bg-black border-4 border-black p-2 text-2xl font-retro text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-emerald-400 font-pixel mb-1 font-bold">PROTEIN (G)</label>
              <input
                type="number"
                min="10"
                max="500"
                value={tempProtein}
                onChange={(e) => setTempProtein(Number(e.target.value))}
                className="w-full bg-black border-4 border-black p-2 text-2xl font-retro text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-amber-400 font-pixel mb-1 font-bold">CARBS (G)</label>
              <input
                type="number"
                min="0"
                max="1000"
                value={tempCarbs}
                onChange={(e) => setTempCarbs(Number(e.target.value))}
                className="w-full bg-black border-4 border-black p-2 text-2xl font-retro text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-orange-400 font-pixel mb-1 font-bold">FATS (G)</label>
              <input
                type="number"
                min="0"
                max="500"
                value={tempFat}
                onChange={(e) => setTempFat(Number(e.target.value))}
                className="w-full bg-black border-4 border-black p-2 text-2xl font-retro text-white font-bold"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditingGoals(false)}
              className="pixel-btn bg-black text-slate-300 px-3 py-1 text-[9px] cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={() => {
                soundManager.playCoin();
                onUpdateGoals({ calories: tempCalories, protein: tempProtein, carbs: tempCarbs, fat: tempFat });
                setIsEditingGoals(false);
              }}
              className="pixel-btn bg-emerald-600 text-white font-bold px-4 py-1 text-[9px] flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> LOCK TARGETS
            </button>
          </div>
        </div>
      )}

      <div className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 max-w-full flex items-center justify-center my-2">
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

        <div className="text-center z-10 max-w-[150px] px-1 flex flex-col items-center justify-center">
          <div className="text-3xl sm:text-4xl font-bold font-retro text-white leading-none">
            {remainingCalories.toLocaleString()}
          </div>
          <div className="text-[8px] uppercase tracking-wider text-rose-400 font-pixel font-bold mt-1">
            KCAL LEFT
          </div>
          <div className="w-10 h-[2px] bg-slate-700 my-1.5" />
          <div className="text-base sm:text-lg font-bold font-retro text-emerald-400 leading-none whitespace-nowrap">
            {Math.round(currentProtein)}g / {goals.protein}g
          </div>
          <div className="text-[8px] uppercase tracking-wider text-emerald-400 font-pixel font-bold mt-0.5 whitespace-nowrap">
            PROTEIN ({proPercent}%)
          </div>
        </div>
      </div>
    </section>
  );
}

function MacroBreakdownBar({
  currentCalories,
  currentProtein,
  currentCarbs,
  currentFat,
  goals,
  palette
}: {
  currentCalories: number;
  currentProtein: number;
  currentCarbs: number;
  currentFat: number;
  goals: DailyGoals;
  palette: ThemePalette;
}) {
  const renderRetroSegments = (current: number, target: number, colorHex: string) => {
    const totalBlocks = 16;
    const filledBlocks = target > 0 ? Math.min(Math.round((current / target) * totalBlocks), totalBlocks) : 0;
    const isOver = current > target;
    return (
      <div className="flex items-center gap-[3px] bg-black p-1.5 border-2 border-black">
        {Array.from({ length: totalBlocks }).map((_, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: idx < filledBlocks ? (isOver ? '#ef4444' : colorHex) : palette.subpanelBg }}
            className="h-3 flex-1 transition-all duration-300"
          />
        ))}
      </div>
    );
  };

  return (
    <div
      style={{ backgroundColor: palette.panelBg }}
      className="p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4">
        <h3 className="font-pixel text-xs sm:text-sm text-yellow-300 uppercase flex items-center gap-2 font-bold">
          <span>⚔️ HERO ATTRIBUTE STATS</span>
        </h3>
        <span className="font-silk text-[10px] text-cyan-300 font-bold uppercase">WARRIOR STATUS</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between font-pixel text-[10px] mb-1">
            <span className="text-rose-400 font-bold">HP [CALORIES]</span>
            <span className="font-retro text-2xl text-rose-400 font-bold">
              {currentCalories} / {goals.calories} kcal
            </span>
          </div>
          {renderRetroSegments(currentCalories, goals.calories, palette.accentPink)}
        </div>

        <div>
          <div className="flex items-center justify-between font-pixel text-[10px] mb-1">
            <span className="text-emerald-400 font-bold">STR [PROTEIN]</span>
            <span className="font-retro text-2xl text-emerald-400 font-bold">
              {Math.round(currentProtein)}g / {goals.protein}g
            </span>
          </div>
          {renderRetroSegments(currentProtein, goals.protein, palette.accentGreen)}
        </div>

        <div>
          <div className="flex items-center justify-between font-pixel text-[10px] mb-1">
            <span className="text-amber-400 font-bold">DEX [CARBS]</span>
            <span className="font-retro text-2xl text-amber-400 font-bold">
              {Math.round(currentCarbs)}g / {goals.carbs}g
            </span>
          </div>
          {renderRetroSegments(currentCarbs, goals.carbs, palette.accentYellow)}
        </div>

        <div>
          <div className="flex items-center justify-between font-pixel text-[10px] mb-1">
            <span className="text-orange-400 font-bold">DEF [FATS]</span>
            <span className="font-retro text-2xl text-orange-400 font-bold">
              {Math.round(currentFat)}g / {goals.fat}g
            </span>
          </div>
          {renderRetroSegments(currentFat, goals.fat, palette.accentOrange)}
        </div>
      </div>
    </div>
  );
}

function SenseiCoach({
  currentCalories,
  currentProtein,
  goals,
  palette
}: {
  currentCalories: number;
  currentProtein: number;
  goals: DailyGoals;
  palette: ThemePalette;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [fullTargetText, setFullTargetText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const wisdomQuotes = [
    "🧙‍♂️ Sensei: 'To forge unbreakable strength, prioritize lean protein in every meal and maintain your daily warrior streak!'",
    "🧙‍♂️ Sensei: 'White rice and oats provide pure mana to fuel your intense gym raids. Do not fear complex carbohydrates!'",
    "🧙‍♂️ Sensei: 'Consistency is your greatest weapon. Logging meals daily grants monumental XP towards your physical peak!'",
    "🧙‍♂️ Sensei: 'Hydration and rest are vital potions. Drink plenty of water and let your muscle fibers recover overnight.'",
    "🧙‍♂️ Sensei: 'A balanced warrior balances strength, agility, and defense. Keep your proteins, carbs, and fats in harmony!'"
  ];

  const generateWisdom = () => {
    soundManager.playBlip();
    const randomIndex = Math.floor(Math.random() * wisdomQuotes.length);
    setFullTargetText(wisdomQuotes[randomIndex]);
  };

  useEffect(() => {
    generateWisdom();
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

    let text = `📜 Quest Briefing: You have consumed ${currentCalories} / ${goals.calories} kcal (${calPct}%). `;
    text += `Protein is currently at ${Math.round(currentProtein)}g / ${goals.protein}g (${proPct}%). `;
    if (remainingPro > 0) {
      text += `Need ${Math.round(remainingPro)}g more protein and ${remainingCal} kcal to reach maximum power today!`;
    } else {
      text += `✨ Victory! Your daily protein target is completely conquered!`;
    }
    setFullTargetText(text);
  };

  return (
    <section
      style={{ backgroundColor: palette.panelBg }}
      className="p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col"
    >
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-pink-400" />
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-yellow-300 uppercase font-bold">
              SENSEI
            </h3>
            <div className="font-mono text-xs text-cyan-300 font-bold">REAL-TIME RPG COACH</div>
          </div>
        </div>
        <button
          onClick={generateBriefing}
          className="pixel-btn bg-black text-white border-2 border-black px-2.5 py-1 text-[9px] flex items-center gap-1 cursor-pointer font-bold hover:bg-yellow-400 hover:text-black"
        >
          <RefreshCw className={`w-3 h-3 ${isTyping ? 'animate-spin' : ''}`} />
          <span>REFRESH</span>
        </button>
      </div>

      <div
        style={{ backgroundColor: palette.subpanelBg }}
        className="p-3.5 border-4 border-black mb-4 flex items-start gap-3.5 shadow-[2px_2px_0px_0px_#000]"
      >
        <div className="flex flex-col items-center shrink-0">
          <div className="w-12 h-12 bg-black border-2 border-pink-500 flex items-center justify-center text-2xl">
            🧙‍♂️
          </div>
          <span className="font-pixel text-[8px] text-pink-400 font-bold mt-1">SENSEI</span>
        </div>
        <div className="flex-1">
          <div className="font-mono text-lg text-white leading-relaxed min-h-[60px] p-2.5 bg-black border-2 border-black relative">
            {displayedText ? (
              <span>"{displayedText}"</span>
            ) : (
              <span className="text-slate-400 italic">"Request a briefing or wisdom below!"</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={generateBriefing}
          className="flex-1 min-w-[130px] pixel-btn bg-pink-600 text-white border-2 border-black py-2 px-2.5 text-[9px] font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-pink-500"
        >
          <Scroll className="w-3.5 h-3.5" />
          <span>MACRO BRIEFING</span>
        </button>
        <button
          onClick={generateWisdom}
          className="flex-1 min-w-[130px] pixel-btn bg-emerald-600 text-white border-2 border-black py-2 px-2.5 text-[9px] font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-emerald-500"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>SENSEI WISDOM</span>
        </button>
      </div>
    </section>
  );
}

function WeeklyHistoryChart({
  history,
  goals,
  palette
}: {
  history: Record<string, DailyHistoryRecord>;
  goals: DailyGoals;
  palette: ThemePalette;
}) {
  const days: { dateStr: string; dayLabel: string; record?: DailyHistoryRecord }[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = i === 0 ? 'TODAY' : d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    days.push({
      dateStr,
      dayLabel,
      record: history[dateStr]
    });
  }

  return (
    <section
      style={{ backgroundColor: palette.panelBg }}
      className="p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4">
        <h3 className="font-pixel text-xs sm:text-sm text-yellow-300 font-bold uppercase flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-300" />
          <span>📜 7-DAY QUEST HISTORY</span>
        </h3>
        <span className="font-silk text-[10px] text-cyan-300 font-bold uppercase">PAST 6 DAYS + TODAY</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-3 items-end h-40 bg-black p-3 border-4 border-black">
        {days.map((dayItem, idx) => {
          const rec = dayItem.record;
          const calories = rec ? rec.calories : 0;
          const protein = rec ? rec.protein : 0;
          const heightPct = goals.calories > 0 ? Math.min(Math.round((calories / goals.calories) * 100), 100) : 0;
          const isTargetMet = protein >= goals.protein && calories > 0;

          return (
            <div key={dayItem.dateStr} className="flex flex-col items-center justify-end h-full w-full group relative">
              <div className="absolute -top-10 z-20 hidden group-hover:flex flex-col items-center bg-slate-900 border-2 border-black text-white p-1 text-[9px] font-mono whitespace-nowrap shadow-md">
                <span>{calories} kcal</span>
                <span className="text-emerald-400">{protein}g P</span>
              </div>

              <div className="w-full bg-slate-900 border-2 border-slate-800 h-full flex items-end">
                <div
                  style={{ height: `${Math.max(heightPct, calories > 0 ? 8 : 0)}%` }}
                  className={`w-full transition-all duration-500 ${isTargetMet ? 'bg-emerald-500' : calories > 0 ? 'bg-pink-500' : 'bg-transparent'}`}
                />
              </div>

              <span className={`font-pixel text-[7px] sm:text-[9px] mt-2 font-bold ${idx === 6 ? 'text-yellow-300' : 'text-slate-400'}`}>
                {dayItem.dayLabel}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 inline-block border border-black" /> Goal Met</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-pink-500 inline-block border border-black" /> Active</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-900 inline-block border border-black" /> Empty</span>
        </div>
        <span className="font-pixel text-[8px] text-yellow-400">TARGET: {goals.calories} KCAL / {goals.protein}G P</span>
      </div>
    </section>
  );
}

function DailyLogList({
  meals,
  onDeleteMeal,
  onEditMeal,
  onDuplicateMeal,
  palette
}: {
  meals: CustomMeal[];
  onDeleteMeal: (id: string) => void;
  onEditMeal: (meal: CustomMeal) => void;
  onDuplicateMeal: (meal: CustomMeal) => void;
  palette: ThemePalette;
}) {
  const [expandedMealIds, setExpandedMealIds] = useState<Record<string, boolean>>({});

  return (
    <section
      style={{ backgroundColor: palette.panelBg }}
      className="p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col"
    >
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4">
        <h2 className="text-xs sm:text-sm font-pixel font-bold uppercase text-rose-400 flex items-center gap-2">
          <Utensils className="w-4 h-4 text-rose-400" />
          <span>QUEST LOG ({meals.length})</span>
        </h2>
        <span className="font-silk text-[10px] text-yellow-300 font-bold uppercase">ACTIVE INVENTORY</span>
      </div>

      {meals.length === 0 ? (
        <div className="p-8 bg-black border-4 border-black opacity-70 flex flex-col items-center justify-center min-h-[120px] border-dashed">
          <span className="text-[10px] uppercase font-pixel text-rose-400 font-bold">INVENTORY EMPTY</span>
          <span className="text-base font-retro text-slate-300 mt-1">(Craft a meal to fuel your quest!)</span>
        </div>
      ) : (
        <div className="space-y-3">
          {meals.map((meal) => {
            const isExpanded = !!expandedMealIds[meal.id];
            return (
              <div key={meal.id} className="p-3.5 bg-black border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-yellow-400 font-bold font-retro">
                    {meal.category.toUpperCase()} • {meal.totalGrams}g
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDuplicateMeal(meal)}
                      className="pixel-btn bg-slate-800 text-white border-2 border-black px-2 py-0.5 text-[8px] font-bold cursor-pointer hover:bg-emerald-600"
                      title="Eat again"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onEditMeal(meal)}
                      className="pixel-btn bg-blue-600 text-white border-2 border-black px-2 py-0.5 text-[8px] font-bold cursor-pointer hover:bg-blue-500"
                      title="Edit recipe"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteMeal(meal.id)}
                      className="pixel-btn bg-rose-600 text-white border-2 border-black px-2 py-0.5 text-[8px] font-bold cursor-pointer hover:bg-rose-500"
                      title="Discard meal"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setExpandedMealIds(p => ({ ...p, [meal.id]: !p[meal.id] }))}
                      className="pixel-btn bg-black text-white border-2 border-black px-2 py-0.5 text-[8px] font-bold cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xl font-bold text-white font-mono">
                  <span>{meal.ingredients[0]?.icon || '🍲'}</span>
                  <span>{meal.name}</span>
                </div>

                <div className="flex justify-between text-base font-retro mt-2 pt-2 border-t-2 border-slate-800">
                  <span className="text-rose-400 font-bold">{meal.totalCalories} kcal</span>
                  <span className="text-emerald-400 font-bold">{meal.totalProtein}g P</span>
                  <span className="text-amber-400 font-bold">{meal.totalCarbs}g C</span>
                  <span className="text-orange-400 font-bold">{meal.totalFat}g F</span>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-2 border-t-2 border-slate-800 bg-slate-900 p-2">
                    <div className="font-pixel text-[9px] text-yellow-300 font-bold mb-2">INGREDIENTS BREAKDOWN:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {meal.ingredients.map(ing => (
                        <div key={ing.id} className="flex items-center justify-between bg-black p-1.5 border-2 border-black">
                          <span className="font-mono text-sm text-white font-bold truncate">{ing.icon} {ing.name} ({ing.grams}g)</span>
                          <span className="font-mono text-sm text-emerald-400 font-bold">{ing.calories} kcal</span>
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

function SavedMealTemplates({
  templates,
  onLogTemplate,
  onDeleteTemplate,
  palette
}: {
  templates: CustomMeal[];
  onLogTemplate: (t: CustomMeal) => void;
  onDeleteTemplate: (id: string) => void;
  palette: ThemePalette;
}) {
  return (
    <section
      style={{ backgroundColor: palette.panelBg }}
      className="p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4">
        <h3 className="font-pixel text-xs sm:text-sm text-yellow-300 font-bold uppercase flex items-center gap-2">
          <span>📖 RECIPE SPELLBOOK (SAVED)</span>
        </h3>
        <span className="font-silk text-[10px] text-cyan-300 font-bold uppercase">1-CLICK CONSUME</span>
      </div>

      {templates.length === 0 ? (
        <div className="p-6 bg-black border-4 border-black text-center text-slate-400 font-mono text-sm">
          No saved meal recipes yet. Check "Save as Reusable Recipe" when crafting a custom meal!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {templates.map(template => (
            <div key={template.id} className="p-3 bg-black border-4 border-black flex flex-col justify-between shadow-[2px_2px_0px_0px_#000]">
              <div className="flex items-start justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{template.ingredients[0]?.icon || '🍲'}</span>
                  <div>
                    <div className="font-mono text-base font-bold text-white">{template.name}</div>
                    <div className="font-retro text-sm text-slate-400">{template.ingredients.length} items ({template.totalGrams}g)</div>
                  </div>
                </div>
                <button onClick={() => onDeleteTemplate(template.id)} className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t-2 border-slate-800 gap-2">
                <div className="font-retro text-base text-slate-300 flex gap-2">
                  <span className="text-rose-400 font-bold">{template.totalCalories} kcal</span>
                  <span className="text-emerald-400 font-bold">{template.totalProtein}g P</span>
                </div>
                <button
                  onClick={() => onLogTemplate(template)}
                  className="pixel-btn bg-emerald-600 text-white border-2 border-black px-3 py-1 text-[8px] font-bold flex items-center gap-1 cursor-pointer hover:bg-emerald-500"
                >
                  <Zap className="w-3 h-3 fill-white" /> LOG
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
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaveMeal: (meal: CustomMeal, saveAsTemplate: boolean) => void;
  initialMeal?: CustomMeal | null;
  customFoods: FoodItem[];
  deletedFoodIds?: string[];
  onAddCustomFood: (food: FoodItem) => void;
  onDeleteFood: (id: string, isCustom?: boolean) => void;
  onRestoreDefaultFoods?: () => void;
  palette: ThemePalette;
}) {
  const [mealName, setMealName] = useState(initialMeal?.name || '');
  const [category, setCategory] = useState<MealTimeSlot>(initialMeal?.category || 'lunch');
  const [ingredients, setIngredients] = useState<MealIngredient[]>(initialMeal?.ingredients || []);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeTab, setActiveTab] = useState<'pantry' | 'new_ingredient'>('pantry');
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCategory, setNewFoodCategory] = useState<FoodCategory>('protein');
  const [newFoodIcon, setNewFoodIcon] = useState('🥩');
  const [newFoodCalories, setNewFoodCalories] = useState<number | ''>(150);
  const [newFoodProtein, setNewFoodProtein] = useState<number | ''>(20);
  const [newFoodCarbs, setNewFoodCarbs] = useState<number | ''>(5);
  const [newFoodFat, setNewFoodFat] = useState<number | ''>(3);

  if (!isOpen) return null;

  const allAvailableFoods: FoodItem[] = [
    ...DEFAULT_FOOD_ITEMS.filter((f) => !deletedFoodIds.includes(f.id)),
    ...customFoods,
  ];

  const totalGrams = ingredients.reduce((acc, curr) => acc + curr.grams, 0);
  const totalCalories = ingredients.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = Math.round(ingredients.reduce((acc, curr) => acc + curr.protein, 0) * 10) / 10;
  const totalCarbs = Math.round(ingredients.reduce((acc, curr) => acc + curr.carbs, 0) * 10) / 10;
  const totalFat = Math.round(ingredients.reduce((acc, curr) => acc + curr.fat, 0) * 10) / 10;

  const handleAddFoodToRecipe = (food: FoodItem) => {
    soundManager.playBlip();
    const defaultG = food.defaultGrams || 100;
    const ratio = defaultG / 100;
    const newIngredient: MealIngredient = {
      id: 'ing-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      foodId: food.id,
      name: food.name,
      grams: defaultG,
      calories: Math.round(food.caloriesPer100g * ratio),
      protein: Math.round(food.proteinPer100g * ratio * 10) / 10,
      carbs: Math.round(food.carbsPer100g * ratio * 10) / 10,
      fat: Math.round(food.fatPer100g * ratio * 10) / 10,
      icon: food.icon
    };
    setIngredients(prev => [...prev, newIngredient]);
  };

  const handleCreateNewCustomIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFoodName.trim()) return;
    soundManager.playLevelUp();

    const created: FoodItem = {
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
    const finalMeal: CustomMeal = {
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
        className="w-full max-w-5xl max-h-[94vh] flex flex-col border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div
          style={{ backgroundColor: palette.headerBg }}
          className="flex items-center justify-between px-6 py-4 border-b-8 border-black"
        >
          <div className="flex items-center gap-3">
            <ChefHat className="w-7 h-7 text-white" />
            <h2 className="text-sm sm:text-base font-bold font-pixel uppercase text-white">CRAFT CUSTOM MEAL RECIPE</h2>
          </div>
          <button onClick={onClose} className="pixel-btn bg-rose-600 text-white border-2 border-black px-3 py-1.5 text-xs font-bold cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div
              style={{ backgroundColor: palette.subpanelBg }}
              className="space-y-3 p-4 border-4 border-black"
            >
              <div>
                <label className="block text-[10px] uppercase font-pixel font-bold text-yellow-300 mb-1">MEAL TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. High Protein Chicken Bowl"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="w-full bg-black border-4 border-black p-2.5 text-xl font-retro text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-black p-2 text-center border-2 border-black">
                  <div className="text-[10px] uppercase text-emerald-400 font-pixel font-bold">Protein</div>
                  <div className="text-xl font-retro font-bold text-white">{totalProtein}g</div>
                </div>
                <div className="bg-black p-2 text-center border-2 border-black">
                  <div className="text-[10px] uppercase text-amber-400 font-pixel font-bold">Carbs</div>
                  <div className="text-xl font-retro font-bold text-white">{totalCarbs}g</div>
                </div>
                <div className="bg-black p-2 text-center border-2 border-black">
                  <div className="text-[10px] uppercase text-orange-400 font-pixel font-bold">Fats</div>
                  <div className="text-xl font-retro font-bold text-white">{totalFat}g</div>
                </div>
              </div>
            </div>

            <div className="bg-black border-4 border-black p-4">
              <div className="flex items-center justify-between border-b-2 border-slate-800 pb-2 mb-2">
                <span className="font-pixel text-xs text-yellow-300 font-bold">RECIPE INGREDIENTS ({ingredients.length})</span>
                <span className="font-retro text-lg text-rose-400 font-bold">{totalCalories} kcal Total</span>
              </div>
              <div className="space-y-2 max-h-[180px] overflow-y-auto">
                {ingredients.map(ing => (
                  <div key={ing.id} className="p-2 bg-slate-900 border-2 border-black flex items-center justify-between">
                    <span className="font-mono text-sm text-white font-bold">{ing.icon} {ing.name} ({ing.grams}g)</span>
                    <button onClick={() => setIngredients(prev => prev.filter(i => i.id !== ing.id))} className="pixel-btn bg-rose-600 text-white border border-black p-1 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-600 border-4 border-black p-3.5 text-xs font-bold uppercase hover:bg-emerald-500 text-white font-pixel cursor-pointer transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              LOG MEAL (+50 XP)
            </button>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[10px] text-yellow-300 font-bold uppercase">PANTRY & CUSTOM FOODS</span>
              <div className="flex border-2 border-black">
                <button
                  onClick={() => setActiveTab('pantry')}
                  className={`px-2.5 py-1 text-[8px] font-bold font-pixel cursor-pointer ${activeTab === 'pantry' ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}
                >
                  PANTRY
                </button>
                <button
                  onClick={() => setActiveTab('new_ingredient')}
                  className={`px-2.5 py-1 text-[8px] font-bold font-pixel flex items-center gap-1 cursor-pointer ${activeTab === 'new_ingredient' ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}
                >
                  <Plus className="w-3 h-3 text-emerald-400" />
                  <span>+ CUSTOM</span>
                </button>
              </div>
            </div>

            {activeTab === 'pantry' ? (
              <>
                <div className="flex items-center bg-black border-4 border-black px-2 py-1">
                  <Search className="w-4 h-4 text-slate-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search food pantry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent font-retro text-lg text-white font-bold focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-[350px] overflow-y-auto">
                  {filteredFoods.map(food => (
                    <div key={food.id} className="p-2.5 bg-black border-2 border-black flex items-center justify-between">
                      <div>
                        <div className="font-mono text-sm text-white font-bold">{food.icon} {food.name}</div>
                        <div className="font-retro text-base text-slate-400">{food.caloriesPer100g} kcal / 100g ({food.proteinPer100g}g P)</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => onDeleteFood(food.id, food.isCustom)} className="pixel-btn bg-rose-600 text-white border border-black p-1 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleAddFoodToRecipe(food)} className="pixel-btn bg-emerald-600 text-white border border-black p-1.5 cursor-pointer hover:bg-emerald-500">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleCreateNewCustomIngredient} className="bg-black border-4 border-black p-4 space-y-3">
                <div className="font-pixel text-[10px] text-yellow-300 font-bold uppercase">CREATE CUSTOM INGREDIENT</div>

                <div>
                  <label className="block text-[9px] font-pixel text-slate-300 mb-1">INGREDIENT NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Protein Bar, Almond Milk"
                    value={newFoodName}
                    onChange={(e) => setNewFoodName(e.target.value)}
                    className="w-full bg-slate-900 border-2 border-black p-2 font-retro text-xl text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-pixel text-slate-300 mb-1">SELECT EMOJI ICON</label>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl p-2 bg-slate-900 border-2 border-black">{newFoodIcon}</span>
                    <input
                      type="text"
                      maxLength={2}
                      value={newFoodIcon}
                      onChange={(e) => setNewFoodIcon(e.target.value)}
                      className="w-16 bg-slate-900 border-2 border-black p-2 text-center text-xl text-white"
                    />
                  </div>
                  <div className="grid grid-cols-8 gap-1 max-h-[80px] overflow-y-auto p-1 bg-slate-900 border-2 border-black">
                    {POPULAR_FOOD_EMOJIS.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setNewFoodIcon(emoji)}
                        className={`text-lg p-1 hover:bg-yellow-400 hover:text-black rounded cursor-pointer ${newFoodIcon === emoji ? 'bg-yellow-400' : ''}`}
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
                      className="w-full bg-slate-900 border-2 border-black p-1.5 font-retro text-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-pixel text-emerald-400">PROTEIN (G)</label>
                    <input
                      type="number"
                      value={newFoodProtein}
                      onChange={(e) => setNewFoodProtein(Number(e.target.value))}
                      className="w-full bg-slate-900 border-2 border-black p-1.5 font-retro text-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-pixel text-amber-400">CARBS (G)</label>
                    <input
                      type="number"
                      value={newFoodCarbs}
                      onChange={(e) => setNewFoodCarbs(Number(e.target.value))}
                      className="w-full bg-slate-900 border-2 border-black p-1.5 font-retro text-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-pixel text-orange-400">FAT (G)</label>
                    <input
                      type="number"
                      value={newFoodFat}
                      onChange={(e) => setNewFoodFat(Number(e.target.value))}
                      className="w-full bg-slate-900 border-2 border-black p-1.5 font-retro text-lg text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full pixel-btn bg-emerald-600 text-white p-2.5 text-[9px] font-bold cursor-pointer hover:bg-emerald-500"
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
