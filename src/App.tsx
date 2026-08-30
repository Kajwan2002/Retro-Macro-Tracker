import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Trophy, Flame, Target, Utensils } from 'lucide-react';

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

function App() {
  const [goals] = useState<DailyGoals>({
    calories: 2200,
    protein: 160,
    carbs: 220,
    fat: 70,
  });

  const [entries, setEntries] = useState<FoodEntry[]>(() => {
    const saved = localStorage.getItem('retro_macro_entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  useEffect(() => {
    localStorage.setItem('retro_macro_entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !calories) return;

    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      name,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const totals = entries.reduce(
    (acc, curr) => ({
      calories: acc.calories + curr.calories,
      protein: acc.protein + curr.protein,
      carbs: acc.carbs + curr.carbs,
      fat: acc.fat + curr.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="min-h-screen bg-[#12101e] text-[#00ffcc] font-mono p-4 md:p-8">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <header className="border-4 border-[#ff0055] bg-[#1a162b] p-4 text-center shadow-[4px_4px_0px_0px_#ff0055]">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-[#ff0055] uppercase flex items-center justify-center gap-2">
            <Flame className="w-8 h-8 animate-pulse" /> Retro Macro Tracker
          </h1>
          <p className="text-xs text-[#00ffcc] mt-1">LEVEL UP YOUR NUTRITION</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border-2 border-[#00ffcc] bg-[#1a162b] p-3 shadow-[3px_3px_0px_0px_#00ffcc]">
            <div className="text-xs text-gray-400 flex items-center justify-between">
              <span>CALORIES</span>
              <Target className="w-4 h-4 text-[#ff0055]" />
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {totals.calories} <span className="text-xs text-gray-400">/ {goals.calories}</span>
            </div>
            <div className="w-full bg-[#12101e] h-2 mt-2 border border-[#00ffcc]">
              <div
                className="bg-[#ff0055] h-full"
                style={{ width: `${getProgress(totals.calories, goals.calories)}%` }}
              ></div>
            </div>
          </div>

          <div className="border-2 border-[#00ffcc] bg-[#1a162b] p-3 shadow-[3px_3px_0px_0px_#00ffcc]">
            <div className="text-xs text-gray-400 flex items-center justify-between">
              <span>PROTEIN</span>
              <Trophy className="w-4 h-4 text-[#yellow]" />
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {totals.protein}g <span className="text-xs text-gray-400">/ {goals.protein}g</span>
            </div>
            <div className="w-full bg-[#12101e] h-2 mt-2 border border-[#00ffcc]">
              <div
                className="bg-[#00ffcc] h-full"
                style={{ width: `${getProgress(totals.protein, goals.protein)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Add Meal Form */}
        <form onSubmit={addEntry} className="border-2 border-[#00ffcc] bg-[#1a162b] p-4 space-y-3 shadow-[3px_3px_0px_0px_#00ffcc]">
          <div className="text-sm font-bold text-[#ff0055] uppercase flex items-center gap-2">
            <Utensils className="w-4 h-4" /> Log Food Item
          </div>
          <input
            type="text"
            placeholder="Food Name (e.g. Chicken Breast)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#12101e] border border-[#00ffcc] p-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff0055]"
          />
          <div className="grid grid-cols-4 gap-2">
            <input
              type="number"
              placeholder="Cals"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="bg-[#12101e] border border-[#00ffcc] p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff0055]"
            />
            <input
              type="number"
              placeholder="Prot (g)"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="bg-[#12101e] border border-[#00ffcc] p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff0055]"
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              className="bg-[#12101e] border border-[#00ffcc] p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff0055]"
            />
            <input
              type="number"
              placeholder="Fat (g)"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              className="bg-[#12101e] border border-[#00ffcc] p-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff0055]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff0055] text-white py-2 text-sm font-bold uppercase hover:bg-[#d90048] transition-all border border-white flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </form>

        {/* Entries List */}
        <div className="space-y-2">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Today's Logs</div>
          {entries.length === 0 ? (
            <div className="border border-dashed border-gray-700 p-4 text-center text-xs text-gray-500">
              No entries logged yet.
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="border border-[#00ffcc] bg-[#1a162b] p-3 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white">{entry.name}</div>
                  <div className="text-gray-400">
                    {entry.calories} kcal | P: {entry.protein}g C: {entry.carbs}g F: {entry.fat}g
                  </div>
                </div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-gray-500 hover:text-[#ff0055] transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
