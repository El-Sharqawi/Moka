import { useState } from 'react';
import { CloudRain, Gift, Smile, Music, Star } from 'lucide-react';
import { smileSurprises, type SmileSurprise } from '../data/smileSurprises';
import { randomItem } from '../lib/utils';
import Modal from './Modal';
import { SectionHeading } from './SweetWords';

type Props = { onBurst: () => void };

const buttons: { key: string; label: string; icon: typeof CloudRain; color: string }[] = [
  { key: 'hardDay', label: 'لو يومك صعب اضغطي هنا', icon: CloudRain, color: 'from-sky-400 to-rose-400' },
  { key: 'sad', label: 'لو زعلانة افتحي المفاجأة دي', icon: Gift, color: 'from-rose-400 to-rose-600' },
  { key: 'needSmile', label: 'لو محتاجة تبتسمي اضغطي هنا', icon: Smile, color: 'from-amber-400 to-rose-400' },
  { key: 'sweetWords', label: 'لو عايزة تسمعي كلام حلو', icon: Music, color: 'from-fuchsia-400 to-rose-500' },
  { key: 'special', label: 'افتحي مفاجأة مخصوص ليكي', icon: Star, color: 'from-gold-400 to-rose-500' },
];

export default function SmileSection({ onBurst }: Props) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<SmileSurprise | null>(null);
  const [activeKey, setActiveKey] = useState<string>('');

  const handleClick = (key: string) => {
    const arr = smileSurprises[key];
    setItem(randomItem(arr));
    setActiveKey(key);
    onBurst();
    setOpen(true);
  };

  const activeLabel = buttons.find((b) => b.key === activeKey)?.label ?? '';

  return (
    <section id="smile" className="mx-auto w-full max-w-3xl px-4 py-12">
      <SectionHeading title="ابتسمي يا منة" subtitle="أزاي أخلّي يومك أحلى؟ اختاري اللي يناسبك 🌸" emoji="😊" />

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {buttons.map((b) => (
          <button
            key={b.key}
            onClick={() => handleClick(b.key)}
            className={`group flex items-center gap-3 rounded-2xl bg-gradient-to-l ${b.color} px-5 py-4 text-right font-bold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-xl active:scale-95`}
          >
            <b.icon className="h-6 w-6 shrink-0 transition-transform group-hover:scale-125" />
            <span className="text-sm sm:text-base">{b.label}</span>
          </button>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="ابتسمي يا منة" emoji="😊">
        <div className="flex justify-center mb-4">
          <span className="text-5xl">{item?.emoji}</span>
        </div>
        <p className="mb-2 text-xs font-semibold text-rose-400">{activeLabel}</p>
        <p className="text-lg leading-loose text-rose-800 sm:text-xl">{item?.text}</p>
      </Modal>
    </section>
  );
}
