import { useState } from 'react';
import { HandHeart, RefreshCw } from 'lucide-react';
import { prayers } from '../data/prayers';
import { SectionHeading } from './SweetWords';

type Props = { onBurst: () => void };

export default function Prayers({ onBurst }: Props) {
  const [revealed, setRevealed] = useState<boolean[]>(() => Array(prayers.length).fill(false));

  const reveal = (i: number) => {
    if (!revealed[i]) {
      setRevealed((r) => r.map((v, idx) => (idx === i ? true : v)));
      onBurst();
    }
  };

  const revealAll = () => {
    setRevealed(Array(prayers.length).fill(true));
    onBurst();
  };

  return (
    <section id="prayers" className="mx-auto w-full max-w-3xl px-4 py-12">
      <SectionHeading title="دعوات ليكي" subtitle="من قلبي لقلبك يا دينا 🤲" emoji="🤍" />

      <div className="space-y-3">
        {prayers.map((p, i) => (
          <button
            key={i}
            onClick={() => reveal(i)}
            className={`group w-full overflow-hidden rounded-2xl px-5 py-4 text-right shadow-md transition-all hover:shadow-lg active:scale-[0.98] ${
              revealed[i]
                ? 'glass-rose text-rose-800 animate-fadeUp'
                : 'bg-gradient-to-l from-rose-100 to-rose-50 text-rose-400 hover:from-rose-150'
            }`}
          >
            {revealed[i] ? (
              <p className="text-base leading-loose sm:text-lg">{p}</p>
            ) : (
              <span className="flex items-center gap-2 text-sm font-semibold">
                <HandHeart className="h-5 w-5" />
                دعوة رقم {i + 1} — اضغطي عشان تظهري
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={revealAll}
          className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-6 py-3 font-semibold text-rose-700 transition hover:bg-rose-200 active:scale-95"
        >
          <RefreshCw className="h-4 w-4" /> افتحي كل الدعوات
        </button>
      </div>
    </section>
  );
}
