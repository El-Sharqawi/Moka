import { useState } from 'react';
import { halaawaCards, type HalaawaCard } from '../data/halaawa';
import Modal from './Modal';
import { SectionHeading } from './SweetWords';

type Props = { onBurst: () => void };

// قسم "إيه الحلاوة دي يا منة" - بطاقات غزل
export default function Halaawa({ onBurst }: Props) {
  const [active, setActive] = useState<HalaawaCard | null>(null);
  const [open, setOpen] = useState(false);

  const openCard = (card: HalaawaCard) => {
    setActive(card);
    onBurst();
    setOpen(true);
  };

  return (
    <section id="halaawa" className="mx-auto w-full max-w-4xl px-4 py-12">
      <SectionHeading title="إيه الحلاوة دي يا منة؟ 😂❤️" subtitle="كل بطاقة بتقولك حاجة بتخليكي مميزة" emoji="✨" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {halaawaCards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => openCard(card)}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-4 text-center shadow-lg transition-all hover:scale-105 hover:shadow-2xl active:scale-95 animate-fadeUp`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className="mb-2 block text-3xl sm:text-4xl transition-transform group-hover:scale-125">{card.emoji}</span>
            <span className="block text-xs font-bold text-white sm:text-sm">{card.title}</span>
          </button>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={active?.title} emoji={active?.emoji}>
        <div className={`mb-4 flex justify-center`}>
          <span className="text-5xl">{active?.emoji}</span>
        </div>
        <p className="text-base leading-loose text-rose-800 sm:text-lg">{active?.text}</p>
      </Modal>
    </section>
  );
}
