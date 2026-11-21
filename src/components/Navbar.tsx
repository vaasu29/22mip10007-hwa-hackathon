import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useDogVision } from '../DogVisionContext';
import { toggleSound, isSoundEnabled, playSnapSound, playUnlockChime } from '../soundEffects';
import { useScrollTo } from '../hooks';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<'discover' | 'gallery' | 'journal'>('discover');
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [joinEmail, setJoinEmail] = useState('');
  const [joinPlan, setJoinPlan] = useState<'annual' | 'monthly'>('annual');
  const [joinSuccess, setJoinSuccess] = useState(false);

  const { totalItems, toggleCart } = useCart();
  const { isDogVision, toggleDogVision } = useDogVision();
  const scrollTo = useScrollTo();
  const location = useLocation();

  const handleTabClick = (tab: 'discover' | 'gallery' | 'journal') => {
    setActiveTab(tab);
    playSnapSound();
    if (tab === 'discover') {
      if (location.pathname !== '/') {
        window.location.href = '/#curated-section';
      } else {
        scrollTo('curated-section');
      }
    } else if (tab === 'gallery') {
      setShowGalleryModal(true);
    } else if (tab === 'journal') {
      setShowJournalModal(true);
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signInEmail) {
      playUnlockChime();
      setIsSignedIn(true);
      setShowSignInModal(false);
    }
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinEmail) {
      playUnlockChime();
      setJoinSuccess(true);
      setTimeout(() => {
        setJoinSuccess(false);
        setShowJoinModal(false);
        setJoinEmail('');
      }, 2500);
    }
  };

  return (
    <>
      {/* Dog Vision Alert Banner (when active) */}
      {isDogVision && (
        <div className="bg-[#1E3A8A] text-[#FDE047] text-xs px-4 py-1.5 text-center font-bold sticky top-0 z-50 flex items-center justify-center gap-2 border-b-2 border-[#1E1E1E]">
          <span className="w-2 h-2 rounded-full bg-[#FDE047] animate-ping" />
          <span>Canine Dichromatic Spectrum Active (430nm & 575nm calibrated)</span>
          <button
            onClick={toggleDogVision}
            className="ml-2 underline hover:text-white cursor-pointer"
          >
            [Turn Off]
          </button>
        </div>
      )}

      {/* Floating Pill Header matching photo */}
      <header className="sticky top-5 z-40 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <div className="bg-white rounded-full border-2 border-[#1E1E1E] shadow-[3px_3px_0px_#1E1E1E] px-4 sm:px-6 py-2.5 flex items-center justify-between">
          
          {/* Left: Brand Logo & Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Logo with red dot */}
            <Link
              to="/"
              onClick={() => {
                setActiveTab('discover');
                playSnapSound();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <span className="w-3 h-3 rounded-full bg-[#CE1B3D] inline-block shrink-0 shadow-xs" />
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-[#1E1E1E]">
                PupSociety
              </span>
            </Link>

            {/* Nav Items */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => handleTabClick('discover')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'discover'
                    ? 'bg-[#1E1E1E] text-white shadow-xs'
                    : 'text-[#1E1E1E] hover:bg-neutral-100'
                }`}
              >
                Discover
              </button>

              <button
                onClick={() => handleTabClick('gallery')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#1E1E1E] text-white shadow-xs'
                    : 'text-[#1E1E1E] hover:bg-neutral-100'
                }`}
              >
                Gallery
              </button>

              <button
                onClick={() => handleTabClick('journal')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'journal'
                    ? 'bg-[#1E1E1E] text-white shadow-xs'
                    : 'text-[#1E1E1E] hover:bg-neutral-100'
                }`}
              >
                Journal
              </button>
            </nav>
          </div>

          {/* Right: Sign in & Join Society CTA & Utilities */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Sign in Button matching photo */}
            {isSignedIn ? (
              <span className="text-xs font-bold text-[#00C371] hidden sm:inline-flex items-center gap-1">
                <span>✓</span> Member
              </span>
            ) : (
              <button
                onClick={() => {
                  playSnapSound();
                  setShowSignInModal(true);
                }}
                className="text-xs font-bold text-[#1E1E1E] hover:text-[#CE1B3D] transition-colors cursor-pointer px-1 py-1"
              >
                Sign in
              </button>
            )}

            {/* Canine Vision Mode Toggle */}
            <button
              onClick={toggleDogVision}
              title="Toggle Canine Vision Mode"
              className={`hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#1E1E1E] transition-all cursor-pointer ${
                isDogVision
                  ? 'bg-blue-600 text-yellow-300'
                  : 'bg-[#FDF8F3] hover:bg-[#FFDFDF] text-[#1E1E1E]'
              }`}
            >
              <span>🐶 Dog View</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                const next = toggleSound();
                setSoundActive(next);
              }}
              title={soundActive ? 'Sound Effects Active' : 'Sound Muted'}
              className="p-1 text-xs text-[#1E1E1E] hover:text-[#CE1B3D] cursor-pointer"
            >
              {soundActive ? '🔊' : '🔇'}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                playSnapSound();
                toggleCart();
              }}
              className="relative p-1.5 text-[#1E1E1E] hover:text-[#CE1B3D] cursor-pointer flex items-center justify-center"
              aria-label="View Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#CE1B3D] text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Crimson Red Pill Action Button matching photo: "Join Society →" */}
            <button
              onClick={() => {
                playSnapSound();
                setShowJoinModal(true);
              }}
              className="bg-[#CE1B3D] hover:bg-[#B51634] text-white text-xs font-black px-4 sm:px-5 py-2 rounded-full border-2 border-[#1E1E1E] shadow-[2px_2px_0px_#1E1E1E] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer shrink-0"
            >
              <span>Join Society →</span>
            </button>
          </div>

        </div>
      </header>

      {/* 1. Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#FDF8F3] rounded-3xl border-2 border-[#1E1E1E] shadow-[6px_6px_0px_#1E1E1E] p-6 sm:p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#1E1E1E] bg-white flex items-center justify-center text-xs font-black hover:bg-[#FFDFDF] cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[#CE1B3D]" />
              <span className="font-display font-black text-xl text-[#1E1E1E]">PupSociety Member Portal</span>
            </div>
            <p className="text-xs text-[#1E1E1E]/70 mb-6 font-medium">
              Access your digital journal editions, studio reservations, and order history.
            </p>

            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-[#1E1E1E] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="doglover@pupsociety.com"
                  value={signInEmail}
                  onChange={e => setSignInEmail(e.target.value)}
                  className="w-full bg-white text-[#1E1E1E] px-4 py-2.5 rounded-full border-2 border-[#1E1E1E] text-xs font-medium focus:outline-none shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#1E1E1E] mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={e => setSignInPassword(e.target.value)}
                  className="w-full bg-white text-[#1E1E1E] px-4 py-2.5 rounded-full border-2 border-[#1E1E1E] text-xs font-medium focus:outline-none shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E1E1E] hover:bg-neutral-800 text-white font-black text-xs py-3 rounded-full border-2 border-[#1E1E1E] shadow-[2px_2px_0px_#1E1E1E] cursor-pointer transition-all"
              >
                Sign In to Society →
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#1E1E1E]/15 text-center text-[11px] text-[#1E1E1E]/60">
              Not a member yet?{' '}
              <button
                onClick={() => {
                  setShowSignInModal(false);
                  setShowJoinModal(true);
                }}
                className="font-black text-[#CE1B3D] underline cursor-pointer"
              >
                Join with annual print membership
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Join Society Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#FDF8F3] rounded-3xl border-2 border-[#1E1E1E] shadow-[6px_6px_0px_#1E1E1E] p-6 sm:p-8 max-w-lg w-full relative">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#1E1E1E] bg-white flex items-center justify-center text-xs font-black hover:bg-[#FFDFDF] cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#00C371] text-lg">✦</span>
              <span className="font-display font-black text-2xl text-[#1E1E1E]">Become Part of PupSociety</span>
            </div>
            <p className="text-xs text-[#1E1E1E]/70 mb-5 font-medium">
              Join an international society of design-conscious dog owners. Receive 4 quarterly archival print journals, private studio invitations, and exclusive artisan goods.
            </p>

            {joinSuccess ? (
              <div className="bg-[#D2F4E2] border-2 border-[#1E1E1E] p-6 rounded-2xl text-center shadow-xs">
                <span className="text-2xl block mb-2">🎉</span>
                <h4 className="font-display font-black text-lg text-[#1E1E1E] mb-1">Welcome to PupSociety!</h4>
                <p className="text-xs text-[#1E1E1E]/80 font-medium">
                  Your welcome folio and Issue No. 01 have been dispatched to {joinEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                {/* Plan Toggle */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div
                    onClick={() => setJoinPlan('annual')}
                    className={`p-3 rounded-2xl border-2 border-[#1E1E1E] cursor-pointer transition-all ${
                      joinPlan === 'annual'
                        ? 'bg-[#FFDFDF] shadow-[2px_2px_0px_#1E1E1E]'
                        : 'bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-[#1E1E1E]">Annual</span>
                      <span className="bg-[#00C371] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">POPULAR</span>
                    </div>
                    <p className="font-display font-black text-base text-[#1E1E1E]">$120 / year</p>
                    <p className="text-[10px] text-[#1E1E1E]/70">4 print journals + studio passes</p>
                  </div>

                  <div
                    onClick={() => setJoinPlan('monthly')}
                    className={`p-3 rounded-2xl border-2 border-[#1E1E1E] cursor-pointer transition-all ${
                      joinPlan === 'monthly'
                        ? 'bg-[#FFDFDF] shadow-[2px_2px_0px_#1E1E1E]'
                        : 'bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="text-xs font-black text-[#1E1E1E] mb-1">Monthly</div>
                    <p className="font-display font-black text-base text-[#1E1E1E]">$12 / month</p>
                    <p className="text-[10px] text-[#1E1E1E]/70">Digital access + event RSVP</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-[#1E1E1E] mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="architect@moderncanine.org"
                    value={joinEmail}
                    onChange={e => setJoinEmail(e.target.value)}
                    className="w-full bg-white text-[#1E1E1E] px-4 py-2.5 rounded-full border-2 border-[#1E1E1E] text-xs font-medium focus:outline-none shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#CE1B3D] hover:bg-[#B51634] text-white font-black text-xs py-3.5 rounded-full border-2 border-[#1E1E1E] shadow-[3px_3px_0px_#1E1E1E] cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>Complete Membership Enrollment →</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#FDF8F3] rounded-3xl border-2 border-[#1E1E1E] shadow-[6px_6px_0px_#1E1E1E] p-6 sm:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setShowGalleryModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#1E1E1E] bg-white flex items-center justify-center text-xs font-black hover:bg-[#FFDFDF] cursor-pointer"
            >
              ✕
            </button>

            <span className="bg-[#D2F4E2] border border-[#1E1E1E] text-[#1E1E1E] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-block">
              CURATED GALLERY
            </span>
            <h3 className="font-display font-black text-2xl text-[#1E1E1E] mb-2">
              Photographic Folio & Living Spaces
            </h3>
            <p className="text-xs text-[#1E1E1E]/70 mb-6 font-medium">
              Curated architectural spaces where high design harmonizes with canine instincts and modular play trails.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border-2 border-[#1E1E1E] overflow-hidden bg-white shadow-xs">
                <img src="/images/hero-product.jpg" alt="Treasure Trails in studio" className="w-full h-48 object-cover" />
                <div className="p-3">
                  <p className="font-black text-xs text-[#1E1E1E]">Modular Trail System No. 01</p>
                  <p className="text-[10px] text-[#1E1E1E]/60">Studio photograph on European White Oak</p>
                </div>
              </div>
              <div className="rounded-2xl border-2 border-[#1E1E1E] overflow-hidden bg-white shadow-xs">
                <img src="/images/lifestyle-retriever.jpg" alt="Golden Retriever at Scent Pod" className="w-full h-48 object-cover" />
                <div className="p-3">
                  <p className="font-black text-xs text-[#1E1E1E]">Scent Extraction Study</p>
                  <p className="text-[10px] text-[#1E1E1E]/60">Golden Retriever engaging with active scent pocket</p>
                </div>
              </div>
              <div className="rounded-2xl border-2 border-[#1E1E1E] overflow-hidden bg-white shadow-xs">
                <img src="/images/lifestyle-beagle.jpg" alt="Beagle on Sliding Gate" className="w-full h-48 object-cover" />
                <div className="p-3">
                  <p className="font-black text-xs text-[#1E1E1E]">Tactile Barrier Release</p>
                  <p className="text-[10px] text-[#1E1E1E]/60">Beagle unlocking sliding timber gate</p>
                </div>
              </div>
              <div className="rounded-2xl border-2 border-[#1E1E1E] overflow-hidden bg-white shadow-xs">
                <img src="/images/modules-flatlay.jpg" alt="Component Flatlay" className="w-full h-48 object-cover" />
                <div className="p-3">
                  <p className="font-black text-xs text-[#1E1E1E]">Knolling Components Breakdown</p>
                  <p className="text-[10px] text-[#1E1E1E]/60">5 interlocking food-safe modules</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Journal Modal */}
      {showJournalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#FDF8F3] rounded-3xl border-2 border-[#1E1E1E] shadow-[6px_6px_0px_#1E1E1E] p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setShowJournalModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#1E1E1E] bg-white flex items-center justify-center text-xs font-black hover:bg-[#FFDFDF] cursor-pointer"
            >
              ✕
            </button>

            <span className="bg-[#FFDFDF] border border-[#1E1E1E] text-[#1E1E1E] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-block">
              JOURNAL ISSUE NO. 04
            </span>
            <h3 className="font-display font-black text-2xl text-[#1E1E1E] mb-2">
              The Architecture of the Modern Trail
            </h3>
            <p className="text-xs text-[#1E1E1E]/70 mb-6 font-medium">
              By Dr. Sophia Chen, PhD in Canine Ethology & Sensory Cognition.
            </p>

            <div className="space-y-4 text-xs text-[#1E1E1E]/80 leading-relaxed font-medium">
              <p>
                When a canine encounters a fixed, unchanging puzzle, their olfactory receptors fire rapidly during the initial five minutes. However, by day three, the sequence has shifted from exploratory problem-solving to mere motor muscle memory.
              </p>
              <div className="p-4 bg-white rounded-2xl border-2 border-[#1E1E1E]">
                <p className="font-display font-black text-sm text-[#1E1E1E] mb-1">
                  “A trail that changes weekly exercises the olfactory cortex like an open forest path.”
                </p>
                <p className="text-[10px] text-[#1E1E1E]/60">— Issue No. 04 Editorial Feature</p>
              </div>
              <p>
                By introducing branching trails, rotating puzzle discs, and variable scent pods, owners transform everyday meal times into cognitive quests that satisfy innate hunting instincts without requiring miles of open land.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E1E1E]/15 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#1E1E1E]">Delivered quarterly with membership</span>
              <button
                onClick={() => {
                  setShowJournalModal(false);
                  setShowJoinModal(true);
                }}
                className="bg-[#CE1B3D] text-white text-xs font-black px-4 py-2 rounded-full border-2 border-[#1E1E1E] shadow-xs cursor-pointer"
              >
                Subscribe for $120/yr →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
