import { useState } from 'react';
import { useCart } from '../CartContext';
import { playSnapSound, playTreatDropSound, playUnlockChime } from '../soundEffects';

interface AtelierProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  priceDisplay: string;
  material: string;
  description: string;
  badge?: string;
  image: string;
}

const ATELIER_GOODS: AtelierProduct[] = [
  {
    id: 'leather-leash',
    name: 'Vegetable-Tanned Italian Leather Leash',
    category: 'Leather Goods',
    price: 1899,
    priceDisplay: '₹1,899 ($85)',
    material: 'Tuscan full-grain leather, hand-burnished edges, solid brass clip',
    description: 'A supple, balanced lead that gains a rich honey patina over years of daily city and forest walks.',
    badge: 'HEIRLOOM',
    image: '/images/lifestyle-retriever.jpg',
  },
  {
    id: 'brass-collar',
    name: 'Solid Brass Hardware Collar',
    category: 'Hardware & Webbing',
    price: 1499,
    priceDisplay: '₹1,499 ($65)',
    material: 'Sand-cast solid brass buckle and D-ring, organic cotton webbing',
    description: 'Constructed to withstand salt water, mud, and intense leash tension with zero rust or fraying.',
    badge: 'CLASSIC',
    image: '/images/lifestyle-beagle.jpg',
  },
  {
    id: 'ceramic-bowl',
    name: 'Non-Toxic Heavy Ceramic Bowl',
    category: 'Dining & Ceramics',
    price: 1299,
    priceDisplay: '₹1,299 ($55)',
    material: 'High-fire stoneware, food-safe matte cream glaze, lead-free',
    description: 'Weighted base prevents playful snout tipping and sliding across hardwood kitchen floors.',
    badge: 'STUDIO CRAFT',
    image: '/images/hero-product.jpg',
  },
  {
    id: 'modular-kit',
    name: 'Treasure Trails Modular Adventure System',
    category: 'Modular Enrichment',
    price: 2499,
    priceDisplay: '₹2,499 ($120)',
    material: 'Food-safe BPA-free polymer, beech wood accents, amber dials',
    description: 'Complete 6-module reconfigurable scent, sliding, and rotating trail system.',
    badge: 'ORIGINAL SYSTEM',
    image: '/images/modules-flatlay.jpg',
  },
];

export default function ModuleShowcase() {
  const [showGoodsDrawer, setShowGoodsDrawer] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const { addItem, toggleCart } = useCart();

  const handleAddToCart = (product: AtelierProduct) => {
    playTreatDropSound();
    playUnlockChime();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      difficulty: product.category,
    });
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const toggleFramePhoto = () => {
    playSnapSound();
    setShowPhoto(prev => !prev);
  };

  return (
    <section id="objects-section" className="py-14 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* 2-Column Section matching Section 3 in photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Rounded Lavender Frame matching photo */}
        <div className="lg:col-span-6 relative flex justify-center">
          
          {/* Lavender Rounded Frame matching photo */}
          <div className="w-full max-w-lg aspect-[4/3] rounded-[2.5rem] border-2 border-[#1E1E1E] bg-[#EAE0F5] relative p-4 shadow-[6px_6px_0px_#1E1E1E] flex items-center justify-center overflow-hidden group">
            
            {/* Center Crosshair Target Indicator matching photo */}
            <button
              onClick={toggleFramePhoto}
              title="Click crosshair to view flat-lay photography"
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#1E1E1E] flex items-center justify-center bg-white/40 backdrop-blur-xs group-hover:scale-110 group-hover:bg-white transition-all shadow-xs">
                <svg className="w-6 h-6 text-[#1E1E1E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="7" />
                  <line x1="12" y1="2" x2="12" y2="7" />
                  <line x1="12" y1="17" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="7" y2="12" />
                  <line x1="17" y1="12" x2="22" y2="12" />
                </svg>
              </div>
            </button>

            {/* Bottom-Right Green Circular Badge matching photo */}
            <button
              onClick={() => {
                playSnapSound();
                setShowGoodsDrawer(true);
              }}
              title="Open Goods Catalog"
              className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-[#00C371] border-2 border-[#1E1E1E] text-white flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-95 transition-transform"
            >
              {/* Green badge icon (paw or leaf) matching photo */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </button>

            {/* Photo or Minimalist Editorial Frame matching photo */}
            {showPhoto ? (
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-[#1E1E1E]/40 relative bg-white animate-fade-in">
                <img
                  src="/images/modules-flatlay.jpg"
                  alt="PupSociety Atelier Objects and Modular Components"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={toggleFramePhoto}
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-[#1E1E1E] text-[10px] font-bold text-[#1E1E1E]">
                  Knolling Catalog Flatlay No. 03 (Click to flip)
                </div>
              </div>
            ) : (
              <div
                onClick={toggleFramePhoto}
                className="w-full h-full rounded-[2rem] flex items-center justify-center cursor-pointer"
              >
                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1E] bg-white/80 px-3 py-1 rounded-full border border-[#1E1E1E]">
                    Click to view Atelier Flatlay
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Atelier & Goods Content matching photo */}
        <div className="lg:col-span-6">
          
          {/* Tag matching photo */}
          <div className="mb-3">
            <span className="bg-[#FFDFDF] border-2 border-[#1E1E1E] text-[#1E1E1E] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full inline-block shadow-xs">
              ATELIER & GOODS
            </span>
          </div>

          {/* Heading matching photo */}
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1E1E1E] mb-4 leading-tight">
            Objects Designed for Life Beside Your Dog
          </h2>

          {/* Paragraph matching photo */}
          <p className="text-xs sm:text-sm text-[#1E1E1E]/80 font-medium leading-relaxed mb-6">
            We partner with independent makers to produce heirloom quality accessories. Every piece balances aesthetic refinement with everyday durability.
          </p>

          {/* 3 Bullet Points with Colored Solid Dots matching photo */}
          <div className="space-y-3 mb-8 text-xs sm:text-sm font-bold text-[#1E1E1E]">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#CE1B3D] border-2 border-[#1E1E1E] shrink-0" />
              <span>Vegetable-tanned Italian leather</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#00C371] border-2 border-[#1E1E1E] shrink-0" />
              <span>Solid brass hardware details</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#A855F7] border-2 border-[#1E1E1E] shrink-0" />
              <span>Non-toxic ceramic bowls</span>
            </div>
          </div>

          {/* Red Pill Button matching photo */}
          <div>
            <button
              onClick={() => {
                playSnapSound();
                setShowGoodsDrawer(true);
              }}
              className="bg-[#CE1B3D] hover:bg-[#B51634] text-white font-black text-xs sm:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2 border-2 border-[#1E1E1E] shadow-[3px_3px_0px_#1E1E1E] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer transition-all"
            >
              <span>Browse Goods →</span>
            </button>
          </div>

        </div>

      </div>

      {/* Atelier & Goods Drawer / Modal */}
      {showGoodsDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[#FDF8F3] rounded-3xl border-2 border-[#1E1E1E] shadow-[6px_6px_0px_#1E1E1E] p-6 sm:p-8 max-w-3xl w-full max-h-[88vh] overflow-y-auto relative text-[#1E1E1E]">
            <button
              onClick={() => setShowGoodsDrawer(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#1E1E1E] bg-white flex items-center justify-center text-xs font-black hover:bg-[#FFDFDF] cursor-pointer"
            >
              ✕
            </button>

            <span className="bg-[#FFDFDF] border border-[#1E1E1E] text-[#1E1E1E] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-block">
              ATELIER COLLECTION
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl mb-1">
              PupSociety Artisan Goods
            </h3>
            <p className="text-xs text-[#1E1E1E]/70 mb-6 font-medium">
              Heirloom canine accessories, hand-finished dining ceramics, and modular physical enrichment systems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {ATELIER_GOODS.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border-2 border-[#1E1E1E] p-4 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-36 rounded-xl border border-[#1E1E1E]/30 overflow-hidden mb-3 relative bg-neutral-100">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      {product.badge && (
                        <span className="absolute top-2 left-2 bg-[#1E1E1E] text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-display font-black text-sm text-[#1E1E1E] leading-snug">
                        {product.name}
                      </h4>
                      <span className="font-display font-black text-xs text-[#CE1B3D] shrink-0">
                        {product.priceDisplay}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#1E1E1E]/70 font-medium mb-3">
                      {product.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#1E1E1E] hover:bg-[#CE1B3D] text-white font-black text-xs py-2.5 rounded-full border border-[#1E1E1E] shadow-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{addedItem === product.id ? '✓ Added to Cart!' : '+ Add to Cart'}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1E1E1E]/15 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E1E1E]/70">Free shipping on orders over ₹3,000</span>
              <button
                onClick={() => {
                  setShowGoodsDrawer(false);
                  toggleCart();
                }}
                className="bg-[#CE1B3D] text-white text-xs font-black px-5 py-2.5 rounded-full border-2 border-[#1E1E1E] shadow-xs cursor-pointer hover:bg-[#B51634]"
              >
                View Cart & Checkout →
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
