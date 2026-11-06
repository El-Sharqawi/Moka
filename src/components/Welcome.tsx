import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import FloatingHearts from './FloatingHearts';

type Props = { onEnter: () => void };

export default function Welcome({ onEnter }: Props) {
  const [opening, setOpening] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const handleOpen = () => {
    setOpening(true);
    setBurstKey((k) => k + 1);
    setTimeout(onEnter, 1600);
  };

  return (
    <div
      className={`relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center transition-all duration-700 ${
        opening ? 'scale-110 opacity-0 blur-md' : 'opacity-100'
      }`}
    >
      <FloatingHearts count={20} burst burstKey={burstKey} />

      {/* إطار زجاجي */}
      <div className="glass relative z-10 w-full max-w-xl rounded-[2.5rem] px-6 py-12 shadow-2xl sm:px-12 sm:py-16 animate-scaleIn">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Heart className="h-20 w-20 fill-rose-500 text-rose-500 animate-heartBeat drop-shadow-[0_0_20px_rgba(225,29,107,0.6)]" />
            <Sparkles className="absolute -right-3 -top-2 h-7 w-7 text-gold-400 animate-twinkle" />
            <Sparkles className="absolute -left-3 bottom-0 h-6 w-6 text-gold-400 animate-twinkle" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-rose-800 sm:text-5xl">
          أهلاً بيكي في عالمك يا منة <span className="text-rose-600">❤️</span>
        </h1>

        <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-rose-700/90 sm:text-xl">
          في حد قرّر يعملك عالم صغير، كل تفصيلة فيه معمولة مخصوص علشانك يا دودي.
        </p>

        <button
          onClick={handleOpen}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-l from-rose-600 to-rose-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95 animate-pulseGlow"
        >
          <Heart className="h-5 w-5 fill-white transition-transform group-hover:scale-125" />
          <span>افتحي مفاجأتك يا جميلة ❤️</span>
        </button>

        <p className="mt-8 text-sm text-rose-400">مخصوص لـ ديـنـا (دودي) 💗</p>
      </div>
    </div>
  );
}
