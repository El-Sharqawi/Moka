import { ChevronLeft, RotateCcw, Sparkles } from 'lucide-react';
import { reasons } from '../data/reasons';
import { useLocalStorage } from '../lib/utils';
import { SectionHeading } from './SweetWords';

type Props = { onBurst: () => void };

export default function Reasons({ onBurst }: Props) {
  const [index, setIndex] = useLocalStorage<number>('muna_reasons_index', 0);
  const [seen, setSeen] = useLocalStorage<number[]>('muna_reasons_seen', []);

  const next = () => {
    setIndex((i) => (i + 1) % reasons.length);
    setSeen((s) => Array.from(new Set([...s, index])));
    onBurst();
  };

  const reset = () => {
    setIndex(0);
    setSeen([]);
  };

  const total = reasons.length;
  const progress = Math.round((seen.length / total) * 100);
  const reason = reasons[index];

  return (
    <section id="reasons" className="mx-auto w-full max-w-3xl px-4 py-12">
      <SectionHeading title="١٠٠ سبب لتميّز دودي" subtitle="كل سبب بيخليكي إنسانة مميزة عندي 💫" emoji="✨" />

      <div className="mx-auto mb-4 h-2 w-full max-w-md overflow-hidden rounded-full bg-rose-100">
        <div
          className="h-full rounded-full bg-gradient-to-l from-rose-500 to-rose-700 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mb-6 text-center text-sm text-rose-500">
        شفتِ {seen.length} من {total} سبب
      </p>

      <div className="glass relative mx-auto max-w-md rounded-3xl p-8 shadow-xl animate-scaleIn" key={index}>
        <div className="absolute -top-3 right-6 rounded-full bg-rose-600 px-4 py-1 text-sm font-bold text-white shadow-lg">
          سبب رقم {index + 1}
        </div>

        <Sparkles className="mx-auto mb-4 h-8 w-8 text-gold-400 animate-twinkle" />

        <p className="text-center text-xl leading-loose text-rose-800 sm:text-2xl text-balance">{reason}</p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {index === total - 1 && seen.length >= total - 1 && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-6 py-3 font-semibold text-rose-700 transition hover:bg-rose-200 active:scale-95"
          >
            <RotateCcw className="h-4 w-4" /> ابدئي من الأول
          </button>
        )}
        <button
          onClick={next}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-rose-600 to-rose-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          التالي
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
