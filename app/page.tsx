// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, CloudRain, Wind, Mountain, 
  Coffee, Droplets, Utensils, Zap, 
  Heart, Leaf, DollarSign, Smile, 
  ChevronUp, Check, ArrowRight, RotateCcw
} from 'lucide-react';

/* -----------------------------------------------------------
   NO-FAIL CSS STYLES
   These styles are injected directly into the browser.
   They cannot be broken by build tools.
----------------------------------------------------------- */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Fredoka', sans-serif;
    background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
    min-height: 100vh;
    color: #1e293b;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }

  /* CARDS & LAYOUT */
  .card {
    background: white;
    border-radius: 30px;
    padding: 30px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 25px;
    line-height: 1.2;
    color: #0f172a;
  }

  /* BUTTON GRIDS */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    width: 100%;
  }

  .grid-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    border-radius: 20px;
    border: 2px solid #f1f5f9;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
    aspect-ratio: 1;
  }

  .grid-btn:hover {
    transform: translateY(-2px);
    background: #f8fafc;
  }

  .grid-btn.selected {
    border-width: 3px;
    background: #fdf4ff; /* light purple tint */
    border-color: #a855f7;
    transform: scale(1.05);
    box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.2);
  }

  .grid-btn-label {
    font-weight: 700;
    font-size: 16px;
    color: #334155;
  }
  
  .grid-btn.selected .grid-btn-label {
    color: #9333ea;
  }

  /* LIST BUTTONS (PILLS) */
  .list-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .list-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 18px 24px;
    width: 100%;
    border-radius: 16px;
    border: 2px solid #f1f5f9;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }

  .list-btn:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
  }

  .list-btn.selected {
    border-color: #a855f7;
    background: #faf5ff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .list-icon {
    font-size: 24px;
    width: 30px;
    text-align: center;
  }

  .list-label {
    font-size: 18px;
    font-weight: 600;
    color: #334155;
    flex-grow: 1;
  }

  /* SLIDER */
  .slider-container {
    padding: 40px 10px;
  }
  
  .range-input {
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    appearance: none;
    outline: none;
  }
  
  .range-input::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    background: #a855f7;
    border-radius: 50%;
    cursor: pointer;
    border: 4px solid white;
    box-shadow: 0 0 0 2px #a855f7;
  }

  .slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 12px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* INPUT */
  .text-input {
    width: 100%;
    padding: 20px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    border: none;
    border-bottom: 4px solid #e2e8f0;
    outline: none;
    background: transparent;
    border-radius: 0;
  }
  
  .text-input:focus {
    border-color: #a855f7;
  }

  /* NAVIGATION */
  .nav-btn {
    margin-top: 30px;
    padding: 16px 32px;
    background: #0f172a;
    color: white;
    border: none;
    border-radius: 14px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
    transition: transform 0.2s;
  }
  
  .nav-btn:hover {
    transform: scale(1.05);
    background: #1e293b;
  }
  
  .nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* PROGRESS BAR */
  .progress-bg {
    width: 100%;
    height: 10px;
    background: rgba(0,0,0,0.1);
    border-radius: 10px;
    margin-bottom: 24px;
  }
  
  .progress-fill {
    height: 100%;
    background: white;
    border-radius: 10px;
    transition: width 0.5s ease;
  }

  /* INTRO & RESULTS SPECIFIC */
  .intro-icon {
    width: 100px;
    height: 100px;
    background: #fbbf24;
    border-radius: 50%;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    transform: rotate(-10deg);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  }

  .avatar-box {
    background: #f1f5f9;
    border-radius: 20px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    border: 5px solid white;
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.1);
    margin: 20px 0;
    overflow: hidden;
  }
  
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .start-btn {
    width: 100%;
    padding: 20px;
    background: #0f172a;
    color: white;
    font-size: 20px;
    font-weight: 700;
    border-radius: 16px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    transition: transform 0.1s;
  }
  
  .start-btn:active {
    transform: scale(0.98);
  }
`;

// --- DATA ---
const questions = [
  {
    id: 'mood',
    type: 'grid',
    title: "What's your current vibe?",
    options: [
      { id: 'fire', label: 'Fired Up', icon: Flame, color: '#f97316' },
      { id: 'rain', label: 'Chill Mode', icon: CloudRain, color: '#3b82f6' },
      { id: 'air', label: 'Flowing', icon: Wind, color: '#eab308' },
      { id: 'earth', label: 'Grounded', icon: Mountain, color: '#22c55e' },
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
      { id: 'coffee', label: 'Coffee', icon: Coffee, color: '#78350f' },
      { id: 'refresh', label: 'Fresh Bev', icon: Zap, color: '#db2777' },
      { id: 'water', label: 'Water', icon: Droplets, color: '#06b6d4' },
      { id: 'food', label: 'Food', icon: Utensils, color: '#ea580c' },
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
        setState(prev => ({ ...prev, status: 'results', results: { element: 'Fire', product: 'Snapple Peach Tea', desc: "Matches your spicy energy!", avatarUrl: null } }));
      }, 2000);
      setState(prev => ({ ...prev, status: 'analyzing' }));
    }
  };

  return (
    <div className="container">
      {/* INJECT CSS */}
      <style>{styles}</style>

      {/* --- INTRO SCREEN --- */}
      {state.status === 'intro' && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card">
            <div className="intro-icon">🥤</div>
            <h1 className="title" style={{ fontSize: '40px', marginBottom: '10px' }}>Find Your <span style={{ color: '#d946ef' }}>Flavor</span></h1>
            <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '30px' }}>Get your Element & AI Avatar in 60 seconds.</p>
            <button onClick={() => setState(prev => ({ ...prev, status: 'quiz' }))} className="start-btn">
              Start Quiz
            </button>
        </motion.div>
      )}

      {/* --- ANALYZING SCREEN --- */}
      {state.status === 'analyzing' && (
        <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }} className="animate-bounce">🔮</div>
            <h2 style={{ fontSize: '30px', fontWeight: '900' }}>Consulting the Oracle...</h2>
        </div>
      )}

      {/* --- RESULTS SCREEN --- */}
      {state.status === 'results' && state.results && (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card">
            <h1 className="title" style={{ fontSize: '50px', color: '#f97316', margin: '10px 0' }}>{state.results.element}</h1>
            <div className="avatar-box">
                {state.results.avatarUrl ? <img src={state.results.avatarUrl} className="avatar-img" /> : '🧑‍🎨'}
            </div>
            <div style={{ background: '#fff7ed', padding: '20px', borderRadius: '15px', border: '1px solid #ffedd5', marginTop: '20px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{state.results.product}</h2>
                <p style={{ color: '#475569', marginTop: '5px' }}>{state.results.desc}</p>
            </div>
            <button onClick={() => window.location.reload()} className="start-btn" style={{ background: '#e2e8f0', color: '#334155', marginTop: '20px' }}>Start Over</button>
        </motion.div>
      )}

      {/* --- QUIZ SCREEN --- */}
      {state.status === 'quiz' && (
        <div style={{ width: '100%', maxWidth: '450px' }}>
           {/* Progress Bar */}
           <div className="progress-bg">
             <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${((state.currentStep + 1) / questions.length) * 100}%` }} />
           </div>

           <AnimatePresence mode="wait">
             <motion.div 
               key={currentQ.id} 
               initial={{ x: 50, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               exit={{ x: -50, opacity: 0 }} 
               className="card"
               style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}
             >
               <h2 className="title">{currentQ.title}</h2>
               
               <div style={{ flexGrow: 1, width: '100%' }}>
                 
                 {/* 1. GRID LAYOUT */}
                 {currentQ.type === 'grid' && (
                   <div className="grid-2">
                     {currentQ.options?.map((opt) => (
                       <button key={opt.id} onClick={() => handleAnswer(opt.id)} 
                         className={`grid-btn ${state.answers[currentQ.id] === opt.id ? 'selected' : ''}`}
                       >
                         <opt.icon size={32} color={opt.color} />
                         <span className="grid-btn-label">{opt.label}</span>
                       </button>
                     ))}
                   </div>
                 )}

                 {/* 2. LIST LAYOUT */}
                 {currentQ.type === 'list' && (
                   <div className="list-stack">
                     {currentQ.options?.map((opt) => (
                       <button key={opt.id} onClick={() => handleAnswer(opt.id)} 
                         className={`list-btn ${state.answers[currentQ.id] === opt.id ? 'selected' : ''}`}
                       >
                         <span className="list-icon">{opt.icon}</span>
                         <span className="list-label">{opt.label}</span>
                         {state.answers[currentQ.id] === opt.id && <Check color="#a855f7" />}
                       </button>
                     ))}
                   </div>
                 )}

                 {/* 3. SLIDER */}
                 {currentQ.type === 'slider' && (
                   <div className="slider-container">
                     <input type="range" min="0" max="100" className="range-input" onChange={(e) => handleAnswer(e.target.value)} />
                     <div className="slider-labels">
                        <span>{currentQ.minLabel}</span><span>{currentQ.midLabel}</span><span>{currentQ.maxLabel}</span>
                     </div>
                   </div>
                 )}

                 {/* 4. RANK */}
                 {currentQ.type === 'rank' && (
                   <div className="grid-2">
                      {currentQ.options?.map((opt) => {
                        const rank = (state.answers[currentQ.id] || []).indexOf(opt.id);
                        return (
                          <button key={opt.id} 
                            onClick={() => { const current = state.answers[currentQ.id] || []; if (rank !== -1) { handleAnswer(current.filter(id => id !== opt.id)); } else { if (current.length < 3) handleAnswer([...current, opt.id]); } }} 
                            className={`grid-btn ${rank !== -1 ? 'selected' : ''}`}
                          >
                            <opt.icon size={24} style={{ marginBottom: '8px' }}/>
                            <span className="grid-btn-label">{opt.label}</span>
                            {rank !== -1 && <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#0f172a', color: 'white', width: '24px', height: '24px', borderRadius: '50%', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{rank + 1}</div>}
                          </button>
                        )
                      })}
                   </div>
                 )}

                 {/* 5. YES/NO */}
                 {currentQ.type === 'yes-no' && (
                   <div className="list-stack">
                     <button onClick={() => handleAnswer('yes')} className={`list-btn ${state.answers[currentQ.id] === 'yes' ? 'selected' : ''}`} style={{justifyContent: 'center', fontWeight: '900', fontSize: '20px'}}>
                       YES
                     </button>
                     <button onClick={() => handleAnswer('no')} className={`list-btn ${state.answers[currentQ.id] === 'no' ? 'selected' : ''}`} style={{justifyContent: 'center', fontWeight: '900', fontSize: '20px'}}>
                       NOPE
                     </button>
                     {state.answers[currentQ.id] && <div style={{ padding: '20px', background: '#f3e8ff', color: '#6b21a8', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', border: '1px solid #e9d5ff', marginTop: '20px' }}>💡 Fact: {currentQ.fact}</div>}
                   </div>
                 )}

                 {/* 6. INPUT */}
                 {currentQ.type === 'input' && <input type="text" placeholder={currentQ.placeholder} className="text-input" onChange={(e) => handleAnswer(e.target.value)} />}
               
               </div>

               <button 
                 onClick={nextStep} 
                 disabled={!state.answers[currentQ.id] && currentQ.type !== 'input' && currentQ.type !== 'slider'}
                 className="nav-btn"
               >
                 Next <ChevronUp size={20} style={{ transform: 'rotate(90deg)' }} />
               </button>

             </motion.div>
           </AnimatePresence>
        </div>
      )}
    </div>
  );
}
