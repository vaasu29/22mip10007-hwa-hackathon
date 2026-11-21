import { useState } from 'react';
import { ADVENTURES, MODULES } from '../data';
import type { Adventure } from '../types';
import { useScrollTo } from '../hooks';
import { useCart } from '../CartContext';
import { playSnapSound, playTreatDropSound, playUnlockChime } from '../soundEffects';

export default function AdventureSelector() {
  const [selectedAdventureId, setSelectedAdventureId] = useState<string>('forest-quest');
  const [addedNotice, setAddedNotice] = useState(false);
  const scrollTo = useScrollTo();
  const { addItem } = useCart();

  const selectedAdventure = ADVENTURES.find(a => a.id === selectedAdventureId) || ADVENTURES[0];

  const adventureModules = selectedAdventure.modules.map(id => {
    return MODULES.find(m => m.id === id) || {
      id,
      name: id.replace('-', ' '),
      description: 'Modular challenge component',
      interactionType: 'Interactive',
      difficulty: 'Medium' as const,
      icon: '🧩',
      color: '#7a9e7e',
    };
  });

  const handleSelectAdventure = (id: string) => {
    playSnapSound();
    setSelectedAdventureId(id);
  };

  const handleAddAdventureToCart = (adv: Adventure) => {
    playTreatDropSound();
    playUnlockChime();
    addItem({
      id: `adventure-${adv.id}`,
      name: `Adventure Blueprint: ${adv.name}`,
      price: 2499,
      difficulty: adv.difficulty,
      modules: adv.modules.map(m => m.replace('-', ' ')),
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <section id="adventures" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="bg-[#FFDFDF] border-2 border-[#1E1E1E] text-[#1E1E1E] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 inline-block shadow-xs">
          RECONFIGURABLE BLUEPRINTS
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1E1E1E] leading-tight mb-2">
          Same modules. Completely different adventure.
        </h2>
        <p className="text-xs sm:text-sm text-[#1E1E1E]/70 font-medium">
          Swap challenge positions in under two minutes to reset the puzzle memory and keep your dog's curiosity at peak excitement.
        </p>
      </div>

      {/* 3 Adventure Selector Buttons matching photo */}
      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-4 mb-10">
        {ADVENTURES.map((adv, i) => {
          const isSelected = adv.id === selectedAdventureId;
          const cardColor = i === 0 ? 'bg-[#FFDFDF]' : i === 1 ? 'bg-[#D2F4E2]' : 'bg-[#EFE3FF]';

          return (
            <button
              key={adv.id}
              onClick={() => handleSelectAdventure(adv.id)}
              className={`flex-1 min-w-[200px] text-left p-5 rounded-3xl border-2 border-[#1E1E1E] transition-all cursor-pointer ${
                isSelected
                  ? `${cardColor} shadow-pop scale-[1.02]`
                  : 'bg-white hover:bg-neutral-50 text-[#1E1E1E]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-white border border-[#1E1E1E]">
                  {adv.difficulty}
                </span>
                <span className="text-xs font-mono font-bold text-[#1E1E1E]/70">
                  ⏱ {adv.estimatedTime}
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-[#1E1E1E] leading-tight">
                {adv.name}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Selected Adventure Detail Box */}
      <div className="bg-white rounded-[2.5rem] border-2 border-[#1E1E1E] p-8 sm:p-12 shadow-pop grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Story & Stage Breakdown */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[#CE1B3D] text-xs font-black uppercase tracking-wider mb-2 font-mono">
              <span>TRAIL PROFILE</span>
              <span>•</span>
              <span>{selectedAdventure.difficulty}</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1E1E1E] mb-3 leading-tight">
              {selectedAdventure.name}
            </h3>

            <p className="text-xs sm:text-sm text-[#1E1E1E]/80 font-medium leading-relaxed mb-6">
              {selectedAdventure.description}
            </p>

            {/* Sequence Pills */}
            <div className="space-y-2 mb-8">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1E1E1E]/70 block mb-1">
                Challenge Route Sequence:
              </span>
              {adventureModules.map((m, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-bold text-[#1E1E1E] bg-[#FDF8F3] px-3.5 py-2.5 rounded-2xl border border-[#1E1E1E]/20">
                  <span className="w-5 h-5 rounded-full bg-[#1E1E1E] text-white font-mono text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-lg">{m.icon}</span>
                  <span>{m.name}</span>
                  <span className="text-[10px] text-[#1E1E1E]/60 ml-auto">({m.interactionType})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#1E1E1E]/20">
            <button
              onClick={() => handleAddAdventureToCart(selectedAdventure)}
              className={`flex-1 py-3.5 px-5 rounded-full text-xs font-black border-2 border-[#1E1E1E] transition-all cursor-pointer shadow-pop-hover flex items-center justify-center gap-2 ${
                addedNotice
                  ? 'bg-[#00C371] text-white'
                  : 'bg-[#CE1B3D] hover:bg-[#B51634] text-white'
              }`}
            >
              {addedNotice ? 'Added to Cart! ✓' : `Add ${selectedAdventure.name} to Cart`}
            </button>

            <button
              onClick={() => {
                playSnapSound();
                scrollTo('trail-builder');
              }}
              className="py-3.5 px-5 rounded-full bg-white hover:bg-neutral-100 text-[#1E1E1E] text-xs font-black border-2 border-[#1E1E1E] transition-all cursor-pointer text-center"
            >
              Customize in Trail Builder →
            </button>
          </div>
        </div>

        {/* Right Column: Studio Configured Trail Shot */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full aspect-[4/3] rounded-3xl border-2 border-[#1E1E1E] overflow-hidden relative shadow-sm bg-[#D4F7DC] p-2">
            <img
              src="/images/trail-configured.jpg"
              alt="Treasure Trails assembled modular adventure route"
              className="w-full h-full object-cover rounded-2xl cursor-pointer"
              onClick={playSnapSound}
            />
            <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1 rounded-full border border-[#1E1E1E] text-[10px] font-bold text-[#1E1E1E]">
              Active Configuration: {selectedAdventure.name}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
