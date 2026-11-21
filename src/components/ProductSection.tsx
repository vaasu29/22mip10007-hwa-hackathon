import { useState } from 'react';
import { playUnlockChime } from '../soundEffects';

export default function ProductSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      playUnlockChime();
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section id="shop" className="py-10 md:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Giant Crimson Banner matching Section 6 in the photo */}
      <div className="bg-[#CE1B3D] text-white rounded-[2.5rem] border-2 border-[#1E1E1E] p-8 sm:p-14 relative overflow-hidden text-center shadow-[6px_6px_0px_#1E1E1E]">
        
        {/* Top-Left Green Starburst Sticker matching photo */}
        <div className="absolute top-6 left-6 text-[#00C371] w-12 h-12">
          <svg viewBox="0 0 40 40" className="w-full h-full fill-current">
            <path d="M20 0 L23 13 L36 8 L27 19 L40 23 L28 29 L35 40 L22 34 L17 40 L16 28 L3 33 L11 22 L0 17 L12 13 L7 1 Z" />
          </svg>
        </div>

        {/* Top-Right Star Twinkle ✦ matching photo */}
        <div className="absolute top-8 right-10 text-[#00C371] text-2xl font-bold select-none">
          ✦
        </div>

        {/* Bottom-Right Purple Circle Sticker matching photo */}
        <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-[#C084FC] pointer-events-none" />

        {/* Bottom-Left Pink Squiggle matching photo */}
        <div className="absolute bottom-6 left-10 text-[#FFAEC0] w-20 h-4">
          <svg viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M5,10 Q25,0 45,10 T85,10" />
          </svg>
        </div>

        {/* Headline matching photo typography */}
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-3 leading-tight relative z-10">
          Become Part of PupSociety
        </h2>

        {/* Subtitle matching photo */}
        <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto mb-8 font-medium leading-relaxed relative z-10">
          Annual membership is $120 per year including quarterly print journals. Cancel anytime.
        </p>

        {/* White Pill Input & Submit Button matching photo */}
        {subscribed ? (
          <div className="inline-block bg-white text-[#1E1E1E] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full border-2 border-[#1E1E1E] shadow-sm relative z-10 animate-fade-in">
            🎉 Welcome to PupSociety! Check your email for Issue No. 01.
          </div>
        ) : (
          <form
            onSubmit={handleNewsletter}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto relative z-10"
          >
            <div className="w-full relative">
              <input
                type="email"
                required
                placeholder="✉ Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white text-[#1E1E1E] placeholder-[#1E1E1E]/50 text-xs sm:text-sm px-6 py-3.5 rounded-full border-2 border-[#1E1E1E] focus:outline-none shadow-sm font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-[#1E1E1E] font-black text-xs sm:text-sm px-6 py-3.5 rounded-full border-2 border-[#1E1E1E] shadow-sm shrink-0 cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <span>Join Today →</span>
            </button>
          </form>
        )}

      </div>

    </section>
  );
}
