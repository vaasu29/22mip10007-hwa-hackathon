import { useState } from 'react';
import { useScrollTo } from '../hooks';
import { playSnapSound, playSqueakSound, playUnlockChime } from '../soundEffects';

export default function Hero() {
  const [showPhoto, setShowPhoto] = useState(false);
  const [heartCount, setHeartCount] = useState(48);
  const [hasLiked, setHasLiked] = useState(false);
  const scrollTo = useScrollTo();

  const handleExploreClick = () => {
    playSnapSound();
    scrollTo('curated-section');
  };

  const handleHeartClick = () => {
    playSqueakSound();
    if (!hasLiked) {
      setHeartCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const toggleFrameContent = () => {
    playSnapSound();
    setShowPhoto(prev => !prev);
  };

  return (
    <section className="pt-10 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Headline & Editorial Content matching photo */}
        <div className="lg:col-span-6 relative">
          
          {/* Green Starburst Sticker (top-left) matching photo */}
          <div className="mb-5 inline-block animate-subtle-float">
            <svg viewBox="0 0 40 40" className="w-11 h-11 text-[#00C371] fill-current">
              <path d="M20 0 L23 13 L36 8 L27 19 L40 23 L28 29 L35 40 L22 34 L17 40 L16 28 L3 33 L11 22 L0 17 L12 13 L7 1 Z" />
            </svg>
          </div>

          {/* Main Headline matching photo: Chunky, Bold, Serif Display */}
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-[4.2rem] leading-[1.02] tracking-tight text-[#1E1E1E] mb-6">
            Where<br />
            Modern<br />
            Design Meets<br />
            the Canine Life
          </h1>

          {/* Subtitle Copy matching photo */}
          <p className="text-sm sm:text-base text-[#1E1E1E]/80 leading-relaxed max-w-lg mb-8 font-medium">
            An independent publication and curated goods atelier celebrating canine companionship.
          </p>

          {/* Red Pill CTA Button matching photo */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <button
              onClick={handleExploreClick}
              className="bg-[#CE1B3D] hover:bg-[#B51634] text-white font-black text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2 border-2 border-[#1E1E1E] shadow-[3px_3px_0px_#1E1E1E] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer transition-all"
            >
              <span>Explore Journal... →</span>
            </button>
          </div>

          {/* Wavy Pink Doodle Line matching photo */}
          <div className="text-[#FFAEC0] w-28 h-5">
            <svg viewBox="0 0 120 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M5,12 Q30,0 55,12 T110,12" />
            </svg>
          </div>
        </div>

        {/* Right Column: Giant Rounded Mint Green Frame with Badges matching photo */}
        <div className="lg:col-span-6 relative flex justify-center">
          
          {/* Mint Green Rounded Frame matching photo */}
          <div className="w-full max-w-lg aspect-[4/3] rounded-[2.5rem] border-2 border-[#1E1E1E] bg-[#D4F7DC] relative p-4 shadow-[6px_6px_0px_#1E1E1E] flex items-center justify-center overflow-hidden group">
            
            {/* Top-Right Heart Badge matching photo */}
            <button
              onClick={handleHeartClick}
              title="Love this design"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#00C371] border-2 border-[#1E1E1E] text-white flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Bottom-Left Sparkle Badge matching photo */}
            <button
              onClick={() => {
                playUnlockChime();
                toggleFrameContent();
              }}
              title="Toggle Photo / Canvas"
              className="absolute bottom-4 left-4 z-20 w-8 h-8 rounded-full bg-[#C084FC] border-2 border-[#1E1E1E] text-white flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            >
              <span className="text-xs font-black">✦</span>
            </button>

            {/* Center Crosshair Target Indicator matching photo */}
            <button
              onClick={toggleFrameContent}
              title="Click crosshair to view product photo"
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#1E1E1E] flex items-center justify-center bg-white/40 backdrop-blur-xs group-hover:scale-110 group-hover:bg-white transition-all shadow-xs">
                {/* Crosshair SVG matching photo */}
                <svg className="w-6 h-6 text-[#1E1E1E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="7" />
                  <line x1="12" y1="2" x2="12" y2="7" />
                  <line x1="12" y1="17" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="7" y2="12" />
                  <line x1="17" y1="12" x2="22" y2="12" />
                </svg>
              </div>
            </button>

            {/* Optional Photo Layer inside Frame */}
            {showPhoto ? (
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-[#1E1E1E]/40 relative bg-white animate-fade-in">
                <img
                  src="/images/hero-product.jpg"
                  alt="Treasure Trails Modular Dog Enrichment System on Scandinavian Hardwood"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={toggleFrameContent}
                />
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-[#1E1E1E] text-[10px] font-bold text-[#1E1E1E]">
                  Modular System No. 01 (Click to flip)
                </div>
              </div>
            ) : (
              /* Clean Minimalist Editorial Frame matching photo */
              <div
                onClick={toggleFrameContent}
                className="w-full h-full rounded-[2rem] flex items-center justify-center cursor-pointer"
              >
                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1E] bg-white/80 px-3 py-1 rounded-full border border-[#1E1E1E]">
                    Click to view Atelier Objects
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
