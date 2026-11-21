import { useState } from 'react';
import { playSnapSound, playSqueakSound } from '../soundEffects';

type HotspotKey = 'scent' | 'rotate' | 'slide' | 'explore' | 'reward';

interface HotspotInfo {
  key: HotspotKey;
  label: string;
  moduleName: string;
  category: string;
  description: string;
  material: string;
  dogAction: string;
  color: string;
}

const HOTSPOTS: Record<HotspotKey, HotspotInfo> = {
  scent: {
    key: 'scent',
    label: 'Scent Vents',
    moduleName: 'Scent Pocket Pod',
    category: 'Nose Work',
    description: 'Microporous aroma vents diffuse treat scent into the air, activating natural canine tracking instincts.',
    material: 'BPA-free food-contact safe ABS with silicone aroma seal',
    dogAction: 'Sniffs air currents, targets scent origin, nudges access pod',
    color: 'bg-[#FFDFDF]',
  },
  rotate: {
    key: 'rotate',
    label: 'Turntable Disc',
    moduleName: 'Rotating Puzzle Disc',
    category: 'Paw & Snout Dexterity',
    description: 'Precision dual-bearing turntable requiring alignment of internal opening slots to release hidden rewards.',
    material: 'Natural beech wood & durable matte polymer dial',
    dogAction: 'Spins disc using nose nudge or paw swipe to line up release notch',
    color: 'bg-[#D2F4E2]',
  },
  slide: {
    key: 'slide',
    label: 'Sliding Barrier',
    moduleName: 'Linear Sliding Gate',
    category: 'Push & Pull',
    description: 'Track-guided sliding barrier that locks progress until displaced, training cause-and-effect understanding.',
    material: 'Molded runner track with natural rubber stops',
    dogAction: 'Uses paw pad or nose push to slide barrier clear of path',
    color: 'bg-[#EFE3FF]',
  },
  explore: {
    key: 'explore',
    label: 'Passage Tunnel',
    moduleName: 'Arched Exploration Tunnel',
    category: 'Spatial Movement',
    description: 'Tactile canopy bridge that adds physical movement, requiring the dog to bend down or pass through.',
    material: 'Flexible non-shatter matte composite',
    dogAction: 'Crawls or extends snout beneath archway to continue along trail',
    color: 'bg-[#D2F4E2]',
  },
  reward: {
    key: 'reward',
    label: 'Jackpot Vault',
    moduleName: 'Final Reward Chamber',
    category: 'Grand Finale',
    description: 'Large treat reservoir with weighted hinge lid, providing the definitive dopamine completion signal.',
    material: 'Food-safe polymer with satisfying magnetic detent',
    dogAction: 'Flips open lid to claim the ultimate jackpot prize',
    color: 'bg-[#FFDFDF]',
  },
};

export default function ProductViewer() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotKey>('scent');
  const current = HOTSPOTS[activeHotspot];

  const handleSelectHotspot = (key: HotspotKey) => {
    setActiveHotspot(key);
    playSnapSound();
  };

  return (
    <section id="product-demo" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="bg-[#FFDFDF] border-2 border-[#1E1E1E] text-[#1E1E1E] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 inline-block shadow-xs">
          ANATOMY & ENGINEERING
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1E1E1E] leading-tight mb-2">
          Explore the modular hardware
        </h2>
        <p className="text-xs sm:text-sm text-[#1E1E1E]/70 font-medium">
          Select any challenge mechanism below to inspect the food-safe materials, tactile joints, and canine biomechanics.
        </p>
      </div>

      {/* Hotspot Pill Selectors */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {(Object.keys(HOTSPOTS) as HotspotKey[]).map(key => {
          const isSelected = activeHotspot === key;
          const h = HOTSPOTS[key];
          return (
            <button
              key={key}
              onClick={() => handleSelectHotspot(key)}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer border-2 border-[#1E1E1E] ${
                isSelected
                  ? `${h.color} shadow-pop scale-105`
                  : 'bg-white hover:bg-[#FFDFDF] text-[#1E1E1E]'
              }`}
            >
              <span>{h.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Canvas + Spec Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Studio Product Shot with Interactive Marker */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-4 sm:p-6 border-2 border-[#1E1E1E] shadow-pop relative overflow-hidden">
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#1E1E1E]/30 relative bg-[#D4F7DC]">
            <img
              src="/images/hero-product.jpg"
              alt="Treasure Trails studio product view"
              className="w-full h-full object-cover"
            />

            {/* Marker on product */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#CE1B3D] text-white text-xs font-black px-4 py-1.5 rounded-full border-2 border-[#1E1E1E] shadow-pop animate-bounce cursor-pointer" onClick={playSqueakSound}>
              {current.label} • Inspecting
            </div>
          </div>
        </div>

        {/* Right: Spec Breakdown Card in matching pastel */}
        <div className={`lg:col-span-5 ${current.color} rounded-[2.5rem] p-6 sm:p-8 border-2 border-[#1E1E1E] shadow-pop flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-black px-3 py-1 rounded-full bg-white border border-[#1E1E1E] text-[#1E1E1E]">
                {current.category}
              </span>
              <span className="text-xs font-black text-[#CE1B3D]">
                STUDIO SPEC
              </span>
            </div>

            <h3 className="font-display font-black text-2xl text-[#1E1E1E] mb-3 leading-snug">
              {current.moduleName}
            </h3>

            <p className="text-xs sm:text-sm text-[#1E1E1E]/80 font-medium leading-relaxed mb-6">
              {current.description}
            </p>

            <div className="space-y-4 pt-4 border-t-2 border-[#1E1E1E]/20 text-xs">
              <div>
                <span className="font-black uppercase tracking-wider text-[#1E1E1E]/60 text-[10px] block">
                  Material Composition
                </span>
                <p className="font-bold text-[#1E1E1E] mt-0.5">
                  {current.material}
                </p>
              </div>

              <div>
                <span className="font-black uppercase tracking-wider text-[#1E1E1E]/60 text-[10px] block">
                  Canine Problem-Solving Action
                </span>
                <p className="font-bold text-[#1E1E1E] mt-0.5">
                  {current.dogAction}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t-2 border-[#1E1E1E]/20 flex items-center justify-between text-[11px] font-black text-[#1E1E1E]">
            <span>100% Dishwasher Safe</span>
            <span className="text-[#00C371]">Food-Contact Certified</span>
          </div>
        </div>

      </div>

    </section>
  );
}
