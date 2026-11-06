import { useState } from 'react';
import { Mail, Heart } from 'lucide-react';
import { SectionHeading } from './SweetWords';

type Props = { onBurst: () => void };

const secretMessage = `يا منة، يمكن مش بعرف أعبّر عن كل اللي جوايا بالكلام، بس حبيت أعملك حاجة مختلفة، حاجة كل تفصيلة فيها معمولة علشانك.

يا دينا، انتي إنسانة غالية جداً، وليكي مكانة خاصة عندي.

يا دودي، أتمنى أشوفك دايماً مبسوطة، وأتمنى ربنا يكتبلك كل الخير والفرحة.

يمكن عندي كلام كتير نفسي أقوله، لكن أهم حاجة عايزك تعرفيها إن سعادتك وراحتك تهمني، وإن مشاعري ناحيتك صادقة، ونفسي ربنا يكتب لنا الخير بالحلال لو كان فيه خير لينا.

مش مستني منك أي رد، ولا عايز أحط عليكي أي ضغط، أنا بس حبيت أرسم ابتسامة على وشك.

من قلب بيتمنالك كل الخير ❤️`;

export default function SecretMessage({ onBurst }: Props) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleOpen = () => {
    if (!open) {
      setOpen(true);
      onBurst();
      setTimeout(() => setRevealed(true), 700);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRevealed(false);
  };

  return (
    <section id="secret" className="mx-auto w-full max-w-3xl px-4 py-12">
      <SectionHeading title="الرسالة السرية" subtitle="في ظرف مخصص ليكِ يا دودي 💌" emoji="💌" />

      <div className="flex flex-col items-center">
        {/* الظرف */}
        <button
          onClick={handleOpen}
          className="group relative w-full max-w-md"
          aria-label="افتحي الرسالة السرية"
        >
          <div className="relative mx-auto h-56 w-full max-w-sm rounded-2xl bg-gradient-to-b from-rose-500 to-rose-700 shadow-2xl transition-transform group-hover:scale-[1.02] sm:h-64">
            {/* غطاء الظرف العلوي */}
            {!open && (
              <div
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-rose-600 to-rose-700"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />
            )}
            {open && (
              <div
                className="absolute inset-x-0 top-0 h-1/2 origin-top bg-gradient-to-b from-rose-600 to-rose-700"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  animation: 'openFlap 0.7s ease-in forwards',
                  transformStyle: 'preserve-3d',
                }}
              />
            )}

            {/* محتوى الظرف */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-white">
              {open ? (
                <div className="animate-fadeIn">
                  <Mail className="mx-auto mb-2 h-10 w-10 animate-floatY" />
                  <p className="text-lg font-bold">تقرأ دلوقتي...</p>
                </div>
              ) : (
                <>
                  <Mail className="h-12 w-12 animate-floatY" />
                  <p className="text-xl font-extrabold sm:text-2xl">عندك رسالة سرية يا دودي 💌</p>
                  <p className="text-sm text-rose-100">اضغطي لفتح الظرف</p>
                </>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* الرسالة الكاملة */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-rose-950/50 backdrop-blur-sm animate-fadeIn" onClick={handleClose} />
          <div
            className={`glass relative z-10 w-full max-w-lg rounded-3xl p-6 shadow-2xl sm:p-8 ${revealed ? 'animate-slideOut' : 'animate-scaleIn'}`}
          >
            <div className="flex justify-center mb-4">
              <Heart className="h-10 w-10 fill-rose-500 text-rose-500 animate-heartBeat" />
            </div>
            <div className="whitespace-pre-line text-center text-lg leading-loose text-rose-800 sm:text-xl">
              {secretMessage}
            </div>
            <button
              onClick={handleClose}
              className="mt-6 rounded-full bg-rose-600 px-6 py-3 font-bold text-white transition hover:bg-rose-700 active:scale-95"
            >
              قفل الظرف
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
