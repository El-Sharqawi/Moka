import { useEffect, useRef, useState } from 'react';
import { Music, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, List, X, ExternalLink } from 'lucide-react';
import { songs, type Song } from '../data/songs';

// مشغل موسيقى شيك في أسفل الشاشة
// يدعم ملفات MP3 محلية (حقل src) أو روابط رسمية (حقل link)
// ما بيشتغلش أوتوماتيك لما يفتح الموقع
export default function MusicPlayer() {
  const [open, setOpen] = useState(false); // القائمة مفتوحة؟
  const [expanded, setExpanded] = useState(false); // المشغل مفتول بالكامل؟
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current: Song = songs[currentIndex];
  const hasAudio = Boolean(current.src);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // لما نغيّر الأغنية
  useEffect(() => {
    if (!audioRef.current) return;
    if (hasAudio && playing) {
      audioRef.current.play().catch(() => setPlaying(false));
    } else if (!hasAudio) {
      // لو مفيش ملف صوت، نشّيل الروابط الرسمية بس
      setPlaying(false);
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (!hasAudio) return;
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const next = () => {
    setCurrentIndex((i) => (i + 1) % songs.length);
    setPlaying(true);
  };

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
    setPlaying(true);
  };

  const selectSong = (i: number) => {
    setCurrentIndex(i);
    setOpen(false);
    if (hasAudio) setPlaying(true);
  };

  return (
    <>
      {/* عنصر الصوت المخفي */}
      {hasAudio && (
        <audio
          ref={audioRef}
          src={current.src}
          onEnded={next}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      {/* زر تشغيل سريع لما المشغل مقفول */}
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

      {/* المشغل الكامل */}
      {expanded && (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-scaleIn">
          <div className="glass rounded-3xl border border-rose-200/50 p-4 shadow-2xl">
            {/* رأس المشغل */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-rose-700">المزيكا الرومانسية</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setOpen((o) => !o)}
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

            {/* صورة الأغنية + المعلومات */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${current.color} shadow-lg`}
              >
                {current.cover ? (
                  <img src={current.cover} alt={current.title} className="h-full w-full object-cover" />
                ) : (
                  <Music className="h-7 w-7 text-white/90" />
                )}
                {playing && hasAudio && (
                  <span className="absolute inset-0 flex items-end justify-center gap-0.5 bg-black/20 p-2">
                    <span className="h-2 w-1 animate-pulse rounded-full bg-white" />
                    <span className="h-3 w-1 animate-pulse rounded-full bg-white" style={{ animationDelay: '0.2s' }} />
                    <span className="h-2 w-1 animate-pulse rounded-full bg-white" style={{ animationDelay: '0.4s' }} />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold text-rose-800">{current.title}</p>
                <p className="truncate text-sm text-rose-500">{current.artist}</p>
                {!hasAudio && current.link && (
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
                  >
                    اسمعي على المنصة <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <button
                onClick={prev}
                aria-label="السابقة"
                className="rounded-full p-2 text-rose-700 transition hover:bg-rose-100 active:scale-90"
              >
                <SkipForward className="h-5 w-5" />
              </button>
              <button
                onClick={togglePlay}
                disabled={!hasAudio}
                aria-label={playing ? 'إيقاف' : 'تشغيل'}
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-lg transition-all hover:scale-110 active:scale-95 ${
                  !hasAudio ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                {playing && hasAudio ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-0.5" />}
              </button>
              <button
                onClick={next}
                aria-label="التالية"
                className="rounded-full p-2 text-rose-700 transition hover:bg-rose-100 active:scale-90"
              >
                <SkipBack className="h-5 w-5" />
              </button>
            </div>

            {/* شريط الصوت */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
                className="rounded-full p-1.5 text-rose-600 transition hover:bg-rose-100"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setMuted(false);
                }}
                aria-label="مستوى الصوت"
                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-rose-200 accent-rose-600"
                style={{
                  background: `linear-gradient(to left, #e11d6b ${(muted ? 0 : volume) * 100}%, #fbcfe8 ${(muted ? 0 : volume) * 100}%)`,
                }}
              />
            </div>

            {!hasAudio && (
              <p className="mt-2 text-center text-[11px] text-rose-400">
                ضيفي ملف MP3 في مجلد assets/music عشان تشتغل هنا
              </p>
            )}
          </div>

          {/* قائمة الأغاني */}
          {open && (
            <div className="mt-2 max-h-64 animate-scaleIn overflow-y-auto rounded-2xl glass border border-rose-200/50 p-2 shadow-xl no-scrollbar">
              {songs.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => selectSong(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right transition hover:bg-rose-100 ${
                    i === currentIndex ? 'bg-rose-100' : ''
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.color}`}
                  >
                    {s.cover ? (
                      <img src={s.cover} alt="" className="h-full w-full rounded-lg object-cover" />
                    ) : (
                      <Music className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-rose-800">{s.title}</p>
                    <p className="truncate text-xs text-rose-400">{s.artist}</p>
                  </div>
                  {i === currentIndex && playing && hasAudio && (
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
