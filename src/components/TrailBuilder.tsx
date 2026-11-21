import { useState, useMemo } from 'react';
import { MODULES } from '../data';
import type { Module, Difficulty, Duration } from '../types';
import { useCart } from '../CartContext';
import { playSnapSound, playTreatDropSound, playUnlockChime, playSqueakSound } from '../soundEffects';

export default function TrailBuilder() {
  const { addItem } = useCart();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Adventurer');
  const [selectedDuration, setSelectedDuration] = useState<Duration>('Long Trail');
  
  // Default module selection
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([
    'scent-pocket',
    'tunnel',
    'sliding-gate',
    'rotating-puzzle',
    'hidden-treasure',
  ]);

  const [addedFeedback, setAddedFeedback] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeSimIndex, setActiveSimIndex] = useState<number | null>(null);

  // Toggle a module in/out of the trail
  const toggleModule = (id: string) => {
    playSnapSound();
    setSelectedModuleIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 2) return prev; // Keep at least 2 modules
        return prev.filter(mId => mId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Preset difficulty handlers
  const handleDifficultyPreset = (diff: Difficulty) => {
    playSnapSound();
    setSelectedDifficulty(diff);
    if (diff === 'Explorer') {
      setSelectedModuleIds(['scent-pocket', 'tunnel', 'hidden-treasure']);
      setSelectedDuration('Quick Quest');
    } else if (diff === 'Adventurer') {
      setSelectedModuleIds(['scent-pocket', 'tunnel', 'sliding-gate', 'rotating-puzzle', 'hidden-treasure']);
      setSelectedDuration('Long Trail');
    } else if (diff === 'Master') {
      setSelectedModuleIds(['scent-pocket', 'sliding-gate', 'rotating-puzzle', 'branching-path', 'paw-button', 'final-treasure']);
      setSelectedDuration('Ultimate Hunt');
    }
  };

  // Reorder modules
  const moveModule = (index: number, direction: 'left' | 'right') => {
    playSnapSound();
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= selectedModuleIds.length) return;
    
    const newArr = [...selectedModuleIds];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;
    setSelectedModuleIds(newArr);
  };

  // Active module objects in order
  const activeModules = useMemo(() => {
    return selectedModuleIds
      .map(id => MODULES.find(m => m.id === id))
      .filter((m): m is Module => m !== undefined);
  }, [selectedModuleIds]);

  // Calculations
  const challengeCount = activeModules.length;
  const estimatedSetupMin = Math.max(2, Math.round(challengeCount * 0.8));
  const estimatedSetupMax = Math.max(3, Math.round(challengeCount * 1.3));

  const basePrice = 2499;
  const extraModulesCount = Math.max(0, challengeCount - 5);
  const totalPrice = basePrice + extraModulesCount * 299;

  // Add configuration to cart
  const handleAddToCart = () => {
    playTreatDropSound();
    playUnlockChime();
    const customConfigId = `custom-trail-${selectedDifficulty.toLowerCase()}-${Date.now()}`;
    const moduleNames = activeModules.map(m => m.name);

    addItem({
      id: customConfigId,
      name: `Custom Trail (${selectedDifficulty} — ${challengeCount} Challenges)`,
      price: totalPrice,
      difficulty: selectedDifficulty,
      modules: moduleNames,
    });

    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 3000);
  };

  // Interactive Trail Simulator Run (Step-by-step dog test)
  const handleSimulateTrail = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveSimIndex(0);
    playSqueakSound();

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < activeModules.length) {
        setActiveSimIndex(step);
        playSnapSound();
      } else {
        clearInterval(interval);
        playUnlockChime();
        setTimeout(() => {
          setIsSimulating(false);
          setActiveSimIndex(null);
        }, 1200);
      }
    }, 900);
  };

  return (
    <section id="trail-builder" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="bg-[#FFDFDF] border-2 border-[#1E1E1E] text-[#1E1E1E] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 inline-block shadow-xs">
          CUSTOM ATELIER
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1E1E1E] leading-tight mb-2">
          Build your dog's next adventure
        </h2>
        <p className="text-xs sm:text-sm text-[#1E1E1E]/70 font-medium">
          Select challenge components, adjust sequence order, and test how your dog will navigate the trail with live sensory feedback.
        </p>
      </div>

      {/* Builder Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Configuration Controls (Neo-Brutalist Soft Warm) */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-[#1E1E1E] shadow-pop space-y-8">
          
          {/* 1. Difficulty Level Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-[#1E1E1E]">
                1. Choose Difficulty
              </label>
              <span className="text-[11px] text-[#1E1E1E]/60 font-medium">Puzzle level</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['Explorer', 'Adventurer', 'Master'] as Difficulty[]).map(diff => {
                const isSelected = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => handleDifficultyPreset(diff)}
                    className={`py-3 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer text-center border-2 border-[#1E1E1E] ${
                      isSelected
                        ? 'bg-[#1E1E1E] text-white shadow-xs'
                        : 'bg-[#FDF8F3] hover:bg-[#FFDFDF] text-[#1E1E1E]'
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Play Duration Goal */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-[#1E1E1E]">
                2. Choose Duration
              </label>
              <span className="text-[11px] text-[#1E1E1E]/60 font-medium">Session pacing</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['Quick Quest', 'Long Trail', 'Ultimate Hunt'] as Duration[]).map(dur => {
                const isSelected = selectedDuration === dur;
                return (
                  <button
                    key={dur}
                    onClick={() => {
                      playSnapSound();
                      setSelectedDuration(dur);
                    }}
                    className={`py-2.5 px-2 rounded-2xl text-xs font-bold transition-all cursor-pointer text-center border-2 border-[#1E1E1E] ${
                      isSelected
                        ? 'bg-[#CE1B3D] text-white shadow-xs'
                        : 'bg-[#FDF8F3] hover:bg-[#FFDFDF] text-[#1E1E1E]'
                    }`}
                  >
                    {dur}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Module Toggles */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-[#1E1E1E]">
                3. Select & Toggle Modules
              </label>
              <span className="text-xs font-bold text-[#CE1B3D]">
                {selectedModuleIds.length} of {MODULES.length} active
              </span>
            </div>
            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {MODULES.map(module => {
                const isChecked = selectedModuleIds.includes(module.id);
                return (
                  <div
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#D2F4E2] border-[#1E1E1E] shadow-xs'
                        : 'bg-white border-[#1E1E1E]/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{module.icon}</span>
                      <div>
                        <p className="text-xs font-black text-[#1E1E1E] leading-tight">
                          {module.name}
                        </p>
                        <span className="text-[10px] text-[#1E1E1E]/70 font-medium">
                          {module.interactionType}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-white border border-[#1E1E1E]">
                        {module.difficulty}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-colors ${
                          isChecked
                            ? 'bg-[#1E1E1E] border-[#1E1E1E] text-white'
                            : 'bg-white border-[#1E1E1E]'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Virtual Trail Visualization Canvas */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Virtual Trail Canvas Card */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-[#1E1E1E] shadow-pop relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="font-display font-black text-2xl text-[#1E1E1E]">
                  Your Trail Route Sequence
                </h3>
                <p className="text-xs text-[#1E1E1E]/70 font-medium">
                  Click arrows to re-order stages or run test simulation
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Simulate Dog Run Button */}
                <button
                  onClick={handleSimulateTrail}
                  disabled={isSimulating}
                  className="px-3.5 py-1.5 rounded-full bg-[#CE1B3D] hover:bg-[#B51634] text-white font-extrabold text-xs border-2 border-[#1E1E1E] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <span>{isSimulating ? '🐾 Running Trail...' : '▶ Simulate Dog Run'}</span>
                </button>

                <span className="px-3 py-1 rounded-full bg-[#1E1E1E] text-white text-xs font-bold">
                  {selectedDifficulty}
                </span>
              </div>
            </div>

            {/* Dynamic Trail Nodes Sequence */}
            <div className="relative py-2">
              <div className="flex flex-col space-y-2.5">
                {activeModules.map((module, idx) => {
                  const isFirst = idx === 0;
                  const isLast = idx === activeModules.length - 1;
                  const isSimActive = isSimulating && activeSimIndex === idx;

                  return (
                    <div key={`${module.id}-${idx}`} className="relative group">
                      <div
                        className={`rounded-2xl p-3.5 border-2 transition-all duration-200 flex items-center justify-between ${
                          isSimActive
                            ? 'bg-[#FFDFDF] border-[#1E1E1E] shadow-md scale-102 ring-2 ring-[#CE1B3D]'
                            : 'bg-[#FDF8F3] border-[#1E1E1E] shadow-xs hover:bg-white'
                        }`}
                      >
                        {/* Step Number & Icon */}
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full font-mono text-xs font-bold flex items-center justify-center border-2 border-[#1E1E1E] ${
                              isSimActive
                                ? 'bg-[#CE1B3D] text-white'
                                : 'bg-white text-[#1E1E1E]'
                            }`}
                          >
                            {isSimActive ? '🐾' : idx + 1}
                          </span>
                          <span className="text-2xl">{module.icon}</span>
                          <div>
                            <p className="text-xs font-black text-[#1E1E1E]">
                              {module.name}
                            </p>
                            <p className="text-[10px] text-[#1E1E1E]/70 font-medium">
                              {module.interactionType}
                            </p>
                          </div>
                        </div>

                        {/* Reordering and Actions */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => moveModule(idx, 'left')}
                            disabled={isFirst}
                            aria-label="Move module earlier in trail"
                            className="w-7 h-7 rounded-lg bg-white border border-[#1E1E1E] text-[#1E1E1E] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors font-bold text-xs"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveModule(idx, 'right')}
                            disabled={isLast}
                            aria-label="Move module later in trail"
                            className="w-7 h-7 rounded-lg bg-white border border-[#1E1E1E] text-[#1E1E1E] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors font-bold text-xs"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => toggleModule(module.id)}
                            aria-label="Remove module from trail"
                            className="w-7 h-7 rounded-lg bg-[#FFDFDF] border border-[#1E1E1E] text-[#CE1B3D] flex items-center justify-center cursor-pointer transition-colors font-bold text-xs ml-1"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Connector down to next node */}
                      {!isLast && (
                        <div className="flex justify-center my-0.5">
                          <div className="w-0.5 h-3 bg-[#1E1E1E]/40 border-l border-dashed border-[#1E1E1E]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trail Summary Stats Bar */}
            <div className="mt-6 pt-5 border-t-2 border-[#1E1E1E]/20 grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#D2F4E2] p-3 rounded-2xl border-2 border-[#1E1E1E]">
                <span className="text-[9px] uppercase font-black text-[#1E1E1E]/70 block">
                  Challenges
                </span>
                <span className="font-display font-black text-lg text-[#1E1E1E]">
                  {challengeCount} Stages
                </span>
              </div>
              <div className="bg-[#EFE3FF] p-3 rounded-2xl border-2 border-[#1E1E1E]">
                <span className="text-[9px] uppercase font-black text-[#1E1E1E]/70 block">
                  Est. Setup
                </span>
                <span className="font-display font-black text-lg text-[#1E1E1E]">
                  {estimatedSetupMin}–{estimatedSetupMax} min
                </span>
              </div>
              <div className="bg-[#FFDFDF] p-3 rounded-2xl border-2 border-[#1E1E1E]">
                <span className="text-[9px] uppercase font-black text-[#1E1E1E]/70 block">
                  Score
                </span>
                <span className="font-display font-black text-lg text-[#CE1B3D]">
                  {challengeCount >= 6 ? 'Master 🌟' : 'High 🌿'}
                </span>
              </div>
            </div>
          </div>

          {/* Add Configuration to Cart Footer Card */}
          <div className="bg-[#FFDFDF] p-6 rounded-3xl border-2 border-[#1E1E1E] shadow-pop flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-[#1E1E1E]/70 uppercase font-black tracking-wider">
                Configured Trail Kit
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-3xl text-[#1E1E1E]">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
                {extraModulesCount > 0 && (
                  <span className="text-[11px] text-[#1E1E1E]/70 font-bold">
                    (+{extraModulesCount} extra modules)
                  </span>
                )}
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                className={`w-full sm:w-auto px-7 py-3.5 rounded-full font-black text-xs transition-all duration-200 border-2 border-[#1E1E1E] shadow-pop-hover flex items-center justify-center gap-2 cursor-pointer ${
                  addedFeedback
                    ? 'bg-[#00C371] text-white'
                    : 'bg-[#CE1B3D] hover:bg-[#B51634] text-white'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <span>Added to Cart! ✓</span>
                  </>
                ) : (
                  <>
                    <span>Add this configuration to cart</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
