// Web Audio API tactile audio synthesis for Treasure Trails
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    playSnapSound();
  }
  return soundEnabled;
}

// 1. Tactile Snap/Click Sound (when snapping modules together in Trail Builder)
export function playSnapSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.05);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.07);
}

// 2. Playful Toy Squeak Sound (for dog interaction / scent cues)
export function playSqueakSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(1750, now + 0.07);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.16);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.23);
}

// 3. Wooden / Treat Drop Clink (when placing treats or adding to cart)
export function playTreatDropSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Dual tone for authentic hollow treat drop
  [520, 780].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.03);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + idx * 0.03 + 0.09);

    gain.gain.setValueAtTime(0.14, now + idx * 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.03);
    osc.stop(now + idx * 0.03 + 0.13);
  });
}

// 4. Trail Unlock Chime (when completing trail or placing order)
export function playUnlockChime() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6 triumphant chord
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.06);

    gain.gain.setValueAtTime(0.1, now + i * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.45);
  });
}
