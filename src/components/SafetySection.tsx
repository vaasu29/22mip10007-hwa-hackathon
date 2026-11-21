export default function SafetySection() {
  const safetyFeatures = [
    {
      title: 'Food-Contact-Safe Materials',
      desc: 'BPA-free, phthalate-free, non-toxic molded polymers that exceed FDA food-contact standards.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Ergonomic Rounded Edges',
      desc: 'No sharp corners or pinch seams. Every transition is filleted to protect delicate gums and noses.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Easy-Clean Surfaces',
      desc: 'Modules detach with a quick twist and are top-rack dishwasher-safe for effortless post-treat sanitizing.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: 'Replaceable Snap Modules',
      desc: 'If a module suffers heavy chewing wear, replace only that individual part rather than buying a whole new set.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: 'Stable Non-Slip Base',
      desc: 'High-friction silicone floor pads grip hardwood, tile, and laminate so the trail stays anchored during eager play.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: 'No Loose Small Parts',
      desc: 'All moving components remain captive inside their housing during play to prevent accidental ingestion.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'Indoor & Outdoor Compatible',
      desc: 'UV-stabilized resin withstands direct sunlight on patios and grass without fading, warping, or brittle degradation.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: 'Eco-Conscious Durability',
      desc: 'Built to last through years of play cycles with 100% recyclable components and minimal packaging waste.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
    },
  ];

  return (
    <section id="safety" className="py-20 md:py-28 bg-sage-pale/30 border-b border-beige/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-forest font-sans">
            Safety & Engineering
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal mt-2 mb-4 leading-tight">
            Designed for real dogs and real homes
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Every millimeter is engineered for canine biomechanics, living room practicality, and peace of mind.
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-beige/60 shadow-xs hover:shadow-sm transition-shadow flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-sage-pale text-forest flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Responsible Supervision Alert Disclaimer */}
        <div className="mt-14 max-w-3xl mx-auto bg-amber-pale/40 border-l-4 border-amber rounded-r-2xl p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="text-amber shrink-0 mt-0.5">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-charcoal mb-1">
                A Note on Play Supervision
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed">
                Always supervise your dog during enrichment play and choose challenges appropriate to your dog's size and chewing behavior.
                Treasure Trails is designed as an interactive enrichment activity, not an unsupervised chew toy.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
