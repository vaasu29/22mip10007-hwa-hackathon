import { useState } from 'react';
import { playSnapSound, playTreatDropSound, playSqueakSound, playUnlockChime } from '../soundEffects';

interface Step {
  id: string;
  number: string;
  title: string;
  action: string;
  description: string;
  color: string;
  details: string[];
}

const STEPS: Step[] = [
  {
    id: 'build',
    number: '01',
    title: 'Build',
    action: 'Connect the modules',
    color: 'bg-[#FFDFDF]',
    description:
      'Snap together interlocking base tiles and position your chosen challenge modules. Create a straight sprint, a zigzag puzzle trail, or a multi-branching exploration route in seconds.',
    details: [
      'Food-safe magnetic or snap-in module joints',
      'Choose path length based on play session goal',
      'No tools or complicated latches required',
    ],
  },
  {
    id: 'hide',
    number: '02',
    title: 'Hide',
    action: 'Place treats or scent rewards',
    color: 'bg-[#D2F4E2]',
    description:
      'Distribute kibble, scent items, or favorite treats along the path. Deposit intermediate rewards behind the sliding gate and reserve the high-value prize for the final reward chamber.',
    details: [
      'Nose-work scent pockets for natural sniffing',
      'Multiple treat depth levels for varied difficulty',
      'Compatible with dry kibble, freeze-dried treats, or aroma pads',
    ],
  },
  {
    id: 'explore',
    number: '03',
    title: 'Explore',
    action: 'Your dog sniffs, searches, pushes & solves',
    color: 'bg-[#EFE3FF]',
    description:
      'Release your dog to follow the trail. They use natural canine problem-solving instincts—sniffing the air, nudging gates with their nose, rotating disks with their paws, and crawling through tunnels.',
    details: [
      'Engages sight, smell, and tactile paw dexterity',
      'Self-directed pacing with positive incremental wins',
      'Builds independent confidence in problem-solving',
    ],
  },
  {
    id: 'discover',
    number: '04',
    title: 'Discover',
    action: 'The final reward is revealed',
    color: 'bg-[#FFDFDF]',
    description:
      'Navigating the complete sequence unlocks the grand finale chamber. The dog experiences the ultimate sense of completion, leaving them mentally satisfied and gently relaxed.',
    details: [
      'Satisfying physical click mechanism on final unlock',
      'Encourages calm post-play decompression',
      'Ready to be rearranged into a brand-new trail tomorrow',
    ],
  },
];

export default function HowItWorks() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS[activeStepIndex];

  const handleStepSelect = (idx: number) => {
    setActiveStepIndex(idx);
    if (idx === 0) playSnapSound();
    else if (idx === 1) playTreatDropSound();
    else if (idx === 2) playSqueakSound();
    else if (idx === 3) playUnlockChime();
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="bg-[#FFDFDF] border-2 border-[#1E1E1E] text-[#1E1E1E] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 inline-block shadow-xs">
          STEP-BY-STEP RITUAL
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1E1E1E] leading-tight mb-2">
          How Treasure Trails works
        </h2>
        <p className="text-xs sm:text-sm text-[#1E1E1E]/70 font-medium">
          From modular assembly to the final tail-wagging discovery—enrichment made effortless for you and endlessly exciting for your dog.
        </p>
      </div>

      {/* 4 Interactive Step Pill Buttons matching photo styling */}
      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-3 mb-10">
        {STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.id}
              onClick={() => handleStepSelect(idx)}
              className={`flex-1 min-w-[130px] p-4 rounded-2xl border-2 border-[#1E1E1E] text-left transition-all cursor-pointer ${
                isActive
                  ? `${step.color} shadow-pop scale-[1.02]`
                  : 'bg-white hover:bg-neutral-50 text-[#1E1E1E]'
              }`}
            >
              <span className="text-[10px] font-black font-mono text-[#CE1B3D] block mb-1">
                {step.number}
              </span>
              <span className="font-display font-black text-base text-[#1E1E1E] block leading-tight">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Detail Card with 2px border & studio visuals */}
      <div className="bg-white rounded-[2.5rem] border-2 border-[#1E1E1E] p-8 sm:p-12 shadow-pop grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Text & Action Details */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black text-[#CE1B3D] uppercase tracking-wider mb-2 font-mono">
              <span>STAGE {activeStep.number}</span>
              <span>•</span>
              <span>{activeStep.title}</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1E1E1E] mb-4 leading-tight">
              {activeStep.action}
            </h3>

            <p className="text-xs sm:text-sm text-[#1E1E1E]/80 font-medium leading-relaxed mb-6">
              {activeStep.description}
            </p>

            <ul className="space-y-2.5 mb-8">
              {activeStep.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#1E1E1E]">
                  <span className="w-5 h-5 rounded-full bg-[#D2F4E2] border border-[#1E1E1E] flex items-center justify-center text-[#00C371] shrink-0 font-bold">
                    ✓
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#1E1E1E]/20">
            <button
              onClick={() => handleStepSelect(Math.max(0, activeStepIndex - 1))}
              disabled={activeStepIndex === 0}
              className="px-4 py-2 rounded-full border-2 border-[#1E1E1E] text-xs font-bold text-[#1E1E1E] hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={() => handleStepSelect(Math.min(STEPS.length - 1, activeStepIndex + 1))}
              disabled={activeStepIndex === STEPS.length - 1}
              className="px-5 py-2 rounded-full bg-[#CE1B3D] hover:bg-[#B51634] text-white text-xs font-bold border-2 border-[#1E1E1E] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Next Stage →
            </button>
          </div>
        </div>

        {/* Right: Rounded Frame matching photo style */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full aspect-[4/3] rounded-3xl border-2 border-[#1E1E1E] overflow-hidden relative shadow-sm bg-[#D4F7DC] p-2">
            <img
              src={
                activeStepIndex === 0
                  ? '/images/modules-flatlay.jpg'
                  : activeStepIndex === 1
                  ? '/images/lifestyle-retriever.jpg'
                  : activeStepIndex === 2
                  ? '/images/lifestyle-beagle.jpg'
                  : '/images/trail-configured.jpg'
              }
              alt={activeStep.action}
              className="w-full h-full object-cover rounded-2xl cursor-pointer"
              onClick={() => handleStepSelect(activeStepIndex)}
            />
          </div>
        </div>

      </div>

    </section>
  );
}
