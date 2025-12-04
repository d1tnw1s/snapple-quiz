// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, CloudRain, Wind, Mountain, 
  Coffee, Droplets, Utensils, Zap, 
  Heart, Leaf, DollarSign, Smile, 
  ArrowRight, Check, ChevronUp, RotateCcw
} from 'lucide-react';

// --- FORCE FONT ---
const FontStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&display=swap');
    body { font-family: 'Fredoka', sans-serif; }
  `}</style>
);

// --- DATA ---
const questions = [
  {
    id: 'mood',
    type: 'grid', 
    title: "What's your current vibe?",
    options: [
      { id: 'fire', label: 'Fired Up', icon: Flame, style: 'text-orange-500 bg-orange-50 border-orange-200' },
      { id: 'rain', label: 'Chill Mode', icon: CloudRain, style: 'text-blue-500 bg-blue-50 border-blue-200' },
      { id: 'air', label: 'Flowing', icon: Wind, style: 'text-yellow-500 bg-yellow-50 border-yellow-200' },
      { id: 'earth', label: 'Grounded', icon: Mountain, style: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
    ]
  },
  {
    id: 'lifestyle',
    type: 'list',
    title: "Where do you spend your day?",
    options: [
      { id: 'campus', label: 'Campus Life', icon: '📚' },
      { id: 'office', label: 'Office Grind', icon: '🏢' },
      { id: 'active', label: 'Active Lifestyle', icon: '🏋️' },
      { id: 'home', label: 'Home Base', icon: '🏡' },
      { id: 'move', label: 'On the Move', icon: '🚗' },
    ]
  },
  {
    id: 'flavor',
    type: 'slider',
    title: "Flavor Profile",
    minLabel: "Sweet",
    midLabel: "Balanced",
    maxLabel: "Tart",
  },
  {
    id: 'morning',
    type: 'grid',
    title: "Morning Ritual?",
    options: [
      { id: 'coffee', label: 'Coffee', icon: Coffee, style: 'text-amber-700 bg-amber-50 border-amber-200' },
      { id: 'refresh', label: 'Fresh Bev', icon: Zap, style: 'text-pink-600 bg-pink-50 border-pink-200' },
      { id: 'water', label: 'Water', icon: Droplets, style: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
      { id: 'food', label: 'Food', icon: Utensils, style: 'text-orange-600 bg-orange-50 border-orange-200' },
    ]
  },
  {
    id: 'values',
    type: 'rank',
    title: "Top 3 Priorities",
    subtitle: "Select up to 3",
    options: [
      { id: 'taste', label: 'Taste', icon: Smile },
      { id: 'sugar', label: 'Low Sugar', icon: Heart },
      { id: 'natural', label: 'Natural', icon: Leaf },
      { id: 'eco', label: 'Eco-Friendly', icon: Mountain },
      { id: 'price', label: 'Value', icon: DollarSign },
      { id: 'func', label: 'Energy', icon: Zap },
    ]
  },
  {
    id: 'social',
    type: 'list',
    title: "Party Personality",
    options: [
      { id: 'life', label: 'Life of Party', icon: '🎉' },
      { id: 'deep', label: 'Deep Talks', icon: '🗣️' },
      { id: 'float', label: 'Floating', icon: '👋' },
      { id: 'organizer', label: 'Planner', icon: '📋' },
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
    placeholder: "Zip Code"
  }
];

// --- COMPONENT ---
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
      setTimeout(() => {
        setState(prev => ({ 
            ...prev, 
            status: 'results', 
            results: { element: 'Fire', product: 'Snapple Peach Tea', desc: "Matches your spicy energy!", avatarUrl: null, tags: ['Eco Warrior', 'Taste Seeker'] } 
        }));
      }, 2000);
      setState(prev => ({ ...prev, status: 'analyzing' }));
    }
  };

  // --- RENDER ---
  return (
    // 1. HARDCODED PURPLE GRADIENT BACKGROUND
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-sans text-slate-900 flex flex-col items-center justify-center p-4">
      <FontStyles />

      {/* INTRO */}
      {state.status === 'intro' && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-8 text-center relative overflow-hidden">
            <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto flex items-center justify-center text-5xl shadow-lg mb-6 rotate-[-6deg]">🥤</div>
            <h1 className="text-5xl font-black text-slate-900 mb-4 leading-none">Find Your <span className="text-purple-600">Flavor</span></h1>
            <p className="text-slate-500 text-lg mb-8 font-medium">Get your Element & AI Avatar in 60 seconds.</p>
            <button onClick={() => setState(prev => ({ ...prev, status: 'quiz' }))} className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl text-xl hover:scale-[1.02] transition-transform">
              Start Quiz
            </button>
        </motion.div>
      )}

      {/* ANALYZING */}
      {state.status === 'analyzing' && (
        <div className="text-center text-white">
            <div className="text-6xl animate-bounce mb-4">🔮</div>
            <h2 className="text-3xl font-black">Consulting the Oracle...</h2>
        </div>
      )}

      {/* RESULTS */}
      {state.status === 'results' && state.results && (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-md w-full bg-white rounded-[2rem] p-6 shadow-2xl space-y-6 text-center">
            <h1 className="text-6xl font-black text-orange-500 mt-4">{state.results.element}</h1>
            <div className="bg-slate-100 rounded-2xl p-6 h-64 flex items-center justify-center text-6xl border-4 border-white shadow-inner">
                {state.results.avatarUrl ? <img src={state.results.avatarUrl} /> : '🧑‍🎨'}
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <h2 className="text-2xl font-black text-slate-900">{state.results.product}</h2>
                <p className="text-slate-600">{state.results.desc}</p>
            </div>
            <button onClick={() => window.location.reload()} className="w-full py-4 bg-slate-200 font-bold rounded-xl text-slate-700">Start Over</button>
        </motion.div>
      )}

      {/* QUIZ */}
      {state.status === 'quiz' && (
        <div className="w-full max-w-md">
           {/* Progress */}
           <div className="w-full h-3 bg-black/20 rounded-full mb-6">
             <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${((state.currentStep + 1) / questions.length) * 100}%` }} />
           </div>

           <AnimatePresence mode="wait">
             <motion.div 
               key={currentQ.id} 
               initial={{ x: 50, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               exit={{ x: -50, opacity: 0 }} 
               className="bg-white rounded-[2rem] shadow-2xl p-6 min-h-[500px] flex flex-col"
             >
               <h2 className="text-3xl font-black text-slate-900 mb-8">{currentQ.title}</h2>
               <div className="flex-grow space-y-3">
                 
                 {/* GRID (Big Cards) */}
                 {currentQ.type === 'grid' && (
                   <div className="grid grid-cols-2 gap-3">
                     {currentQ.options?.map((opt) => (
                       <button key={opt.id} onClick={() => handleAnswer(opt.id)} 
                         className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all
                         ${state.answers[currentQ.id] === opt.id ? 'border-purple-500 bg-purple-50 scale-105 shadow-lg' : 'border-slate-100 hover:bg-slate-50'}`}
                       >
                         <opt.icon className={`w-8 h-8 ${opt.style?.split(' ')[0] || 'text-slate-700'}`} />
                         <span className="font-bold text-slate-700">{opt.label}</span>
                       </button>
                     ))}
                   </div>
                 )}

                 {/* LIST (Pill Buttons) */}
                 {currentQ.type === 'list' && (
                   <div className="space-y-3">
                     {currentQ.options?.map((opt) => (
                       <button key={opt.id} onClick={() => handleAnswer(opt.id)} 
                         className={`w-full p-4 rounded-xl flex items-center gap-4 border-2 transition-all
                         ${state.answers[currentQ.id] === opt.id ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}
                       >
                         <span className="text-2xl">{opt.icon}</span>
                         <span className="font-bold text-lg text-slate-700">{opt.label}</span>
                         {state.answers[currentQ.id] === opt.id && <Check className="ml-auto text-purple-600" />}
                       </button>
                     ))}
                   </div>
                 )}

                 {/* SLIDER */}
                 {currentQ.type === 'slider' && (
                   <div className="py-12 px-4">
                     <input type="range" min="0" max="100" className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600" onChange={(e) => handleAnswer(e.target.value)} />
                     <div className="flex justify-between font-bold text-slate-400 mt-4 text-xs uppercase tracking-widest">
                        <span>{currentQ.minLabel}</span><span>{currentQ.midLabel}</span><span>{currentQ.maxLabel}</span>
                     </div>
                   </div>
                 )}

                 {/* RANK */}
                 {currentQ.type === 'rank' && (
                   <div className="grid grid-cols-2 gap-3">
                      {currentQ.options?.map((opt) => {
                        const rank = (state.answers[currentQ.id] || []).indexOf(opt.id);
                        return (
                          <button key={opt.id} onClick={() => { const current = state.answers[currentQ.id] || []; if (rank !== -1) { handleAnswer(current.filter(id => id !== opt.id)); } else { if (current.length < 3) handleAnswer([...current, opt.id]); } }} 
                            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center font-bold ${rank !== -1 ? 'border-purple-500 bg-purple-50 text-purple-900' : 'border-slate-100 text-slate-400'}`}
                          >
                            <opt.icon className="w-6 h-6 mb-2"/>
                            {opt.label}
                            {rank !== -1 && <span className="absolute top-2 right-2 bg-purple-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">{rank + 1}</span>}
                          </button>
                        )
                      })}
                   </div>
                 )}

                 {/* YES/NO */}
                 {currentQ.type === 'yes-no' && (
                   <div className="space-y-4">
                     <button onClick={() => handleAnswer('yes')} className={`w-full p-5 rounded-xl border-2 font-black text-xl ${state.answers[currentQ.id] === 'yes' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-slate-100'}`}>YES</button>
                     <button onClick={() => handleAnswer('no')} className={`w-full p-5 rounded-xl border-2 font-black text-xl ${state.answers[currentQ.id] === 'no' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-white border-slate-100'}`}>NOPE</button>
                     {state.answers[currentQ.id] && <div className="p-4 bg-purple-100 text-purple-800 rounded-xl font-bold text-sm">💡 Fact: {currentQ.fact}</div>}
                   </div>
                 )}

                 {/* INPUT */}
                 {currentQ.type === 'input' && <input type="text" placeholder={currentQ.placeholder} className="w-full p-5 text-2xl font-bold border-b-4 border-slate-200 text-center outline-none focus:border-purple-500" onChange={(e) => handleAnswer(e.target.value)} />}
               
               </div>

               <div className="mt-6 pt-6 border-t border-slate-100 flex justify-end">
                 <button onClick={nextStep} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                   Next <ChevronUp className="w-4 h-4 rotate-90" />
                 </button>
               </div>
             </motion.div>
           </AnimatePresence>
        </div>
      )}
    </div>
  );
}
