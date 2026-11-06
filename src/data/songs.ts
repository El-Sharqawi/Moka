export type Song = {
  id: number;
  title: string;
  artist: string;
  cover: string;
  src: string;
  color: string;
};

export const songs: Song[] = [
  {
    id: 1,
    title: 'عيونك نوروا حياتي',
    artist: 'تامر عاشور',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song1.mp3`,
    color: 'from-rose-500 to-rose-700',
  },
  {
    id: 2,
    title: 'كل وعد',
    artist: 'وائل جسار',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song2.mp3`,
    color: 'from-fuchsia-500 to-rose-600',
  },
  {
    id: 3,
    title: 'خليني في حضنك يا حبيبي',
    artist: 'تامر عاشور',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song3.mp3`,
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 4,
    title: 'أنت هدية',
    artist: 'تامر عاشور',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song5.mp3`,
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 5,
    title: 'مكتوبة ليك',
    artist: 'إليسا',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song4.mp3`,
    color: 'from-rose-600 to-rose-800',
  },
  {
    id: 6,
    title: 'حبك رزق',
    artist: 'تامر عاشور',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song6.mp3`,
    color: 'from-amber-400 to-rose-500',
  },
  {
    id: 7,
    title: 'اوعديني',
    artist: 'رامي جمال',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song7.mp3`,
    color: 'from-teal-400 to-rose-500',
  },
  {
    id: 8,
    title: 'الفرحة اللي في بالي',
    artist: 'عمرو دياب',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song8.mp3`,
    color: 'from-indigo-400 to-rose-500',
  },
  {
    id: 9,
    title: 'الحب جاني جاني',
    artist: 'تواليت',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song9.mp3`,
    color: 'from-violet-400 to-rose-500',
  },
  {
    id: 10,
    title: 'جريئة أوي',
    artist: 'تواليت',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song10.mp3`,
    color: 'from-violet-400 to-rose-500',
  },
  {
    id: 11,
    title: 'حسيني',
    artist: 'تواليت',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song11.mp3`,
    color: 'from-violet-400 to-rose-500',
  },
  {
    id: 12,
    title: 'متيجي أعدي عليكي 💛',
    artist: 'تواليت',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song12.mp3`,
    color: 'from-violet-400 to-rose-500',
  },
  {
    id: 13,
    title: 'أنا بعشقك أنا',
    artist: 'ميادة الحناوي',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song13.mp3`,
    color: 'from-violet-400 to-rose-500',
  },
  {
    id: 14,
    title: 'كنت فين',
    artist: 'شفيقة',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song14.mp3`,
    color: 'from-violet-400 to-rose-500',
  },
  {
    id: 15,
    title: 'أعلن لحبك وفائي',
    artist: 'أصالة',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song15.mp3`,
    color: 'from-violet-400 to-rose-500',
  },
  {
    id: 16,
    title: 'ليلتنا بوم بوم',
    artist: 'رمضان',
    cover: '',
    src: `${import.meta.env.BASE_URL}assets/music/song16.mp3`,
    color: 'from-violet-400 to-rose-500',
  },
];