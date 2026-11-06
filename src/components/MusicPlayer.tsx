import { useEffect, useRef, useState } from 'react';
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  List,
  X,
} from 'lucide-react';
import { songs } from '../data/songs';

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);

  const current = songs[currentIndex];

  const playFromStart = async (audio: HTMLAudioElement) => {
    setAudioError(false);

    try {
      audio.currentTime = 0;
      playingRef.current = true;
      await audio.play();
      setPlaying(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      playingRef.current = false;
      setPlaying(false);
      setAudioError(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.load();

    setAudioError(false);

    if (playingRef.current) {
      audio.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        playingRef.current = false;
        setPlaying(false);
        setAudioError(true);
      });
    }
  }, [currentIndex]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      playingRef.current = false;
      setPlaying(false);
      return;
    }

    await playFromStart(audio);
  };

  const next = () => {
    playingRef.current = true;
    setPlaying(true);
    setCurrentIndex((i) => (i + 1) % songs.length);
  };

  const prev = () => {
    playingRef.current = true;
    setPlaying(true);
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
  };

  const selectSong = (index: number) => {
    playingRef.current = true;
    setPlaying(true);
    if (index === currentIndex) {
      const audio = audioRef.current;
      if (audio) void playFromStart(audio);
    }
    setCurrentIndex(index);
    setOpen(false);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={current.src}
        preload="metadata"
        onEnded={next}
        onPlay={() => {
          playingRef.current = true;
          setPlaying(true);
        }}
        onPause={(event) => {
          if (!event.currentTarget.paused) return;
          playingRef.current = false;
          setPlaying(false);
        }}
        onError={() => {
          playingRef.current = false;
          setPlaying(false);
          setAudioError(true);
        }}
      />

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          aria-label="افتحي المشغل"
          className="glass-rose fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-rose-700 shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <Music className={`h-5 w-5 ${playing ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-semibold">المزيكا</span>
        </button>
      )}

      {expanded && (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-scaleIn">
          <div className="glass rounded-3xl border border-rose-200/50 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-rose-700">
                المزيكا الرومانسية
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setOpen((value) => !value)}
                  aria-label="قائمة الأغاني"
                  className="rounded-full p-2 text-rose-600 transition hover:bg-rose-100"
                >
                  <List className="h-5 w-5" />
                </button>

                <button
                  onClick={() => setExpanded(false)}
                  aria-label="تصغير"
                  className="rounded-full p-2 text-rose-600 transition hover:bg-rose-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mb-3 flex items-center gap-3">
              <div
                className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${current.color} shadow-lg`}
              >
                {current.cover ? (
                  <img
                    src={current.cover}
                    alt={current.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Music className="h-7 w-7 text-white/90" />
                )}

                {playing && (
                  <span className="absolute inset-0 flex items-end justify-center gap-0.5 bg-black/20 p-2">
                    <span className="h-2 w-1 animate-pulse rounded-full bg-white" />
                    <span
                      className="h-3 w-1 animate-pulse rounded-full bg-white"
                      style={{ animationDelay: '0.2s' }}
                    />
                    <span
                      className="h-2 w-1 animate-pulse rounded-full bg-white"
                      style={{ animationDelay: '0.4s' }}
                    />
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold text-rose-800">
                  {current.title}
                </p>
                <p className="truncate text-sm text-rose-500">
                  {current.artist}
                </p>
              </div>
            </div>

            <div className="mb-3 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                aria-label="الأغنية السابقة"
                className="rounded-full p-2 text-rose-700 transition hover:bg-rose-100 active:scale-90"
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                onClick={togglePlay}
                aria-label={playing ? 'إيقاف' : 'تشغيل'}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-lg transition-all hover:scale-110 active:scale-95"
              >
                {playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 translate-x-0.5" />
                )}
              </button>

              <button
                onClick={next}
                aria-label="الأغنية التالية"
                className="rounded-full p-2 text-rose-700 transition hover:bg-rose-100 active:scale-90"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMuted((value) => !value)}
                aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
                className="rounded-full p-1.5 text-rose-600 transition hover:bg-rose-100"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(event) => {
                  setVolume(Number(event.target.value));
                  setMuted(false);
                }}
                aria-label="مستوى الصوت"
                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-rose-200 accent-rose-600"
              />
            </div>

            {audioError && (
              <p className="mt-3 text-center text-xs text-red-500">
                مش قادرين نشغل الأغنية. اتأكدي إن ملف MP3 موجود وصيغته سليمة.
              </p>
            )}
          </div>

          {open && (
            <div className="no-scrollbar mt-2 max-h-64 animate-scaleIn overflow-y-auto rounded-2xl border border-rose-200/50 p-2 shadow-xl glass">
              {songs.map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => selectSong(index)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right transition hover:bg-rose-100 ${
                    index === currentIndex ? 'bg-rose-100' : ''
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${song.color}`}
                  >
                    {song.cover ? (
                      <img
                        src={song.cover}
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <Music className="h-4 w-4 text-white" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-rose-800">
                      {song.title}
                    </p>
                    <p className="truncate text-xs text-rose-400">
                      {song.artist}
                    </p>
                  </div>

                  {index === currentIndex && playing && (
                    <Play className="h-4 w-4 shrink-0 fill-rose-600 text-rose-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}