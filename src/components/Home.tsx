import { useEffect, useState } from 'react';
import { Heart, MessageCircleHeart, Gamepad2, Star, Smile, HandHeart, Mail, ArrowUp, Home as HomeIcon, Sparkles, Quote, Gift, Send } from 'lucide-react';
import SweetWords from './SweetWords';
import HeartsGame from './HeartsGame';
import Reasons from './Reasons';
import SmileSection from './SmileSection';
import Prayers from './Prayers';
import SecretMessage from './SecretMessage';
import Halaawa from './Halaawa';
import UnsaidWords from './UnsaidWords';
import Wishes from './Wishes';
import ClosingMessage from './ClosingMessage';

type Props = { onBurst: () => void };

const navItems = [
  { id: 'home', label: 'الرئيسية', icon: HomeIcon },
  { id: 'halaawa', label: 'الحلاوة', icon: Sparkles },
  { id: 'sweet-words', label: 'كلام من القلب', icon: MessageCircleHeart },
  { id: 'unsaid', label: 'عمري ما قلته', icon: Quote },
  { id: 'hearts-game', label: 'لعبة القلوب', icon: Gamepad2 },
  { id: 'reasons', label: '١٠٠ سبب', icon: Star },
  { id: 'smile', label: 'ابتسمي يا منة', icon: Smile },
  { id: 'wishes', label: 'حاجات نفسيها', icon: Gift },
  { id: 'prayers', label: 'دعوات ليكي', icon: HandHeart },
  { id: 'secret', label: 'الرسالة السرية', icon: Mail },
  { id: 'closing', label: 'من قلبي لقلبك', icon: Send },
];

export default function Home({ onBurst }: Props) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative">
      {/* شريط التنقل العلوي */}
      <header className="sticky top-0 z-40 glass border-b border-rose-200/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 text-rose-800">
            <Heart className="h-6 w-6 fill-rose-500 text-rose-500 animate-heartBeat" />
            <span className="text-lg font-extrabold sm:text-xl">عالم منة</span>
          </button>
          <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto">
            {navItems.slice(1).map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 sm:text-sm"
              >
                <n.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{n.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* البطل / الرئيسية */}
      <section id="home" className="relative mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="glass rounded-[2.5rem] px-6 py-12 shadow-2xl animate-scaleIn sm:px-12 sm:py-16">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Heart className="h-24 w-24 fill-rose-500 text-rose-500 animate-heartBeat drop-shadow-[0_0_30px_rgba(225,29,107,0.7)]" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-rose-800 sm:text-6xl text-balance">
            يا أهلاً بأجمل دينا في الدنيا
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-rose-700 sm:text-2xl">
            منة مش مجرد اسم، دودي حكاية جميلة لوحدها <span className="text-rose-600">❤️</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {navItems.slice(1).map((n, i) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="group inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-3 text-sm font-bold text-rose-700 shadow-md transition-all hover:scale-105 hover:bg-rose-500 hover:text-white active:scale-95 animate-fadeUp sm:text-base"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* الأقسام */}
      <Halaawa onBurst={onBurst} />
      <Divider />
      <SweetWords onBurst={onBurst} />
      <Divider />
      <UnsaidWords onBurst={onBurst} />
      <Divider />
      <HeartsGame onBurst={onBurst} />
      <Divider />
      <Reasons onBurst={onBurst} />
      <Divider />
      <SmileSection onBurst={onBurst} />
      <Divider />
      <Wishes onBurst={onBurst} />
      <Divider />
      <Prayers onBurst={onBurst} />
      <Divider />
      <SecretMessage onBurst={onBurst} />
      <Divider />
      <ClosingMessage onBurst={onBurst} />

      {/* تذييل */}
      <footer className="mx-auto max-w-3xl px-4 py-12 text-center">
        <Heart className="mx-auto mb-3 h-8 w-8 fill-rose-400 text-rose-400" />
        <p className="text-rose-600 font-semibold">عملوه بكل حب علشان منة (دينا / دودي) ❤️</p>
        <p className="mt-1 text-sm text-rose-400">ربنا يخليكي ويفرحك دايماً 🌸</p>
      </footer>

      {/* زر العودة للأعلى */}
      {showTop && (
        <button
          onClick={() => scrollTo('home')}
          aria-label="عودة للأعلى"
          className="fixed bottom-5 right-5 z-40 rounded-full bg-rose-600 p-3 text-white shadow-xl transition-all hover:scale-110 hover:bg-rose-700 active:scale-95 animate-scaleIn"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto my-2 flex max-w-xs items-center justify-center gap-3 px-4">
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-300" />
      <Heart className="h-4 w-4 fill-rose-300 text-rose-300" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-300" />
    </div>
  );
}
