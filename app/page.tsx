// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, CloudRain, Wind, Mountain, 
  Coffee, Droplets, Utensils, Zap, 
  Heart, Leaf, DollarSign, Smile, 
  ArrowRight, MapPin, Share2, ChevronUp,
  Sparkles, RotateCcw
} from 'lucide-react';

// --- Custom Font Injection ---
const FontStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&display=swap');
    body { font-family: 'Fredoka', sans-serif; }
  `}</style>
);

// --- Data ---
const questions = [
  {
    id: 'mood',
    type: 'card-select',
    title: "What's your current vibe?",
    options: [
      { id: 'fire', label: 'Fired Up', sub: 'Ready to take on the world', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
      { id: 'rain', label: 'Chill Mode', sub: 'Need to unwind and reset', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-100' },
      { id: 'air', label: 'Go With the Flow', sub: 'Easy-going and carefree', icon: Wind, color: 'text-yellow-500', bg: 'bg-yellow-100' },
      { id: 'earth', label: 'Grounded', sub: 'Centered and balanced', icon: Mountain, color: 'text-emerald-500', bg: 'bg-emerald-100' },
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
      { id: 'coffee', label: 'Coffee Fanatic', sub: 'Need that caffeine kick', icon: Coffee, color: 'text-stone-600', bg: 'bg-stone-100' },
      { id: 'refresh', label: 'Refreshing Bev', sub: 'Tea, juice, smoothie', icon: Zap, color: 'text-pink-500', bg: 'bg-pink-100' },
      { id: 'water', label: 'Water Only', sub: 'Hydration purist', icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-100' },
      { id: 'food', label: 'Food First', sub: 'Drink comes later', icon: Utensils, color: 'text-amber-600', bg: 'bg-amber-100' },
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

// --- Components ---

const LoadingScreen = () => {
  const steps = ["Analyzing your vibe...", "Mixing flavors...", "Checking Snapple facts...", "Creating avatar...", "Almost there..."];
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev)), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 relative z-10">
      <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-xl animate-bounce">
         <span className="text-4xl">🥤</span>
      </div>
      <motion.h2 key={stepIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-3xl font-bold text-white drop-shadow-md">
        {steps[stepIndex]}
      </motion.h2>
      <div className="mt-8 w-64 h-3 bg-black/20 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-white" 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7.5, ease: "linear" }}
        />
      </div>
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

  // Dynamic background based on progress/state
  const getBackground = () => {
    if (state.status === 'results' && state.results) {
        if (state.results.element === 'Fire') return 'bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500';
        if (state.results.element === 'Rain') return 'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500';
        if (state.results.element === 'Earth') return 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600';
        return 'bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300';
    }
    const colors = [
      'bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400', // Intro
      'bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300', // Q2
      'bg-gradient-to-br from-green-300 via-emerald-300 to-teal-300', // Q3
      'bg-gradient-to-br from-pink-300 via-rose-300 to-red-300',     // Q4
    ];
    return colors[state.currentStep % colors.length] || colors[0];
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${getBackground()} relative overflow-hidden font-sans text-slate-800`}>
      <FontStyles />
      
      {/* Decorative Floating Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {state.status === 'intro' && (
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border-4 border-white/50 p-8 text-center space-y-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center text-4xl shadow-lg transform -rotate-6">
              🥤
            </div>
            <div>
              <h1 className="text-5xl font-black text-slate-800 tracking-tight leading-tight mb-2">
                Find Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Flavour</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg">
                Discover your Snapple Element & get a custom AI Avatar in 60 seconds.
              </p>
            </div>
            <button 
              onClick={() => setState(prev => ({ ...prev, status: 'quiz' }))} 
              className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all flex items-center justify-center gap-3"
            >
              Let's Go <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      )}

      {state.status === 'analyzing' && <LoadingScreen />}

      {state.status === 'results' && state.results && (
        <div className="min-h-screen py-8 px-4 relative z-10 flex flex-col items-center">
           <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-md w-full space-y-6">
              {/* Main Result Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl text-center border-4 border-white/50 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-32 opacity-20 bg-gradient-to-b ${state.results.element === 'Fire' ? 'from-red-500' : 'from-blue-500'} to-transparent`}></div>
                
                <span className="uppercase tracking-widest text-xs font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Your Element</span>
                <h1 className="text-5xl font-black mt-4 mb-6 text-slate-800">{state.results.element}</h1>
                
                <div className="w-56 h-56 mx-auto bg-slate-100 rounded-3xl overflow-hidden shadow-inner mb-6 border-4 border-white relative group">
                   {state.results.avatarUrl ? 
                     <img src={state.results.avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : 
                     <div className="w-full h-full flex items-center justify-center text-6xl">🎨</div>
                   }
                </div>

                <div className="flex justify-center gap-2 flex-wrap mb-4">
                  {state.results.tags?.map((t) => (
                    <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">{t}</span>
                  ))}
                </div>
              </div>

              {/* Product Match */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-white/40 flex items-center gap-4"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-2xl flex items-center justify-center text-4xl shadow-sm">
                  🍹
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Perfect Match</div>
                  <h2 className="text-2xl font-black text-slate-800 leading-none mb-1">{state.results.product}</h2>
                  <p className="text-sm text-slate-500 leading-tight">"{state.results.desc}"</p>
                </div>
              </motion.div>

              <button 
                onClick={() => window.location.reload()} 
                className="w-full py-4 bg-white/50 hover:bg-white text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Start Over
              </button>
           </motion.div>
        </div>
      )}

      {state.status === 'quiz' && (
        <div className="min-h-screen flex flex-col items-center p-4 pt-12 relative z-10">
          <div className="w-full max-w-md">
            
            {/* Juicy Progress Bar */}
            <div className="w-full h-4 bg-black/10 rounded-full mb-8 overflow-hidden backdrop-blur-sm p-1">
              <motion.div 
                className="h-full bg-white rounded-full shadow-sm" 
                initial={{ width: 0 }} 
                animate={{ width: `${((state.currentStep + 1) / questions.length) * 100}%` }} 
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQ.id} 
                initial={{ x: 50, opacity: 0, rotate: 2 }} 
                animate={{ x: 0, opacity: 1, rotate: 0 }} 
                exit={{ x: -50, opacity: 0, rotate: -2 }} 
                className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border-4 border-white/50 min-h-[450px] flex flex-col"
              >
                <h2 className="text-3xl font-black text-slate-800 mb-8 leading-tight">{currentQ.title}</h2>
                
                <div className="flex-grow space-y-4">
                  {/* Card Select */}
                  {currentQ.type === 'card-select' && (
                    <div className="grid grid-cols-1 gap-3">
                      {currentQ.options?.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = state.answers[currentQ.id] === opt.id;
                        return (
                          <button key={opt.id} onClick={() => handleAnswer(opt.id)} 
                            className={`p-4 rounded-2xl text-left transition-all border-2 flex items-center gap-4 group
                            ${isSelected ? 'border-orange-500 bg-orange-50 shadow-md scale-[1.02]' : 'border-transparent bg-slate-50 hover:bg-slate-100 hover:scale-[1.01]'}`}
                          >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-orange-200 text-orange-700' : `${opt.bg} ${opt.color}`}`}>
                              <Icon className="w-7 h-7" />
                            </div>
                            <div>
                              <div className="font-bold text-lg text-slate-800">{opt.label}</div>
                              <div className="text-xs text-slate-400 font-medium">{opt.sub}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* List Select */}
                  {currentQ.type === 'list-select' && (
                    <div className="space-y-3">
                       {currentQ.options?.map((opt) => (
                          <button key={opt.id} onClick={() => handleAnswer(opt.id)} 
                            className={`w-full p-5 rounded-2xl text-left font-bold text-lg transition-all flex items-center gap-4 shadow-sm
                            ${state.answers[currentQ.id] === opt.id ? 'bg-slate-800 text-white scale-[1.02]' : 'bg-white border-2 border-slate-100 text-slate-600 hover:border-orange-200'}`}
                          >
                            <span className="text-2xl">{opt.icon}</span> {opt.label}
                          </button>
                        ))}
                    </div>
                  )}

                  {/* Slider */}
                  {currentQ.type === 'slider' && (
                    <div className="py-12 px-2">
                       <div className="relative">
                         <input 
                           type="range" min="0" max="100" 
                           value={state.answers[currentQ.id] || "50"} 
                           className="w-full h-6 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400" 
                           onChange={(e) => handleAnswer(e.target.value)} 
                         />
                         <div className="flex justify-between text-xs font-bold text-slate-400 mt-6 uppercase tracking-wide">
                           <span className="w-1/3 text-left">{currentQ.minLabel}</span>
                           <span className="w-1/3 text-center">{currentQ.midLabel}</span>
                           <span className="w-1/3 text-right">{currentQ.maxLabel}</span>
                         </div>
                       </div>
                    </div>
                  )}

                  {/* Rank */}
                  {currentQ.type === 'rank' && (
                    <div className="space-y-2">
                         {currentQ.options?.map((opt) => {
                           const rank = (state.answers[currentQ.id] || []).indexOf(opt.id);
                           const isSelected = rank !== -1;
                           return (
                             <button key={opt.id} onClick={() => { const current = state.answers[currentQ.id] || []; if (isSelected) { handleAnswer(current.filter((id) => id !== opt.id)); } else { if (current.length < 3) handleAnswer([...current, opt.id]); } }} 
                               className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all font-bold
                               ${isSelected ? 'border-orange-500 bg-orange-50 text-slate-800' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                             >
                               <div className="flex items-center gap-3"><opt.icon className={`w-5 h-5`} /><span className="">{opt.label}</span></div>
                               {isSelected && <span className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm flex items-center justify-center font-black shadow-lg shadow-orange-200">{rank + 1}</span>}
                             </button>
                           )
                         })}
                    </div>
                  )}

                  {/* Yes/No */}
                  {currentQ.type === 'yes-no' && (
                    <div className="space-y-4">
                      <button onClick={() => handleAnswer('yes')} className={`w-full p-6 rounded-2xl border-4 font-black text-xl transition-all ${state.answers[currentQ.id] === 'yes' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 bg-white text-slate-300'}`}>✅ YES!</button>
                      <button onClick={() => handleAnswer('no')} className={`w-full p-6 rounded-2xl border-4 font-black text-xl transition-all ${state.answers[currentQ.id] === 'no' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-100 bg-white text-slate-300'}`}>🤔 NOPE</button>
                      {state.answers[currentQ.id] && <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="mt-4 p-4 bg-blue-500 text-white font-medium rounded-xl shadow-lg">💡 <strong>Fun Fact:</strong> {currentQ.fact}</motion.div>}
                    </div>
                  )}

                  {/* Input */}
                  {currentQ.type === 'input' && (
                    <div><input type="text" placeholder={currentQ.placeholder} className="w-full p-6 text-xl border-4 border-slate-100 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all font-bold text-slate-800 placeholder:text-slate-300" onChange={(e) => handleAnswer(e.target.value)} /></div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                  <button onClick={nextStep} disabled={!state.answers[currentQ.id] && currentQ.type !== 'input' && currentQ.type !== 'slider'} 
                    className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-3 shadow-xl"
                  >
                    {state.currentStep === questions.length - 1 ? 'Finish' : 'Next'} <ChevronUp className="w-5 h-5 rotate-90"/>
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
