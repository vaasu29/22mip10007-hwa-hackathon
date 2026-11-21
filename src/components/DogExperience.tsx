import { playSnapSound } from '../soundEffects';

export default function DogExperience() {
  const reviews = [
    {
      bg: 'bg-white',
      avatarRing: 'border-[#00C371]',
      avatarBg: 'bg-[#D2F4E2]',
      quote:
        '“PupSociety has completely changed how I think about designing my home for a large dog. The photography alone is worth framing.”',
      author: 'Clare Sterling',
      role: 'Architect, Mill Valley',
      initials: 'CS',
    },
    {
      bg: 'bg-[#FFDFDF]',
      avatarRing: 'border-[#A855F7]',
      avatarBg: 'bg-[#EFE3FF]',
      quote:
        '“The leather leash we ordered two years ago only looks better with age. True quality craftsmanship.”',
      author: 'Marcus Vance',
      role: 'Designer, Brooklyn',
      initials: 'MV',
    },
    {
      bg: 'bg-[#D2F4E2]',
      avatarRing: 'border-[#CE1B3D]',
      avatarBg: 'bg-[#FFDFDF]',
      quote:
        '“Attending the launch party at the Brannan Street studio was a highlight of my year. Such a warm community of dog lovers.”',
      author: 'Elena Rostova',
      role: 'Writer, San Francisco',
      initials: 'ER',
    },
  ];

  return (
    <section id="editorial-section" className="py-14 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* 1. "Reflections from Our Readers" Headline matching photo */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1E1E1E] leading-tight">
          Reflections from Our Readers
        </h2>
      </div>

      {/* 3 Review Cards matching photo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mb-14">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            onClick={playSnapSound}
            className={`${rev.bg} rounded-3xl border-2 border-[#1E1E1E] p-6 sm:p-7 pt-8 relative shadow-[4px_4px_0px_#1E1E1E] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E1E1E] cursor-pointer transition-all flex flex-col justify-between`}
          >
            {/* Overlapping Circular Green Quote Badge in Top-Right matching photo */}
            <div className="absolute -top-3.5 right-6 w-8 h-8 rounded-full bg-[#00C371] border-2 border-[#1E1E1E] text-white flex items-center justify-center font-display font-black text-base shadow-xs select-none">
              ”
            </div>

            <div>
              {/* 5 Green Stars matching photo */}
              <div className="flex text-[#00C371] text-xs font-bold gap-1 mb-4">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>

              {/* Quote Text matching photo */}
              <p className="text-xs sm:text-sm text-[#1E1E1E] font-medium leading-relaxed mb-6">
                {rev.quote}
              </p>
            </div>

            {/* Author Attribution matching photo */}
            <div className="flex items-center gap-3 pt-3">
              <div className={`w-8 h-8 rounded-full ${rev.avatarBg} border-2 ${rev.avatarRing} flex items-center justify-center font-display font-black text-[11px] text-[#1E1E1E]`}>
                {rev.initials}
              </div>
              <div>
                <p className="font-display font-black text-xs text-[#1E1E1E] leading-tight">
                  {rev.author}
                </p>
                <p className="text-[10px] text-[#1E1E1E]/70 font-medium">
                  {rev.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. "Our Editorial Philosophy" matching photo */}
      <div className="mb-6">
        <h3 className="font-display font-black text-xl sm:text-2xl text-[#1E1E1E] mb-3">
          Our Editorial Philosophy
        </h3>
        <p className="text-xs sm:text-sm text-[#1E1E1E]/80 leading-relaxed font-medium max-w-4xl">
          We believe that living with a dog is an art form deserving of thoughtful design and reflection. Our pages explore architecture tailored for pets, canine nutrition, and travel stories from around the globe. Join our community to receive the complete print edition and invitations to private gatherings.
        </p>
      </div>

    </section>
  );
}
