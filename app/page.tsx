// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, CloudRain, Wind, Mountain, 
  Coffee, Droplets, Utensils, Zap, 
  Heart, Leaf, DollarSign, Smile, 
  ArrowRight, MapPin, Share2, ChevronUp,
  Sparkles, RotateCcw, Check
} from 'lucide-react';

// --- Custom Font ---
const FontStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&display=swap');
    body { font-family: 'Fredoka', sans-serif; }
  `}</style>
);

// --- Content Data ---
const questions = [
  {
    id: 'mood',
    type: 'grid-2x2', // Changed to grid for big vibrant cards
    title: "What's your current vibe?",
    options: [
      { id: 'fire', label: 'Fired Up', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100', ring: 'ring-orange-400' },
      { id: 'rain', label: 'Chill Mode', icon: CloudRain, color: 'text-blue-600', bg: 'bg-blue-100', ring: 'ring-blue-400' },
      { id: 'air', label: 'Flowing', icon: Wind, color: 'text-yellow-600', bg: 'bg-yellow-100', ring: 'ring-yellow-400' },
      { id: 'earth', label: 'Grounded', icon: Mountain, color: 'text-emerald-600', bg: 'bg-emerald-100', ring: 'ring-emerald-400' },
    ]
  },
  {
    id: 'lifestyle',
    type: 'list', // Vertical stack like your screenshot
    title: "Where do you spend most of your day?",
    options: [
      { id: 'campus', label: 'Campus Life', icon: '📚', color: 'bg-indigo-100 text-indigo-700', ring: 'ring-indigo-400' },
      { id: 'office', label: 'Office Grind', icon: '🏢', color: 'bg-slate-100 text-slate-700', ring: 'ring-slate-400' },
      { id: 'active', label: 'Active Lifestyle', icon: '🏋️', color: 'bg-red-100 text-red-700', ring: 'ring-red-400' },
      { id: 'home', label: 'Home Base', icon: '🏡', color: 'bg-green-100 text-green-700', ring: 'ring-green-400' },
      { id: 'move', label: 'On the Move', icon: '🚗', color: 'bg-sky-100 text-sky-700', ring: 'ring-sky-400' },
    ]
  },
  {
    id: 'flavor',
    type: 'slider',
    title: "Pick your flavor profile",
    minLabel: "Sweet 🍑",
    midLabel: "Balanced 🍋",
    maxLabel: "Tart 🍇",
  },
  {
    id: 'morning',
    type: 'grid-2x2',
    title: "How do you start your day?",
    options: [
      { id: 'coffee', label: 'Coffee', icon: Coffee, color: 'text-amber-700', bg: 'bg-amber-100', ring: 'ring-amber-500' },
      { id: 'refresh', label: 'Fresh Bev', icon: Zap, color: 'text-pink-600', bg: 'bg-pink-100', ring: 'ring-pink-400' },
      { id: 'water', label: 'H2O Only', icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-100', ring: 'ring-cyan-400' },
      { id: 'food', label: 'Food First', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-100', ring: 'ring-orange-400' },
    ]
  },
  {
    id: 'values',
    type: 'rank',
    title: "Top 3 Priorities",
    subtitle: "Tap to select (1-3)",
    options: [
      { id: 'taste', label: 'Taste', icon: Smile, color: 'bg-yellow-100', ring: 'ring-yellow-400' },
      { id: 'sugar', label: 'Low Sugar', icon: Heart, color: 'bg-red-100', ring: 'ring-red-400' },
      { id: 'natural', label: 'Natural', icon: Leaf, color: 'bg-green-100', ring: 'ring-green-400' },
      { id: 'eco', label: 'Eco-Friendly', icon: Mountain, color: 'bg-emerald-100', ring: 'ring-emerald-400' },
      { id: 'price', label: 'Value', icon: DollarSign, color: 'bg-blue-100', ring: 'ring-blue-400' },
      { id: 'func', label: 'Energy', icon: Zap, color: 'bg-purple-100', ring: 'ring-purple-400' },
    ]
  },
  {
    id: 'social',
    type: 'list',
    title: "You at a party...",
    options: [
      { id: 'life', label: 'Life of the Party', icon: '🎉', color: 'bg-pink-100 text-pink-700', ring: 'ring-pink-400' },
      { id: 'deep', label: 'Deep Convos', icon: '🗣️', color: 'bg-purple-100 text-purple-700', ring: 'ring-purple-400' },
      { id: 'float', label: 'Floating Around', icon: '👋', color: 'bg-blue-100 text-blue-700', ring: 'ring-blue-400' },
      { id: 'organizer', label: 'The Planner', icon: '📋', color: 'bg-orange-100 text-orange-700', ring: 'ring-orange-400' },
    ]
  },
  {
    id: 'sustainability',
    type: 'yes-no',
    title: "Did you know Snapple bottles are 100% recycled plastic?",
    fact: "Yup! Every bottle has lived 3 lives before reaching you."
  },
  {
    id: 'variety',
    type: 'slider',
    title: "Adventure Level",
    minLabel: "Habitual",
    midLabel: "Curious",
    maxLabel: "Wild",
  },
  {
    id: 'location',
    type: 'input',
    title: "Where do you shop?",
    placeholder: "Zip Code or City"
  }
];

// --- Components ---

const LoadingScreen = () => {
  const steps = ["Analyzing vibe...", "Mixing flavors...", "Checking facts...", "Painting avatar...", "Bottling magic..."];
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev)), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 relative z-10">
      <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-2xl animate-bounce">
         <span className="text-5xl">🥤</span>
      </div>
      <motion.h2 key={stepIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-4xl font-black text-white drop-shadow-lg tracking-wide">
        {steps[stepIndex]}
      </motion.h2>
    </div>
  );
};

export default function SnappleQuizApp() {
  const [state, setState] = useState({ currentStep: 0, answers: {}, results: null, status: 'intro' });
  const currentQ = questions[state.currentStep];

  const handleAnswer = (val) => {
    setState(prev => ({ ...prev, answers: { ...prev.answers, [questions[prev.currentStep].id]: val } }));
  };

  const nextStep = () => {
    if (state.currentStep < questions.length - 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setState(prev => ({ ...prev, status: 'analyzing' }));
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: state.answers })
      });
      const data = await response.json();
      setState(prev => ({ ...prev, results: data, status: 'results' }));
    } catch (error) {
      // Fallback
      setTimeout(() => {
        setState(prev => ({ ...prev, status: 'results', results: { element: 'Fire', product: 'Snapple Peach Tea', desc: "Matches your energy!", avatarUrl: null, tags: ['Eco Warrior', 'Taste Seeker'] } }));
      }, 2000);
    }
  };

  // Background Gradient Logic
  const getGradient = () => {
    if (state.status === 'intro') return 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400';
    if (state.status === 'analyzing') return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500';
    if (state.status === 'results') {
       if (state.results?.element === 'Fire') return 'bg-gradient-to-br from-orange-500 to-red-600';
       if (state.results?.element === 'Rain') return 'bg-gradient-to-br from-blue-500 to-indigo-600';
       if (state.results?.element === 'Earth') return 'bg-gradient-to-br from-emerald-500 to-green-600';
       return 'bg-gradient-to-br from-yellow-400 to-orange-500';
    }
    // Quiz steps colors
    const colors = [
      'bg-gradient-to-br from-orange-300 to-rose-300', // Q1
      'bg-gradient-to-br from-blue-300 to-indigo-300', // Q2
      'bg-gradient-to-br from-yellow-300 to-orange-300', // Q3
      'bg-gradient-to-br from-emerald-300 to-teal-300', // Q4
      'bg-gradient-to-br from-purple-300 to-pink-300', // Q5
    ];
    return colors[state.currentStep % colors.length];
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getGradient()} font-sans text-slate-800 flex flex-col items-center justify-center p-4`}>
      <FontStyles />

      {/* Intro Screen */}
      {state.status === 'intro' && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 text-center border-4 border-white/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-100 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full mx-auto flex items-center justify-center text-5xl shadow-lg mb-6 rotate-[-10deg]">🥤</div>
              <h1 className="text-5xl font-black text-slate-900 leading-tight mb-4">Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Flavor</span></h1>
              <p className="text-slate-500 font-medium text-lg mb-8">Discover your Snapple Element & get a custom AI Avatar.</p>
              <button onClick={() => setState(prev => ({ ...prev, status: 'quiz' }))} className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                Start Quiz <ArrowRight className="w-6 h-6" />
              </button>
            </div>
        </motion.div>
      )}

      {/* Loading Screen */}
      {state.status === 'analyzing' && <LoadingScreen />}

      {/* Results Screen */}
      {state.status === 'results' && state.results && (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl space-y-6">
            <div className="text-center pt-4">
              <span className="bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">Your Element</span>
              <h1 className="text-6xl font-black text-slate-900 mt-2 mb-6">{state.results.element}</h1>
              <div className="aspect-square bg-slate-100 rounded-[2rem] overflow-hidden shadow-inner border-4 border-white mx-auto w-64 relative group">
                  {state.results.avatarUrl ? 
                    <img src={state.results.avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : 
                    <div className="w-full h-full flex items-center justify-center text-8xl">🎨</div>
                  }
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100">
               <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">🍹</div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">{state.results.product}</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase">Perfect Match</p>
                  </div>
               </div>
               <p className="text-slate-600 leading-relaxed font-medium">"{state.results.desc}"</p>
            </div>

            <button onClick={() => window.location.reload()} className="w-full py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5" /> Start Over
            </button>
        </motion.div>
      )}

      {/* Quiz Screen */}
      {state.status === 'quiz' && (
        <div className="w-full max-w-md">
           {/* Progress Bar */}
           <div className="w-full h-3 bg-black/10 rounded-full mb-6 overflow-hidden">
             <motion.div className="h-full bg-white/90" initial={{ width: 0 }} animate={{ width: `${((state.currentStep + 1) / questions.length) * 100}%` }} />
           </div>

           <AnimatePresence mode="wait">
             <motion.div 
               key={currentQ.id} 
               initial={{ x: 50, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               exit={{ x: -50, opacity: 0 }} 
               className="bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-8 min-h-[500px] flex flex-col relative overflow-hidden"
             >
               <h2 className="text-3xl font-black text-slate-900 mb-8 leading-tight">{currentQ.title}</h2>

               <div className="flex-grow space-y-4">
                 
                 {/* 1. Grid 2x2 (Big Cards) */}
                 {currentQ.type === 'grid-2x2' && (
                   <div className="grid grid-cols-2 gap-4">
                     {currentQ.options?.map((opt) => {
                       const Icon = opt.icon;
                       const isSelected = state.answers[currentQ.id] === opt.id;
                       return (
                         <button key={opt.id} onClick={() => handleAnswer(opt.id)} 
                           className={`aspect-square rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-300 border-b-4
                           ${isSelected 
                             ? `${opt.bg} ${opt.ring} ring-4 ring-offset-2 border-transparent scale-105 shadow-xl` 
                             : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:scale-[1.02]'}`}
                         >
                           <Icon className={`w-10 h-10 ${opt.color}`} />
                           <span className="font-bold text-slate-700 text-lg">{opt.label}</span>
                         </button>
                       )
                     })}
                   </div>
                 )}

                 {/* 2. List (Pill Buttons - Like Screenshot) */}
                 {currentQ.type === 'list' && (
                   <div className="space-y-3">
                     {currentQ.options?.map((opt) => {
                       const isSelected = state.answers[currentQ.id] === opt.id;
                       return (
                         <button key={opt.id} onClick={() => handleAnswer(opt.id)} 
                           className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-200 border-2
                           ${isSelected 
                             ? `bg-white border-transparent ${opt.ring} ring-4 ring-offset-1 shadow-lg scale-[1.02]` 
                             : 'bg-white border-slate-100 shadow-sm hover:border-slate-200 hover:bg-slate-50'}`}
                         >
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${opt.color} bg-opacity-20`}>
                             {opt.icon}
                           </div>
                           <span className="font-bold text-lg text-slate-700">{opt.label}</span>
                           {isSelected && <Check className="ml-auto w-6 h-6 text-green-500" />}
                         </button>
                       )
                     })}
                   </div>
                 )}

                 {/* 3. Slider */}
                 {currentQ.type === 'slider' && (
                   <div className="py-12 px-4">
                     <div className="relative">
                       <input 
                         type="range" min="0" max="100" 
                         value={state.answers[currentQ.id] || "50"} 
                         className="w-full h-8 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-900 hover:accent-orange-500 transition-all" 
                         onChange={(e) => handleAnswer(e.target.value)} 
                       />
                       <div className="flex justify-between font-bold text-slate-400 mt-6 text-sm uppercase tracking-wider">
                         <span>{currentQ.minLabel}</span>
                         <span>{currentQ.midLabel}</span>
                         <span>{currentQ.maxLabel}</span>
                       </div>
                     </div>
                   </div>
                 )}

                 {/* 4. Rank */}
                 {currentQ.type === 'rank' && (
                   <div className="grid grid-cols-2 gap-3">
                      {currentQ.options?.map((opt) => {
                        const rank = (state.answers[currentQ.id] || []).indexOf(opt.id);
                        const isSelected = rank !== -1;
                        return (
                          <button key={opt.id} onClick={() => { const current = state.answers[currentQ.id] || []; if (isSelected) { handleAnswer(current.filter((id) => id !== opt.id)); } else { if (current.length < 3) handleAnswer([...current, opt.id]); } }} 
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all font-bold min-h-[100px]
                            ${isSelected ? `${opt.color} ${opt.ring} ring-4 ring-offset-1 border-transparent` : 'bg-white border-slate-100 text-slate-400'}`}
                          >
                            <opt.icon className={`w-6 h-6 ${isSelected ? 'text-slate-800' : 'text-slate-300'}`} />
                            <span className={isSelected ? 'text-slate-900' : ''}>{opt.label}</span>
                            {isSelected && <span className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full text-xs flex items-center justify-center">{rank + 1}</span>}
                          </button>
                        )
                      })}
                   </div>
                 )}

                 {/* 5. Yes/No */}
                 {currentQ.type === 'yes-no' && (
                   <div className="space-y-4 pt-4">
                     <button onClick={() => handleAnswer('yes')} className={`w-full p-6 rounded-2xl border-4 font-black text-2xl transition-all shadow-sm flex items-center justify-center gap-3 ${state.answers[currentQ.id] === 'yes' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 bg-white text-slate-300'}`}>
                       Yes <Check className="w-8 h-8"/>
                     </button>
                     <button onClick={() => handleAnswer('no')} className={`w-full p-6 rounded-2xl border-4 font-black text-2xl transition-all shadow-sm ${state.answers[currentQ.id] === 'no' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-100 bg-white text-slate-300'}`}>
                       Nope
                     </button>
                     {state.answers[currentQ.id] && <div className="p-4 bg-indigo-50 text-indigo-800 rounded-xl text-sm font-bold border border-indigo-100">💡 Fact: {currentQ.fact}</div>}
                   </div>
                 )}
                 
                 {/* 6. Input */}
                 {currentQ.type === 'input' && (
                   <input type="text" placeholder={currentQ.placeholder} className="w-full p-6 text-2xl font-bold border-b-4 border-slate-200 focus:border-orange-500 focus:outline-none bg-transparent placeholder:text-slate-300 text-center" onChange={(e) => handleAnswer(e.target.value)} />
                 )}
               </div>

               <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end">
                 <button onClick={nextStep} disabled={!state.answers[currentQ.id] && currentQ.type !== 'input' && currentQ.type !== 'slider'} 
                   className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 transition-all flex items-center gap-2"
                 >
                   Next <ChevronUp className="w-5 h-5 rotate-90" />
                 </button>
               </div>
             </motion.div>
           </AnimatePresence>
        </div>
      )}
    </div>
  );
}
