import { useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import Welcome from './components/Welcome';
import Home from './components/Home';
import { useLocalStorage } from './lib/utils';

export default function App() {
  const [entered, setEntered] = useLocalStorage<boolean>('muna_entered', false);
  const [burstKey, setBurstKey] = useState(0);

  const triggerBurst = () => setBurstKey((k) => k + 1);

  return (
    <div className="relative min-h-[100dvh] font-cairo text-rose-900">
      <AnimatedBackground />
      <FloatingHearts count={12} burst burstKey={burstKey} />

      {entered ? (
        <div className="animate-fadeIn">
          <Home onBurst={triggerBurst} />
          <MusicPlayer />
        </div>
      ) : (
        <Welcome
          onEnter={() => {
            setEntered(true);
            triggerBurst();
          }}
        />
      )}
    </div>
  );
}
