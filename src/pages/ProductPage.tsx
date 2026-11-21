import { useState, useEffect } from 'react';
import { STARTER_KIT, MODULES, PRODUCT_IMAGES } from '../data';
import { useCart } from '../CartContext';
import { playTreatDropSound, playSnapSound } from '../soundEffects';
import type { Difficulty, Module } from '../types';

export default function ProductPage() {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Adventurer');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentImage = PRODUCT_IMAGES[selectedImageIndex] || PRODUCT_IMAGES[0];

  const handleAddToCart = () => {
    playTreatDropSound();
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: STARTER_KIT.id,
        name: `${STARTER_KIT.name} (${selectedDifficulty})`,
        price: STARTER_KIT.price,
        difficulty: selectedDifficulty,
        modules: [
          'Base Trail',
          'Scent Pocket',
          'Tunnel',
          'Sliding Gate',
          'Rotating Puzzle',
          'Treasure Chamber',
        ],
      });
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleAddIndividualModule = (mod: Module) => {
    playTreatDropSound();
    addItem({
      id: `addon-${mod.id}`,
      name: `Add-on Module: ${mod.name}`,
      price: 499,
      difficulty: mod.difficulty,
    });
  };

  const faqs = [
    {
      q: 'How durable are the modular connection points?',
      a: 'The interlocking joints are precision-molded from food-grade ABS resin engineered for thousands of snap cycles. They resist accidental disconnection while remaining easy for human hands to unlock.',
    },
    {
      q: 'Is Treasure Trails suitable for heavy chewers?',
      a: 'Treasure Trails is designed for guided cognitive enrichment rather than unmonitored chewing. While made from impact-resistant food-safe polymer, we always recommend supervising play and removing the trail once the puzzle session concludes.',
    },
    {
      q: 'How do I clean and sanitize the parts?',
      a: 'All individual challenge modules and treat pockets are top-rack dishwasher-safe up to 65°C (150°F). The main base plate can be rinsed with warm water and mild soap.',
    },
    {
      q: 'Can I combine multiple starter kits to make a larger room-scale trail?',
      a: 'Yes! The modular grid system is fully expansion-ready. Multiple base plates snap together seamlessly to create extended room-length trails and branched obstacle courses.',
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs font-medium text-charcoal-muted mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-forest">Home</a>
          <span>/</span>
          <span className="text-charcoal font-semibold">Shop</span>
          <span>/</span>
          <span className="text-forest font-semibold">Starter Adventure Kit</span>
        </nav>

        {/* Product Showcase Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-beige/60 shadow-sm mb-16">
          
          {/* Left Column: Gallery Views */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Main Stage Image Render Canvas */}
            <div className="w-full aspect-square bg-cream/60 rounded-3xl overflow-hidden border border-beige/60 relative group shadow-md">
              <span className="absolute top-4 left-4 z-10 bg-forest text-cream text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Official Kit
              </span>

              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
              />

              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-full font-medium">
                {currentImage.label}
              </div>
            </div>

            {/* Thumbnail Navigation Selector with Real Photos */}
            <div className="grid grid-cols-4 gap-3">
              {PRODUCT_IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    playSnapSound();
                    setSelectedImageIndex(idx);
                  }}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer relative group ${
                    selectedImageIndex === idx
                      ? 'border-forest ring-2 ring-forest/30 shadow-sm'
                      : 'border-beige/80 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Product Detail & Purchase Box */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Rating & Concept Tag */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex text-amber text-sm">
                  ★★★★★
                </div>
                <span className="text-xs text-charcoal-muted font-medium">
                  4.9 / 5 (84 pet parent testers)
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-3">
                {STARTER_KIT.name}
              </h1>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                  ₹{STARTER_KIT.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-charcoal-muted line-through font-mono">
                  ₹3,199 MRP
                </span>
                <span className="text-xs font-bold text-forest bg-sage-pale px-3 py-1 rounded-full">
                  Save ₹700 (22% off)
                </span>
              </div>

              <p className="text-sm sm:text-base text-charcoal-light leading-relaxed mb-6">
                {STARTER_KIT.description} Reconfigure the trail whenever your dog becomes familiar with the layout.
              </p>

              {/* Difficulty Preset Selector */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-2">
                  Select Starting Challenge Preset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Explorer', 'Adventurer', 'Master'] as Difficulty[]).map(diff => (
                    <button
                      key={diff}
                      onClick={() => {
                        playSnapSound();
                        setSelectedDifficulty(diff);
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedDifficulty === diff
                          ? 'bg-forest text-cream shadow-xs'
                          : 'bg-cream hover:bg-cream-dark text-charcoal border border-beige'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-cream rounded-xl p-1 border border-beige">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-beige text-charcoal font-bold flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 font-mono font-bold text-sm text-charcoal">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => Math.min(10, q + 1))}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-beige text-charcoal font-bold flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-charcoal-muted">
                    In stock • Dispatches within 24 hours
                  </span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    addedNotice
                      ? 'bg-success text-white'
                      : 'bg-forest hover:bg-forest-light text-cream hover:shadow-xl'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <span>Added to Adventure Cart! ✓</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Cart — ₹{(STARTER_KIT.price * quantity).toLocaleString('en-IN')}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* In the Box Checklist */}
              <div className="p-5 bg-cream/50 rounded-2xl border border-beige/60">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-3">
                  What's Included in the Box
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-light">
                  {STARTER_KIT.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-forest font-bold">✓</span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Technical Specifications Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-beige/60 shadow-sm mb-16 max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">
            Specifications & Engineering
          </h2>
          <div className="divide-y divide-beige/60 text-sm">
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-semibold text-charcoal-muted">Assembled Dimensions</span>
              <span className="sm:col-span-2 text-charcoal">{STARTER_KIT.specs.dimensions}</span>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-semibold text-charcoal-muted">System Weight</span>
              <span className="sm:col-span-2 text-charcoal">{STARTER_KIT.specs.weight}</span>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-semibold text-charcoal-muted">Material Composition</span>
              <span className="sm:col-span-2 text-charcoal">{STARTER_KIT.specs.material}</span>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-semibold text-charcoal-muted">Suitable Dog Weight</span>
              <span className="sm:col-span-2 text-charcoal">{STARTER_KIT.specs.suitableFor}</span>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-semibold text-charcoal-muted">Cleaning & Sanitization</span>
              <span className="sm:col-span-2 text-charcoal">{STARTER_KIT.specs.cleaningNote}</span>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-semibold text-charcoal-muted">Warranty</span>
              <span className="sm:col-span-2 text-charcoal">{STARTER_KIT.specs.warranty}</span>
            </div>
          </div>
        </div>

        {/* You Might Also Like: Individual Expansion Modules */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-amber font-sans">
              Expand Your Trail
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mt-1">
              Popular Add-on Modules
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              Add individual challenge inserts to expand your Starter Kit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {MODULES.slice(5, 8).map(mod => (
              <div key={mod.id} className="bg-white p-6 rounded-3xl border border-beige/60 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-3">{mod.icon}</div>
                  <h3 className="font-serif text-lg font-bold text-charcoal mb-1">{mod.name}</h3>
                  <p className="text-xs text-charcoal-muted mb-4">{mod.description}</p>
                </div>
                <div className="pt-4 border-t border-beige/60 flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-forest">₹499</span>
                  <button
                    onClick={() => handleAddIndividualModule(mod)}
                    className="px-3.5 py-2 bg-forest text-cream hover:bg-forest-light text-xs font-semibold rounded-xl cursor-pointer transition-colors shadow-xs"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product FAQs */}
        <div className="bg-cream-dark/30 rounded-3xl p-6 sm:p-10 border border-beige/60 max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-charcoal mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-beige/60 overflow-hidden">
                  <button
                    onClick={() => {
                      playSnapSound();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif font-bold text-base text-charcoal">
                      {faq.q}
                    </span>
                    <span className="text-forest font-bold text-lg">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-charcoal-light leading-relaxed border-t border-beige/30 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
