import { wishes } from '../data/wishes';
import { Sparkles } from 'lucide-react';
import { SectionHeading } from './SweetWords';

type Props = { onBurst: () => void };

// قسم "حاجات نفسي أعملهالك" - أمنيات رومانسية
export default function Wishes({ onBurst }: Props) {
  return (
    <section id="wishes" className="mx-auto w-full max-w-3xl px-4 py-12">
      <SectionHeading title="حاجات نفسي أعملهالك" subtitle="أمنيات صغيرة من قلبي ليكي يا منة" emoji="🌟" />

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {wishes.map((w, i) => (
          <button
            key={i}
            onClick={onBurst}
            className="group glass-rose flex items-start gap-3 rounded-2xl p-5 text-right shadow-md transition-all hover:scale-[1.03] hover:shadow-xl active:scale-95 animate-fadeUp"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className="text-3xl transition-transform group-hover:scale-125">{w.emoji}</span>
            <p className="flex-1 text-base leading-relaxed text-rose-800 sm:text-lg">{w.text}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-rose-400">
        <Sparkles className="h-4 w-4 animate-twinkle" />
        <p className="text-sm">كل ده نفسي أعملهولك يا دودي</p>
        <Sparkles className="h-4 w-4 animate-twinkle" style={{ animationDelay: '0.5s' }} />
      </div>
    </section>
  );
}
