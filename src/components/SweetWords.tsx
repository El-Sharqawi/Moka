import { useState } from 'react';
import { Heart, Shuffle } from 'lucide-react';
import { sweetMessages } from '../data/messages';
import { randomItem, shuffle } from '../lib/utils';
import Modal from './Modal';

type Props = { onBurst: () => void };

// قسم كلام من القلب
export default function SweetWords({ onBurst }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [used, setUsed] = useState<number[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const tellMe = () => {
    let available = sweetMessages.map((_, i) => i).filter((i) => !used.includes(i));
    if (available.length === 0) {
      setUsed([]);
      available = sweetMessages.map((_, i) => i);
    }
    const idx = available[Math.floor(Math.random() * available.length)];
    setUsed((u) => [...u, idx]);
    const msg = sweetMessages[idx];
    setMessage(msg);
    setHistory((h) => [msg, ...h].slice(0, 6));
    onBurst();
    setOpen(true);
  };

  return (
    <section id="sweet-words" className="mx-auto w-full max-w-3xl px-4 py-12">
      <SectionHeading title="كلام من القلب" subtitle="كلمات حسّيت بيها وجيت أقولها ليكِ" emoji="💌" />

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={tellMe}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-rose-600 to-rose-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          <Shuffle className="h-5 w-5 transition-transform group-hover:rotate-180 duration-500" />
          قوليلي كلام حلو ❤️
        </button>

        {history.length > 0 && (
          <div className="mt-4 w-full space-y-3">
            <p className="text-center text-sm text-rose-400">آخر رسائل ظهرت</p>
            {history.slice(1).map((h, i) => (
              <div
                key={i}
                className="glass-rose rounded-2xl px-5 py-4 text-right text-rose-800 shadow-sm animate-fadeUp"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {h}
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="كلام من القلب" emoji="💌">
        <div className="flex justify-center mb-4">
          <Heart className="h-10 w-10 fill-rose-500 text-rose-500 animate-heartBeat" />
        </div>
        <p className="text-lg leading-loose text-rose-800 sm:text-xl">{message}</p>
        <button
          onClick={tellMe}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-100 px-6 py-3 font-semibold text-rose-700 transition hover:bg-rose-200 active:scale-95"
        >
          <Shuffle className="h-4 w-4" /> كمان واحدة
        </button>
      </Modal>
    </section>
  );
}

export function SectionHeading({ title, subtitle, emoji }: { title: string; subtitle?: string; emoji?: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-extrabold text-rose-800 sm:text-4xl">
        {emoji && <span className="ml-2">{emoji}</span>}
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-rose-500">{subtitle}</p>}
      <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-l from-rose-400 to-rose-600" />
    </div>
  );
}

// تصدير shuffle للاستخدام في أقسام أخري لو لزم
export { shuffle, randomItem };
