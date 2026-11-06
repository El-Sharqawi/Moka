import { useEffect } from 'react';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  emoji?: string;
};

export default function Modal({ open, onClose, children, title, emoji }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-rose-950/40 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="glass relative z-10 w-full max-w-md rounded-3xl p-6 shadow-2xl animate-scaleIn sm:p-8">
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute left-4 top-4 rounded-full bg-rose-100/80 p-2 text-rose-700 transition hover:bg-rose-200"
        >
          <X className="h-5 w-5" />
        </button>
        {title && (
          <h3 className="mb-4 text-center text-2xl font-extrabold text-rose-800">
            {emoji && <span className="ml-2">{emoji}</span>}
            {title}
          </h3>
        )}
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
}
