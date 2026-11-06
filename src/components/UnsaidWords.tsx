import { useState } from 'react';
import { Quote, ChevronLeft } from 'lucide-react';
import { unsaidWords } from '../data/unsaidWords';
import Modal from './Modal';
import { SectionHeading } from './SweetWords';

type Props = { onBurst: () => void };

// قسم "كلام عمري ما عرفته أقوله" - مشاعر صادقة
export default function UnsaidWords({ onBurst }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const showNext = () => {
    setIndex((i) => (i + 1) % unsaidWords.length);
    onBurst();
  };

  const openFirst = () => {
    setIndex(0);
    onBurst();
    setOpen(true);
  };

  return (
    <section id="unsaid" className="mx-auto w-full max-w-3xl px-4 py-12">
      <SectionHeading title="كلام عمري ما عرفته أقوله" subtitle="مشاعر حقيقية كنت بخبّيها يا دودي" emoji="💭" />

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={openFirst}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-rose-700 to-rose-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          <Quote className="h-5 w-5" />
          افتحي اللي في قلبي
        </button>

        <div className="w-full space-y-3">
          {unsaidWords.slice(0, 3).map((w, i) => (
            <div
              key={i}
              className="glass-rose rounded-2xl px-5 py-4 text-right text-rose-800 shadow-sm animate-fadeUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Quote className="mb-2 h-4 w-4 text-rose-400" />
              <p className="text-base leading-loose sm:text-lg">{w}</p>
            </div>
          ))}
          <p className="text-center text-sm text-rose-400">وفي كمان كتير... افتحي الباقي</p>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="كلام من قلبي" emoji="💭">
        <div className="flex justify-center mb-3">
          <Quote className="h-8 w-8 text-rose-400" />
        </div>
        <p className="text-lg leading-loose text-rose-800 sm:text-xl text-balance">{unsaidWords[index]}</p>
        <div className="mt-3 text-xs text-rose-400">{index + 1} من {unsaidWords.length}</div>
        <button
          onClick={showNext}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose-100 px-6 py-3 font-semibold text-rose-700 transition hover:bg-rose-200 active:scale-95"
        >
          كمان واحدة
          <ChevronLeft className="h-4 w-4" />
        </button>
      </Modal>
    </section>
  );
}
