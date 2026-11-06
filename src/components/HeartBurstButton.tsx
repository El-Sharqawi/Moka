import { useState } from 'react';

type Props = {
  onBurst: () => void;
  children: React.ReactNode;
  className?: string;
};

// يلف أي عنصر بحيث يطلق قلوب متطايرة عند الضغط (يخطر onBurst)
export default function HeartBurstButton({ onBurst, children, className = '' }: Props) {
  const [local, setLocal] = useState<number[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const id = Date.now() + Math.random();
    setLocal((s) => [...s, id]);
    setTimeout(() => setLocal((s) => s.filter((x) => x !== id)), 4000);
    onBurst();
  };

  return (
    <span className="relative inline-block" onClick={handleClick}>
      {local.map((id) => (
        <LocalBurst key={id} />
      ))}
      <span className={className}>{children}</span>
    </span>
  );
}

function LocalBurst() {
  const parts = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    dx: Math.random() * 80 - 40,
    dy: -(40 + Math.random() * 60),
    size: 10 + Math.random() * 16,
    color: ['#e11d6b', '#ec4899', '#f472b6', '#ff6b9d'][Math.floor(Math.random() * 4)],
  }));

  return (
    <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      {parts.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            animation: `floatUp 1.6s ease-out forwards`,
            ['--tw-translate-x' as string]: `${p.dx}px`,
            transform: `translate(${p.dx}px, 0)`,
          }}
        >
          <span style={{ display: 'inline-block', animation: `floatUp 1.6s ease-out forwards` }}>
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 21s-7.5-4.6-10-9.3C.7 8.9 2 5 5.5 5c2 0 3.3 1.1 4.5 2.7C11.2 6.1 12.5 5 14.5 5 18 5 19.3 8.9 17 11.7 14.5 16.4 12 21 12 21z" />
            </svg>
          </span>
        </span>
      ))}
    </span>
  );
}
