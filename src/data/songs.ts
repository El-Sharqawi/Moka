// قائمة الأغاني - عدّليها براحتك
// اضيفي ملفات MP3 في مجلد assets/music وغيّري الـ src لاسم الملف
// أو استخدمي رابط رسمي من منصة موسيقى (أنغامي / سبوتيفاي / ديزر) في حقل link

export type Song = {
  id: number;
  title: string; // اسم الأغنية
  artist: string; // اسم المطرب
  cover: string; // صورة مصغرة (URL أو لون)
  src?: string; // ملف MP3 محلي (مثلاً: /assets/music/song1.mp3)
  link?: string; // رابط رسمي للتشغيل على منصة موسيقى
  color: string; // لون الكارت لو مفيش صورة
};

export const songs: Song[] = [
  {
    id: 1,
    title: 'نفسية',
    artist: 'تامر عاشور',
    cover: '',
    link: 'https://music.apple.com/eg/song/nafsy/1440829243',
    color: 'from-rose-500 to-rose-700',
  },
  {
    id: 2,
    title: 'هعيش عشانك',
    artist: 'تامر عاشور',
    cover: '',
    link: 'https://music.apple.com/eg/song/h3sh-3shank/1440829243',
    color: 'from-fuchsia-500 to-rose-600',
  },
  {
    id: 3,
    title: 'مكتوبلي',
    artist: 'تامر عاشور',
    cover: '',
    link: 'https://music.apple.com/eg/song/maktobly/1440829243',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 4,
    title: 'لو قلبي حب',
    artist: 'تامر عاشور',
    cover: '',
    link: 'https://music.apple.com/eg/song/law-alby-7ab/1440829243',
    color: 'from-rose-600 to-rose-800',
  },
  {
    id: 5,
    title: 'حبيبي يا نور العين',
    artist: 'عمرو دياب',
    cover: '',
    link: 'https://music.apple.com/eg/song/7abibi-ya-nour-el-ain/1531581525',
    color: 'from-amber-400 to-rose-500',
  },
  {
    id: 6,
    title: 'موعود',
    artist: 'عمرو دياب',
    cover: '',
    link: 'https://music.apple.com/eg/song/maw3od/1531581525',
    color: 'from-teal-400 to-rose-500',
  },
  {
    id: 7,
    title: 'أنتِ حبيبي وعمري',
    artist: 'محمد منير',
    cover: '',
    link: 'https://music.apple.com/eg/artist/mohamed-mounir/1440819243',
    color: 'from-indigo-400 to-rose-500',
  },
  {
    id: 8,
    title: 'بحبك',
    artist: 'محمد حماقي',
    cover: '',
    link: 'https://music.apple.com/eg/artist/mohamed-hamaki/1440819243',
    color: 'from-violet-400 to-rose-500',
  },
];

// ملاحظة: لتحميل ملفات MP3 محلية، ضعيها في مجلد assets/music
// وغيّري حقل src لكل أغنية لـ: /assets/music/اسم-الملف.mp3
// والمشغل هيشغّلها تلقائياً بدل الروابط الرسمية.
