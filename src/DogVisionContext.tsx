import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { playSnapSound } from './soundEffects';

interface DogVisionContextType {
  isDogVision: boolean;
  toggleDogVision: () => void;
  isAudioOn: boolean;
  toggleAudio: () => void;
}

const DogVisionContext = createContext<DogVisionContextType | null>(null);

export function DogVisionProvider({ children }: { children: ReactNode }) {
  const [isDogVision, setIsDogVision] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);

  const toggleDogVision = () => {
    setIsDogVision(prev => {
      const next = !prev;
      playSnapSound();
      return next;
    });
  };

  const toggleAudio = () => {
    setIsAudioOn(prev => !prev);
  };

  useEffect(() => {
    if (isDogVision) {
      document.documentElement.classList.add('canine-vision-active');
    } else {
      document.documentElement.classList.remove('canine-vision-active');
    }
  }, [isDogVision]);

  return (
    <DogVisionContext.Provider
      value={{
        isDogVision,
        toggleDogVision,
        isAudioOn,
        toggleAudio,
      }}
    >
      {/* SVG Dichromatic Dog Vision Filter Definition */}
      <svg className="hidden" aria-hidden="true">
        <filter id="canine-dichromatic-filter">
          {/* Calibrated Brettel 1997 / Canine Dichromatic Color Matrix (430nm & 575nm peak sensitivity) */}
          <feColorMatrix
            type="matrix"
            values="
              0.625, 0.375, 0,     0, 0
              0.70,  0.30,  0,     0, 0
              0,     0.30,  0.70,  0, 0
              0,     0,     0,     1, 0
            "
          />
        </filter>
      </svg>
      <div className={isDogVision ? 'canine-vision-mode' : ''}>
        {children}
      </div>
    </DogVisionContext.Provider>
  );
}

export function useDogVision() {
  const ctx = useContext(DogVisionContext);
  if (!ctx) throw new Error('useDogVision must be used within DogVisionProvider');
  return ctx;
}
