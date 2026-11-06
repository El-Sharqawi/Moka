import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);
  const playRequestRef = useRef(0);
  const pendingPlayRef = useRef<number | null>(null);

  const current = songs[currentIndex];

  const syncPlayingState = useCallback((value: boolean) => {
    playingRef.current = value;
    setPlaying(value);
  }, []);

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const progress =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  const playAudio = useCallback(
    async (audio: HTMLAudioElement, restart: boolean) => {
      const requestId = ++playRequestRef.current;
      pendingPlayRef.current = requestId;
      setAudioError(false);
      syncPlayingState(true);

      try {
        if (restart) audio.currentTime = 0;
        await audio.play();

        if (requestId !== playRequestRef.current || audioRef.current !== audio) return;
        pendingPlayRef.current = null;

        if (audio.paused) {
          syncPlayingState(false);
          return;
        }

        syncPlayingState(true);
      } catch (error) {
        if (requestId !== playRequestRef.current || audioRef.current !== audio) return;

        pendingPlayRef.current = null;
        syncPlayingState(false);

        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setAudioError(true);
        }
      }
    },
    [syncPlayingState],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = muted ? 0 : volume;
  }, [current.id, muted, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(0);
    setDuration(0);

    audio.load();
    setAudioError(false);

    if (playingRef.current) {
      void playAudio(audio, false);
    }

    return () => {
      playRequestRef.current += 1;
      pendingPlayRef.current = null;
      audio.pause();
    };
  }, [current.id, playAudio]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingRef.current) {
      playRequestRef.current += 1;
      pendingPlayRef.current = null;
      syncPlayingState(false);
      audio.pause();
      return;
    }

    void playAudio(audio, false);
  };

  const next = (shouldPlay = playingRef.current) => {
    playRequestRef.current += 1;
    pendingPlayRef.current = null;

    if (playingRef.current !== shouldPlay) {
      syncPlayingState(shouldPlay);
    }

    setCurrentIndex((i) => (i + 1) % songs.length);
  };

  const prev = () => {
    playRequestRef.current += 1;
    pendingPlayRef.current = null;
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
  };

  const selectSong = (index: number) => {
    setAudioError(false);
    setOpen(false);

    if (index === currentIndex) {
      const audio = audioRef.current;
      if (audio) void playAudio(audio, true);
      return;
    }

    playRequestRef.current += 1;
    pendingPlayRef.current = null;
    syncPlayingState(true);
    setCurrentIndex(index);
  };

  return (
    <>
      <audio
        key={current.id}
        ref={audioRef}
        src={current.src}
        preload="metadata"
        onLoadedMetadata={(event) => {
          if (audioRef.current !== event.currentTarget) return;
          setDuration(event.currentTarget.duration || 0);
          setCurrentTime(event.currentTarget.currentTime || 0);
        }}
        onDurationChange={(event) => {
          if (audioRef.current !== event.currentTarget) return;
          setDuration(event.currentTarget.duration || 0);
        }}
        onTimeUpdate={(event) => {
          if (audioRef.current !== event.currentTarget) return;
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onEnded={(event) => {
          if (audioRef.current === event.currentTarget) next(true);
        }}
        onPlay={(event) => {
          if (audioRef.current !== event.currentTarget || event.currentTarget.paused) return;
          pendingPlayRef.current = null;
          syncPlayingState(true);
        }}
        onPause={(event) => {
          if (
            audioRef.current !== event.currentTarget ||
            !event.currentTarget.paused ||
            pendingPlayRef.current !== null
          ) return;

          syncPlayingState(false);
        }}
        onError={(event) => {
          if (audioRef.current !== event.currentTarget) return;
          playRequestRef.current += 1;
          pendingPlayRef.current = null;
          syncPlayingState(false);
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
                onClick={() => next()}
                aria-label="الأغنية التالية"
                className="rounded-full p-2 text-rose-700 transition hover:bg-rose-100 active:scale-90"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Song progress bar */}
            <div className="mb-4">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={(event) => {
                  const audio = audioRef.current;
                  if (!audio || !Number.isFinite(duration)) return;

                  const time = Number(event.target.value);
                  audio.currentTime = time;
                  setCurrentTime(time);
                }}
                aria-label="تقدم الأغنية"
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-rose-200 accent-rose-600"
                style={{
                  background: `linear-gradient(to right, #e11d48 ${progress}%, #fecdd3 ${progress}%)`,
                }}
              />

              <div className="mt-1 flex justify-between text-xs text-rose-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
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
                تعذّر تشغيل الأغنية. تحققي من الاتصال بالإنترنت أو جرّبي أغنية أخرى.
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