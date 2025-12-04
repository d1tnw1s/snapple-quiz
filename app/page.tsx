// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, CloudRain, Wind, Mountain, 
  Coffee, Droplets, Utensils, Zap, 
  Heart, Leaf, DollarSign, Smile, 
  ArrowRight, MapPin, Share2, ChevronUp
} from 'lucide-react';

// --- Types & Data ---

const questions = [
  {
    id: 'mood',
    type: 'card-select',
    title: "What's your current vibe?",
    options: [
      { id: 'fire', label: 'Fired Up', sub: 'Ready to take on the world', icon: Flame, color: 'bg-orange-100 text-orange-600 border-orange-200' },
      { id: 'rain', label: 'Chill Mode', sub: 'Need to unwind and reset', icon: CloudRain, color: 'bg-blue-100 text-blue-600 border-blue-200' },
      { id: 'air', label: 'Go With the Flow', sub: 'Easy-going and carefree', icon: Wind, color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
      { id: 'earth', label: 'Grounded', sub: 'Centered and balanced', icon: Mountain, color: 'bg-green-100 text-green-600 border-green-200' },
    ]
  },
  {
    id: 'lifestyle',
    type: 'list-select',
    title: "Where do you spend most of your day?",
    options: [
      { id: 'campus', label: 'Campus Life', icon: '📚' },
      { id: 'office', label: 'Office Grind', icon: '🏢' },
      { id: 'active', label: 'Active Lifestyle', icon: '🏋️' },
      { id: 'home', label: 'Home Base', icon: '🏡' },
      { id: 'move', label: 'Always On the Move', icon: '🚗' },
    ]
  },
  {
    id: 'flavor',
    type: 'slider',
    title: "Slide to your ideal flavor profile",
    minLabel: "Sweet & Fruity 🍑",
    midLabel: "Balanced 🍋",
    maxLabel: "Tart & Bold 🍇",
  },
  {
    id: 'morning',
    type: 'card-select',
    title: "How do you start your day?",
    options: [
      { id: 'coffee', label: 'Coffee Fanatic', sub: 'Need that caffeine kick', icon: Coffee, color: 'bg-stone-100 text-stone-600' },
      { id: 'refresh', label: 'Refreshing Bev', sub: 'Tea, juice, smoothie', icon: Zap, color: 'bg-pink-100 text-pink-600' },
      { id: 'water', label: 'Water Only', sub: 'Hydration purist', icon: Droplets, color: 'bg-cyan-100 text-cyan-600' },
      { id: 'food', label: 'Food First', sub: 'Drink comes later', icon: Utensils, color: 'bg-amber-100 text-amber-600' },
    ]
  },
  {
    id: 'values',
    type: 'rank',
    title: "Rank what matters most (Top 3)",
    subtitle: "Tap to select your top 3 values",
    options: [
      { id: 'taste', label: 'Taste above everything', icon: Smile },
      { id: 'sugar', label: 'Low or zero sugar', icon: Heart },
      { id: 'natural', label: 'Natural ingredients', icon: Leaf },
      { id: 'eco', label: 'Eco-friendly packaging', icon: Mountain },
      { id: 'price', label: 'Price/value', icon: DollarSign },
      { id: 'func', label: 'Functional benefits', icon: Zap },
    ]
  },
  {
    id: 'social',
    type: 'list-select',
    title: "At a party, you're most likely to be...",
    options: [
      { id: 'life', label: 'The life of the party', icon: '🎉' },
      { id: 'deep', label: 'Having deep convos', icon: '🗣️' },
      { id: 'float', label: 'Floating between groups', icon: '👋' },
      { id: 'organizer', label: 'The one who organized it', icon: '📋' },
    ]
  },
  {
    id: 'sustainability',
    type: 'yes-no',
    title: "Did you know Snapple bottles are made from 100% recycled plastic?",
    fact: "Every Snapple bottle lives 3 lives! We've eliminated 600M lbs of virgin plastic."
  },
  {
    id: 'variety',
    type: 'slider',
    title: "Flavor Adventure Level",
    minLabel: "Creature of Habit",
    midLabel: "Experimenter",
    maxLabel: "Flavor Adventurer",
  },
  {
    id: 'location',
    type: 'input',
    title: "Where do you usually grab your drinks?",
    placeholder: "Enter Zip Code or City"
  }
];

const LoadingScreen = () => {
  const steps = ["Analyzing your vibe...", "Matching flavor profiles...", "Consulting the Snapple archives...", "Generating your unique avatar...", "Bottling the magic..."];
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev)), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-8"></div>
      <motion.h2 key={stepIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-slate-800">
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

  const nextStep = async () => {
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
      setState(prev => ({ ...prev, status: 'results', results: { element: 'Fire', product: 'Snapple Peach Tea', desc: "Matches your energy!", avatarUrl: null } }));
    }
  };

  if (state.status === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto flex items-center justify-center text-3xl">🥤</div>
          <h1 className="text-4xl font-extrabold text-slate-800">Find Your <span className="text-orange-500">Snapple Flavour</span></h1>
          <p className="text-slate-500 text-lg">Take the 60-second AI quiz to discover your element.</p>
          <button onClick={() => setState(prev => ({ ...prev, status: 'quiz' }))} className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-lg shadow-lg flex items-center justify-center gap-2">Start Quiz <ArrowRight className="w-5 h-5" /></button>
        </div>
      </div>
    );
  }

  if (state.status === 'analyzing') return <div className="min-h-screen bg-white flex items-center justify-center"><LoadingScreen /></div>;

  if (state.status === 'results' && state.results) {
    const { element, product, desc, avatarUrl, tags } = state.results;
    const theme = element === 'Fire' ? 'from-orange-500 to-red-500' : element === 'Rain' ? 'from-blue-400 to-indigo-500' : element === 'Earth' ? 'from-green-500 to-emerald-600' : 'from-yellow-400 to-orange-300';

    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-md mx-auto space-y-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`rounded-3xl p-8 text-white bg-gradient-to-br ${theme} shadow-xl text-center relative overflow-hidden`}>
            <div className="relative z-10">
              <span className="uppercase tracking-widest text-xs font-bold opacity-80">You are a</span>
              <h1 className="text-5xl font-black mt-2 mb-4">{element} Element</h1>
              <div className="w-48 h-48 mx-auto bg-white/20 rounded-2xl backdrop-blur-sm border-2 border-white/30 flex items-center justify-center overflow-hidden mb-6">
                 {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : <span className="text-4xl">🧑‍🎨</span>}
              </div>
              <div className="flex justify-center gap-2 flex-wrap">
                {tags && tags.map((t) => <span key={t} className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-md">{t}</span>)}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <h3 className="text-slate-400 font-bold uppercase text-xs mb-2">Your Perfect Match</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl">🍹</div>
              <div><h2 className="text-xl font-bold text-slate-800">{product}</h2></div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100"><p className="text-slate-600 italic">"{desc}"</p></div>
          </motion.div>
           <button onClick={() => window.location.reload()} className="w-full text-slate-400 text-sm py-4 hover:text-slate-600">Start Over</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 pt-12">
      <div className="w-full max-w-md">
        <div className="w-full h-2 bg-slate-200 rounded-full mb-8 overflow-hidden"><motion.div className="h-full bg-orange-500" initial={{ width: 0 }} animate={{ width: `${((state.currentStep + 1) / questions.length) * 100}%` }} /></div>
        <AnimatePresence mode="wait">
          <motion.div key={currentQ.id} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl p-6 shadow-lg min-h-[400px] flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{currentQ.title}</h2>
            <div className="flex-grow space-y-3">
              {currentQ.type === 'card-select' && (
                <div className="grid grid-cols-1 gap-3">
                  {currentQ.options?.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = state.answers[currentQ.id] === opt.id;
                    return (
                      <button key={opt.id} onClick={() => handleAnswer(opt.id)} className={`p-4 rounded-xl text-left transition-all border-2 flex items-center gap-4 ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:bg-slate-50'}`}>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${opt.color || 'bg-slate-100'}`}><Icon className="w-6 h-6" /></div>
                        <div><div className="font-bold text-slate-800">{opt.label}</div><div className="text-xs text-slate-400">{opt.sub}</div></div>
                      </button>
                    );
                  })}
                </div>
              )}
              {currentQ.type === 'list-select' && (
                <div className="space-y-2">
                   {currentQ.options?.map((opt) => (
                      <button key={opt.id} onClick={() => handleAnswer(opt.id)} className={`w-full p-4 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${state.answers[currentQ.id] === opt.id ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-600'}`}>
                        <span>{opt.icon}</span> {opt.label}
                      </button>
                    ))}
                </div>
              )}
              {currentQ.type === 'slider' && (
                <div className="py-8 px-2">
                   <div className="relative mb-8">
                     <input 
                       type="range" 
                       min="0" 
                       max="100" 
                       value={state.answers[currentQ.id] || "50"} 
                       className="w-full h-3 bg-gradient-to-r from-pink-300 via-yellow-200 to-purple-400 rounded-lg appearance-none cursor-pointer accent-orange-500" 
                       onChange={(e) => handleAnswer(e.target.value)} 
                     />
                     <div className="flex justify-between text-xs font-bold text-slate-400 mt-4"><span className="w-1/3 text-left">{currentQ.minLabel}</span><span className="w-1/3 text-center">{currentQ.midLabel}</span><span className="w-1/3 text-right">{currentQ.maxLabel}</span></div>
                   </div>
                </div>
              )}
              {currentQ.type === 'rank' && (
                <div>
                   <p className="text-sm text-slate-400 mb-4">{currentQ.subtitle}</p>
                   <div className="space-y-2">
                     {currentQ.options?.map((opt) => {
                       const rank = (state.answers[currentQ.id] || []).indexOf(opt.id);
                       const isSelected = rank !== -1;
                       return (
                         <button key={opt.id} onClick={() => { const current = state.answers[currentQ.id] || []; if (isSelected) { handleAnswer(current.filter((id) => id !== opt.id)); } else { if (current.length < 3) handleAnswer([...current, opt.id]); } }} className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}>
                           <div className="flex items-center gap-3"><opt.icon className={`w-5 h-5 ${isSelected ? 'text-orange-500' : 'text-slate-400'}`} /><span className={`font-medium ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>{opt.label}</span></div>
                           {isSelected && <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{rank + 1}</span>}
                         </button>
                       )
                     })}
                   </div>
                </div>
              )}
              {currentQ.type === 'yes-no' && (
                <div className="space-y-3">
                  <button onClick={() => handleAnswer('yes')} className={`w-full p-4 rounded-xl border-2 font-bold ${state.answers[currentQ.id] === 'yes' ? 'border-green-500 bg-green-50' : 'border-slate-100'}`}>✅ Yes! That's amazing</button>
                  <button onClick={() => handleAnswer('no')} className={`w-full p-4 rounded-xl border-2 font-bold ${state.answers[currentQ.id] === 'no' ? 'border-orange-500 bg-orange-50' : 'border-slate-100'}`}>🤔 No, but tell me more</button>
                  {state.answers[currentQ.id] && <div className="mt-4 p-4 bg-blue-50 text-blue-800 text-sm rounded-xl">💡 <strong>Did you know?</strong> {currentQ.fact}</div>}
                </div>
              )}
              {currentQ.type === 'input' && (
                <div><input type="text" placeholder={currentQ.placeholder} className="w-full p-4 text-lg border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none" onChange={(e) => handleAnswer(e.target.value)} /></div>
              )}
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button onClick={nextStep} disabled={!state.answers[currentQ.id] && currentQ.type !== 'input' && currentQ.type !== 'slider'} className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 disabled:opacity-50 transition-all flex items-center gap-2">{state.currentStep === questions.length - 1 ? 'Finish' : 'Next'} <ChevronUp className="w-4 h-4 rotate-90"/></button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
