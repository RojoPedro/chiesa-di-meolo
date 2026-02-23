// Tipi per il sito parrocchiale

export interface MassSchedule {
  id: string;
  day: string;
  time: string;
  type: 'ferial' | 'festive' | 'special';
  note?: string;
}

export interface ConfessionSchedule {
  id: string;
  day: string;
  time: string;
  note?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface HistoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface CaritasActivity {
  id: string;
  title: string;
  description: string;
  icon: string;
  howToJoin: string;
  contact: string;
}

export interface DownloadFile {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'audio';
  size: string;
  url: string;
  date: string;
  category: 'canti' | 'bollettino' | 'moduli';
}

export interface Supporter {
  id: string;
  name: string | null;
  amount: number;
  method: 'card' | 'bank' | 'cash' | 'paypal';
  date: string;
  isAnonymous: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface DonationData {
  amount: number;
  name: string;
  email: string;
  isAnonymous: boolean;
  message?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
