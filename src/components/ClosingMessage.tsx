import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { closingMessage } from '../data/closingMessage';
import Modal from './Modal';
import { SectionHeading } from './SweetWords';

type Props = { onBurst: () => void };

// الرسالة الختامية "من قلبي لقلبك يا دودي"
export default function ClosingMessage({ onBurst }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    onBurst();
    setOpen(true);
  };

  return (
    <section id="closing" className="mx-auto w-full max-w-3xl px-4 py-12">
      <SectionHeading title="من قلبي لقلبك يا دودي ❤️" subtitle="آخر رسالة، والأهم" emoji="💌" />

      <div className="flex flex-col items-center">
        <button
          onClick={handleOpen}
          className="group relative w-full max-w-md"
          aria-label="افتحي الرسالة الأخيرة"
        >
          <div className="relative mx-auto flex h-56 w-full max-w-sm flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-b from-rose-600 to-rose-800 p-6 text-center shadow-2xl transition-transform group-hover:scale-[1.02] sm:h-64">
            <Heart className="h-14 w-14 fill-white/90 text-white/90 animate-heartBeat" />
            <p className="text-xl font-extrabold text-white sm:text-2xl">من قلبي لقلبك يا دودي</p>
            <p className="text-sm text-rose-100">اضغطي لقراية الرسالة الأخيرة</p>
            <Sparkles className="absolute right-4 top-4 h-6 w-6 text-gold-400 animate-twinkle" />
            <Sparkles className="absolute left-4 bottom-4 h-5 w-5 text-gold-400 animate-twinkle" style={{ animationDelay: '0.7s' }} />
          </div>
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="من قلبي لقلبك يا دودي" emoji="💌">
        <div className="flex justify-center mb-4">
          <Heart className="h-10 w-10 fill-rose-500 text-rose-500 animate-heartBeat" />
        </div>
        <div className="whitespace-pre-line text-right text-base leading-loose text-rose-800 sm:text-lg">
          {closingMessage}
        </div>
      </Modal>
    </section>
  );
}
