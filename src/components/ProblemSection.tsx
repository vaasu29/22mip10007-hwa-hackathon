import { useState } from 'react';
import { playSnapSound, playUnlockChime } from '../soundEffects';

export default function ProblemSection() {
  const [activeModal, setActiveModal] = useState<'journal' | 'sustainable' | 'studio' | null>(null);

  const curatedCards = [
    {
      id: 'journal' as const,
      color: 'bg-[#FFDFDF]',
      iconColor: 'bg-[#CE1B3D]',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Quarterly Print Journal',
      desc: 'Immersive photography and essays delivered four times a year with annual membership.',
    },
    {
      id: 'sustainable' as const,
      color: 'bg-[#D2F4E2]',
      iconColor: 'bg-[#00C371]',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Sustainably Crafted Objects',
      desc: 'All featured accessories are sustainably crafted and ethically sourced for everyday adventures.',
    },
    {
      id: 'studio' as const,
      color: 'bg-[#EFE3FF]',
      iconColor: 'bg-[#A855F7]',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Brannan Street Studio',
      desc: 'Visit our San Francisco editorial office and gallery space at 440 Brannan Street.',
    },
  ];

  const handleCardClick = (id: 'journal' | 'sustainable' | 'studio') => {
    playSnapSound();
    setActiveModal(id);
  };

  return (
    <section id="curated-section" className="py-14 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Header matching photo */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1E1E1E] mb-3 leading-tight">
          Curated for the Modern Canine Lifestyle
        </h2>
        <p className="text-xs sm:text-sm text-[#1E1E1E]/70 font-medium leading-relaxed">
          Thoughtfully designed experiences and goods for dogs who appreciate the finer things.
        </p>
      </div>

      {/* 3 Pastel Cards in a row matching photo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {curatedCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(card.id)}
            className={`${card.color} rounded-3xl border-2 border-[#1E1E1E] p-7 shadow-[4px_4px_0px_#1E1E1E] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E1E1E] cursor-pointer transition-all flex flex-col justify-between`}
          >
            <div>
              {/* Top Icon Badge matching photo */}
              <div className={`w-10 h-10 rounded-2xl ${card.iconColor} border-2 border-[#1E1E1E] flex items-center justify-center mb-6 shadow-xs`}>
                {card.icon}
              </div>

              <h3 className="font-display font-black text-xl text-[#1E1E1E] mb-2.5 leading-snug">
                {card.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#1E1E1E]/80 leading-relaxed font-medium">
                {card.desc}
              </p>
            </div>
            
            <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-bold text-[#1E1E1E]/70">
              <span>Read details →</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E1E1E]" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modals for the 3 Curated Cards */}
      {activeModal === 'journal' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#FFDFDF] rounded-3xl border-2 border-[#1E1E1E] shadow-[6px_6px_0px_#1E1E1E] p-6 sm:p-8 max-w-lg w-full relative text-[#1E1E1E]">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#1E1E1E] bg-white flex items-center justify-center text-xs font-black hover:bg-neutral-100 cursor-pointer"
            >
              ✕
            </button>
            <div className="w-10 h-10 rounded-2xl bg-[#CE1B3D] border-2 border-[#1E1E1E] flex items-center justify-center mb-4 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-display font-black text-2xl mb-2">Quarterly Print Journal</h3>
            <p className="text-xs sm:text-sm font-medium mb-4 leading-relaxed">
              Printed on FSC-certified heavyweight uncoated paper in Frankfurt, each volume features photographic essays on architectural homes designed for dogs, interviews with European leathercraft artisans, and modular trail blueprints.
            </p>
            <div className="bg-white rounded-2xl border-2 border-[#1E1E1E] p-4 mb-4 text-xs font-medium space-y-1.5">
              <p>✦ 164 pages per volume with zero advertisements</p>
              <p>✦ Archival Smyth-sewn binding opens perfectly flat</p>
              <p>✦ Includes fold-out modular trail configuration blueprints</p>
            </div>
            <button
              onClick={() => {
                setActiveModal(null);
                const el = document.getElementById('shop');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-[#CE1B3D] hover:bg-[#B51634] text-white font-black text-xs py-3 rounded-full border-2 border-[#1E1E1E] shadow-sm cursor-pointer"
            >
              Subscribe with Membership ($120/yr) →
            </button>
          </div>
        </div>
      )}

      {activeModal === 'sustainable' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#D2F4E2] rounded-3xl border-2 border-[#1E1E1E] shadow-[6px_6px_0px_#1E1E1E] p-6 sm:p-8 max-w-lg w-full relative text-[#1E1E1E]">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#1E1E1E] bg-white flex items-center justify-center text-xs font-black hover:bg-neutral-100 cursor-pointer"
            >
              ✕
            </button>
            <div className="w-10 h-10 rounded-2xl bg-[#00C371] border-2 border-[#1E1E1E] flex items-center justify-center mb-4 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-display font-black text-2xl mb-2">Sustainably Crafted Objects</h3>
            <p className="text-xs sm:text-sm font-medium mb-4 leading-relaxed">
              We exclusively utilize food-grade BPA/phthalate-free polymers, natural Tuscan vegetable-tanned leather, solid unlacquered brass, and certified sustainably harvested German beech wood.
            </p>
            <div className="bg-white rounded-2xl border-2 border-[#1E1E1E] p-4 mb-4 text-xs font-medium space-y-1.5">
              <p>✦ Non-toxic dishwasher safe food compartments</p>
              <p>✦ 100% recyclable mono-material modular trail connectors</p>
              <p>✦ Lifetime guarantee on all structural locking joints</p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full bg-[#1E1E1E] hover:bg-neutral-800 text-white font-black text-xs py-3 rounded-full border-2 border-[#1E1E1E] shadow-sm cursor-pointer"
            >
              Close Material Specifications
            </button>
          </div>
        </div>
      )}

      {activeModal === 'studio' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#EFE3FF] rounded-3xl border-2 border-[#1E1E1E] shadow-[6px_6px_0px_#1E1E1E] p-6 sm:p-8 max-w-lg w-full relative text-[#1E1E1E]">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#1E1E1E] bg-white flex items-center justify-center text-xs font-black hover:bg-neutral-100 cursor-pointer"
            >
              ✕
            </button>
            <div className="w-10 h-10 rounded-2xl bg-[#A855F7] border-2 border-[#1E1E1E] flex items-center justify-center mb-4 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-display font-black text-2xl mb-2">Brannan Street Studio</h3>
            <p className="text-xs sm:text-sm font-medium mb-4 leading-relaxed">
              Located in the historic South of Market district in San Francisco, our studio houses our editorial newsroom, physical prototyping workshop, and canine trial obstacle testing course.
            </p>
            <div className="bg-white rounded-2xl border-2 border-[#1E1E1E] p-4 mb-4 text-xs font-medium space-y-1.5">
              <p>📍 440 Brannan Street, San Francisco, CA 94107</p>
              <p>⏱ Tuesday – Saturday: 10:00 AM – 6:00 PM</p>
              <p>☕ Complimentary pour-over coffee & fresh organic dog biscuits</p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full bg-[#1E1E1E] hover:bg-neutral-800 text-white font-black text-xs py-3 rounded-full border-2 border-[#1E1E1E] shadow-sm cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
