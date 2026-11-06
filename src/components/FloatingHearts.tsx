import { useEffect, useMemo, useState } from 'react';

type Particle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotate: number;
};

const colors = ['#e11d6b', '#ec4899', '#f472b6', '#f9a8d4', '#c2185b', '#ff6b9d'];

type Props = {
  count?: number;
  active?: boolean;
  burst?: boolean; // تطاير مفاجئ (عند الضغط)
  burstKey?: number;
};

// قلوب متطايرة في الخلفية (دائمة) أو انفجار قلوب عند الضغط
export default function FloatingHearts({ count = 14, active = true, burst = false, burstKey = 0 }: Props) {
  const [bursts, setBursts] = useState<number[]>([]);

  const ambient = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 24,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 40 - 20,
    }));
  }, [count]);

  useEffect(() => {
    if (burst && burstKey > 0) {
      setBursts((b) => [...b, burstKey]);
      const t = setTimeout(() => {
        setBursts((b) => b.filter((x) => x !== burstKey));
      }, 4500);
      return () => clearTimeout(t);
    }
  }, [burst, burstKey]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {ambient.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-40px]"
          style={{
            left: `${p.left}%`,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color} style={{ transform: `rotate(${p.rotate}deg)` }}>
            <path d="M12 21s-7.5-4.6-10-9.3C.7 8.9 2 5 5.5 5c2 0 3.3 1.1 4.5 2.7C11.2 6.1 12.5 5 14.5 5 18 5 19.3 8.9 17 11.7 14.5 16.4 12 21 12 21z" opacity="0.55" />
          </svg>
        </span>
      ))}

      {bursts.map((bk) => (
        <Burst key={bk} />
      ))}
    </div>
  );
}

function Burst() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: 40 + Math.random() * 20,
      size: 16 + Math.random() * 28,
      duration: 3 + Math.random() * 1.5,
      delay: Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 60 - 30,
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[35%]"
          style={{
            left: `${p.left + (Math.random() * 30 - 15)}%`,
            animation: `floatUp ${p.duration}s ease-out ${p.delay}s forwards`,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color} style={{ transform: `rotate(${p.rotate}deg)` }}>
            <path d="M12 21s-7.5-4.6-10-9.3C.7 8.9 2 5 5.5 5c2 0 3.3 1.1 4.5 2.7C11.2 6.1 12.5 5 14.5 5 18 5 19.3 8.9 17 11.7 14.5 16.4 12 21 12 21z" />
          </svg>
        </span>
      ))}
    </>
  );
}
