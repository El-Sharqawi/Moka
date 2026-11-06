import { useMemo } from 'react';

// خلفية رومانسية متحركة: تدرجات ناعمة + ورود ونجوم ولمعات عائمة
export default function AnimatedBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 4 + Math.random() * 10,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    [],
  );

  const roses = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 30 + Math.random() * 40,
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 6,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* تدرج أساسي */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-rose-100 to-cream-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,114,182,0.25),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(194,24,91,0.18),transparent_50%)]" />

      {/* هالات ناعمة متحركة */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-rose-300/30 blur-3xl animate-floatY" />
      <div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-rose-400/20 blur-3xl animate-floatY" style={{ animationDelay: '1.5s' }} />
      <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl animate-floatY" style={{ animationDelay: '3s' }} />

      {/* نجوم تلمع */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="#e0b066">
            <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" opacity="0.7" />
          </svg>
        </span>
      ))}

      {/* ورود تطفو ببطء */}
      {roses.map((r) => (
        <span
          key={r.id}
          className="absolute"
          style={{
            left: `${r.left}%`,
            top: `${r.top}%`,
            animation: `drift ${r.duration}s ease-in-out ${r.delay}s infinite`,
          }}
        >
          <svg width={r.size} height={r.size} viewBox="0 0 24 24" fill="#f472b6" opacity="0.18">
            <path d="M12 4c1.5 0 2.5 1 3 2.5C15.5 5 17 4 18.5 4.5c1.5.5 2 2 1.5 3.5 1.5-.5 3 .5 3 2s-1 2.5-2.5 2.8c.8 1.2.5 2.8-.8 3.5-1.3.7-2.8.2-3.5-1 .2 1.6-.9 3-2.7 3s-2.9-1.4-2.7-3c-.7 1.2-2.2 1.7-3.5 1-1.3-.7-1.6-2.3-.8-3.5C4.5 15 3.5 14 3.5 12.5s1.5-2.5 3-2c-.5-1.5 0-3 1.5-3.5C9.5 6.5 10 4.8 12 4z" />
            <circle cx="12" cy="12" r="2.5" fill="#c2185b" opacity="0.5" />
          </svg>
        </span>
      ))}
    </div>
  );
}
