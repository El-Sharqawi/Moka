import { useState } from 'react';
import { Lock, Heart } from 'lucide-react';
import { heartSurprises, type HeartSurprise } from '../data/heartSurprises';
import { SectionHeading } from './SweetWords';

type Props = { onBurst: () => void };

const typeColors: Record<HeartSurprise['type'], string> = {
  'غزل': 'from-rose-500 to-rose-700',
  'طعامة': 'from-amber-400 to-rose-500',
  'دعوة': 'from-emerald-400 to-teal-500',
  'أمنية': 'from-fuchsia-500 to-rose-600',
  'ضحكة': 'from-orange-400 to-rose-400',
  'مفاجأة': 'from-pink-500 to-rose-600',
};

// لعبة القلوب: قلب واحد مفتوح بس في كل مرة
// أول ضغطة تفتح، تاني ضغطة تقفل، لو فتحت قلب تاني الأول يتقفل
// الرسالة ثابتة لكل قلب مش بتتغير
export default function HeartsGame({ onBurst }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(() => new Set());

  const handleHeart = (idx: number) => {
    if (openIndex === idx) {
      // قفل القلب
      setOpenIndex(null);
      return;
    }
    // فتح قلب جديد (القلب المفتوح هيتقفل تلقائياً)
    setOpenIndex(idx);
    setSeen((s) => new Set(s).add(idx));
    onBurst();
  };

  const allSeen = seen.size >= heartSurprises.length;
  const current = openIndex !== null ? heartSurprises[openIndex] : null;

  return (
    <section id="hearts-game" className="mx-auto w-full max-w-4xl px-4 py-12">
      <SectionHeading title="لعبة القلوب" subtitle="١٢ قلب، كل قلب فيه مفاجأة مختلفة — افتحي قلب وقفليه براحتك 💝" emoji="💗" />

      {allSeen && (
        <p className="mb-6 text-center text-rose-600 font-semibold animate-fadeUp">
          فتحتي كل القلوب يا دودي! ربنا يخليكي 🎉
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5">
        {heartSurprises.map((h, i) => {
          const isOpen = openIndex === i;
          const wasSeen = seen.has(i);
          return (
            <button
              key={i}
              onClick={() => handleHeart(i)}
              className={`group relative aspect-square rounded-3xl p-3 shadow-lg transition-all duration-500 hover:scale-105 active:scale-95 ${
                isOpen
                  ? `bg-gradient-to-br ${typeColors[h.type]} scale-105 ring-4 ring-white/60`
                  : wasSeen
                    ? 'bg-gradient-to-br from-rose-300 to-rose-500'
                    : 'bg-gradient-to-br from-rose-400 to-rose-600'
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
              aria-label={`قلب رقم ${i + 1}${isOpen ? ' مفتوح' : ''}`}
            >
              <div
                className="flex h-full flex-col items-center justify-center gap-1 text-white transition-transform duration-500"
                style={{ transform: isOpen ? 'rotateY(0deg) scale(1.1)' : 'rotateY(0deg)' }}
              >
                {isOpen ? (
                  <div className="flex h-full flex-col items-center justify-center gap-1 animate-scaleIn">
                    <span className="text-3xl sm:text-4xl">{h.emoji}</span>
                    <span className="text-[10px] font-bold sm:text-xs text-center">{h.type}</span>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1">
                    {wasSeen ? (
                      <Heart className="h-7 w-7 fill-white/70 sm:h-9 sm:w-9 transition-transform group-hover:scale-125" />
                    ) : (
                      <Lock className="h-5 w-5 opacity-80 sm:h-6 sm:w-6" />
                    )}
                    <span className="text-xs font-bold opacity-90">{i + 1}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* الرسالة بتظهر تحت بدل مودال عشان القفل يكون سهل على الموبايل */}
      {current && (
        <div
          key={openIndex}
          className="mt-6 mx-auto max-w-md animate-scaleIn"
        >
          <div className={`rounded-3xl bg-gradient-to-br ${typeColors[current.type]} p-1 shadow-2xl`}>
            <div className="rounded-[1.4rem] bg-white/95 p-6 text-center backdrop-blur">
              <div className="mb-3 flex items-center justify-center gap-2">
                <span className="text-4xl">{current.emoji}</span>
              </div>
              <span className={`mb-4 inline-block rounded-full bg-gradient-to-l ${typeColors[current.type]} px-4 py-1 text-xs font-bold text-white`}>
                {current.type}
              </span>
              <h3 className="mb-2 text-lg font-extrabold text-rose-800">{current.title}</h3>
              <p className="text-base leading-loose text-rose-800 sm:text-lg">{current.text}</p>
              <button
                onClick={() => setOpenIndex(null)}
                className="mt-5 rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200 active:scale-95"
              >
                اقفلي القلب
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
