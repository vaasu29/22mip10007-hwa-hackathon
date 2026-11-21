import { useState } from 'react';
import { useScrollTo } from '../hooks';
import { playSnapSound } from '../soundEffects';

export default function Footer() {
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);
  const scrollTo = useScrollTo();

  const handleLinkClick = (title: string, body: string, scrollTarget?: string) => {
    playSnapSound();
    if (scrollTarget) {
      scrollTo(scrollTarget);
    } else {
      setModalContent({ title, body });
    }
  };

  return (
    <>
      <footer className="bg-[#230E10] text-white/80 pt-16 pb-12 border-t-2 border-[#1E1E1E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* 4-Column Grid matching bottom of photo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-white/10 text-xs">
            
            {/* Column 1: Editorial */}
            <div>
              <h4 className="font-display font-black text-sm text-white mb-3 tracking-tight">
                Editorial
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li>
                  <button
                    onClick={() => handleLinkClick('Journal', 'Our quarterly print journal features 164 pages of canine architecture and design.', 'curated-section')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Journal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('Essays', 'In-depth essays examining canine ethology, scent work, and domestic spaces.', 'editorial-section')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Essays
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('Photography', 'Archival large-format photography capturing dogs in modern living environments.', 'editorial-section')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Photography
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Objects */}
            <div>
              <h4 className="font-display font-black text-sm text-white mb-3 tracking-tight">
                Objects
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li>
                  <button
                    onClick={() => handleLinkClick('Collars', 'Handcrafted solid brass hardware collars made with organic webbing.', 'objects-section')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Collars
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('Leashes', 'Vegetable-tanned full-grain Tuscan leather leashes burnished by hand.', 'objects-section')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Leashes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('Ceramics', 'Weighted non-toxic stoneware bowls with lead-free food-safe glaze.', 'objects-section')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Ceramics
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Society */}
            <div>
              <h4 className="font-display font-black text-sm text-white mb-3 tracking-tight">
                Society
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li>
                  <button
                    onClick={() => handleLinkClick('Events', 'Private salon gatherings, launch parties, and scent-work clinics for members at 440 Brannan Street.')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('Membership', 'Annual membership includes 4 print journal volumes delivered to your doorstep for $120/yr.', 'shop')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Membership
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('FAQ', 'Shipping is worldwide. Membership can be paused or canceled at any time. Products have a lifetime warranty.')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="font-display font-black text-sm text-white mb-3 tracking-tight">
                Contact
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li>
                  <button
                    onClick={() => handleLinkClick('Editorial Desk', 'Submissions and letters: editor@pupsociety.com')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Editorial Desk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('Brannan Studio', 'San Francisco Atelier: 440 Brannan Street, San Francisco, CA 94107. Open Tue–Sat 10am–6pm.')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Brannan Studio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('Press Inquiries', 'Press, partnerships, and collaborations: press@pupsociety.com')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Press
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar matching photo */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/50">
            <div>
              © 2024 PupSociety. All rights reserved.
            </div>

            {/* Social Icons matching photo */}
            <div className="flex items-center gap-4 text-white/70">
              {/* Globe */}
              <button
                onClick={() => handleLinkClick('International Society', 'PupSociety is distributed to readers and dog companions in 38 countries.')}
                className="hover:text-white transition-colors cursor-pointer"
                title="International"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>

              {/* Chat */}
              <button
                onClick={() => handleLinkClick('Community Forum', 'Connect with fellow modern dog owners in our private Discord community.')}
                className="hover:text-white transition-colors cursor-pointer"
                title="Community"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>

              {/* Instagram/Camera */}
              <button
                onClick={() => handleLinkClick('Visual Journal', 'Follow @pupsociety on Instagram for daily canine architecture inspiration.')}
                className="hover:text-white transition-colors cursor-pointer"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Info Modal for Footer Links */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#FDF8F3] rounded-3xl border-2 border-[#1E1E1E] shadow-[6px_6px_0px_#1E1E1E] p-6 sm:p-8 max-w-md w-full relative text-[#1E1E1E]">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#1E1E1E] bg-white flex items-center justify-center text-xs font-black hover:bg-[#FFDFDF] cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CE1B3D]" />
              <h3 className="font-display font-black text-xl">{modalContent.title}</h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#1E1E1E]/80 leading-relaxed mb-6">
              {modalContent.body}
            </p>
            <button
              onClick={() => setModalContent(null)}
              className="w-full bg-[#1E1E1E] hover:bg-neutral-800 text-white font-black text-xs py-2.5 rounded-full border border-[#1E1E1E] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
