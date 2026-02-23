import type {
  MassSchedule,
  ConfessionSchedule,
  GalleryImage,
  HistoryEvent,
  CaritasActivity,
  DownloadFile,
  Supporter,
  NavItem,
} from '@/types';

export const navItems: NavItem[] = [
  { id: '1', label: 'Home', href: '#home' },
  { id: '2', label: 'Orari', href: '#orari' },
  { id: '3', label: 'Storia', href: '#storia' },
  { id: '4', label: 'Caritas', href: '#caritas' },
  { id: '5', label: 'Download', href: '#download' },
  { id: '6', label: 'Contatti', href: '#contatti' },
];

export const massSchedules: MassSchedule[] = [
  { id: '1', day: 'Lunedì - Venerdì', time: '08:00', type: 'ferial', note: 'Cappella laterale' },
  { id: '2', day: 'Lunedì - Venerdì', time: '18:30', type: 'ferial' },
  { id: '3', day: 'Sabato', time: '08:00', type: 'ferial' },
  { id: '4', day: 'Sabato', time: '18:30', type: 'festive', note: 'Messa vespertina' },
  { id: '5', day: 'Domenica', time: '08:00', type: 'festive' },
  { id: '6', day: 'Domenica', time: '10:00', type: 'festive', note: 'Messa delle famiglie' },
  { id: '7', day: 'Domenica', time: '11:30', type: 'festive' },
  { id: '8', day: 'Domenica', time: '18:30', type: 'festive' },
  { id: '9', day: 'Festivi prefestivi', time: '19:00', type: 'special', note: 'Orario estivo' },
];

export const confessionSchedules: ConfessionSchedule[] = [
  { id: '1', day: 'Mercoledì', time: '17:00 - 18:00', note: 'Prima della Messa' },
  { id: '2', day: 'Sabato', time: '17:00 - 18:00', note: 'Prima della Messa vespertina' },
  { id: '3', day: 'Su appuntamento', time: 'Contattare la segreteria', note: 'Tel: 02 1234567' },
];

export const historyEvents: HistoryEvent[] = [
  {
    id: '1',
    year: '1892',
    title: 'Fondazione della Parrocchia',
    description: 'La Parrocchia di San Giovanni Battista venne fondata il 15 marzo 1892 per volere del Vescovo di Treviso. La prima chiesa era una piccola cappella in legno che accoglieva le famiglie contadine della zona di Meolo.',
    image: '/images/history-1.jpg',
  },
  {
    id: '2',
    year: '1925',
    title: 'Costruzione della Chiesa Attuale',
    description: 'Grazie alla generosità dei parrocchiani e alla dedizione del parroco Don Luigi Rossi, venne inaugurata la nuova chiesa in stile neoclassico, con la sua imponente facciata e il campanile alto 40 metri.',
    image: '/images/history-2.jpg',
  },
  {
    id: '3',
    year: '1965',
    title: 'Il Concilio e le Riforme',
    description: 'Con il Concilio Vaticano II, la parrocchia si adeguò alle nuove disposizioni liturgiche. Venne installato l\'altare rivolto verso il popolo e si avviarono i primi gruppi di catechesi per giovani e adulti.',
    image: '/images/history-3.jpg',
  },
  {
    id: '4',
    year: '2000',
    title: 'Restauro e Rinnovamento',
    description: 'Nel Giubileo del 2000, la chiesa fu oggetto di un importante restauro conservativo che ne ha valorizzato gli affreschi e gli arredi sacri. Contemporaneamente si è sviluppata l\'attività caritativa verso i più bisognosi.',
    image: '/images/history-4.jpg',
  },
];

export const galleryImages: GalleryImage[] = [
  { id: '1', src: '/images/gallery-1.jpg', alt: 'Facciata della chiesa', caption: 'La facciata neoromanica' },
  { id: '2', src: '/images/gallery-2.jpg', alt: 'Interno della chiesa', caption: 'Navata centrale' },
  { id: '3', src: '/images/gallery-3.jpg', alt: 'Altare maggiore', caption: 'Altare maggiore' },
  { id: '4', src: '/images/gallery-4.jpg', alt: 'Cappella del SS. Sacramento', caption: 'Cappella del SS. Sacramento' },
  { id: '5', src: '/images/gallery-5.jpg', alt: 'Battistero', caption: 'Il battistero' },
  { id: '6', src: '/images/gallery-6.jpg', alt: 'Campanile', caption: 'Il campanile' },
];

export const caritasActivities: CaritasActivity[] = [
  {
    id: '1',
    title: 'Emporio Solidale',
    description: 'Distribuzione di generi alimentari e prodotti di prima necessità a famiglie in difficoltà economica. Operiamo con dignità e rispetto per ogni persona.',
    icon: 'shopping-basket',
    howToJoin: 'Presentarsi in segreteria il martedì e giovedì dalle 9:00 alle 12:00 con documento di identità e ISEE.',
    contact: 'emporio@parrocchiasangiovannibattista.it',
  },
  {
    id: '2',
    title: 'Mensa dei Poveri',
    description: 'Ogni giovedì sera serviamo un pasto caldo a circa 80 persone senza dimora o in situazione di grave marginalità.',
    icon: 'utensils',
    howToJoin: 'Cerciamo volontari per cucinare, servire e accogliere. Età minima 18 anni.',
    contact: 'mensa@parrocchiasangiovannibattista.it',
  },
  {
    id: '3',
    title: 'Sportello Ascolto',
    description: 'Ascolto professionale e orientamento per chi vive situazioni di disagio psicologico, familiare o sociale.',
    icon: 'heart-handshake',
    howToJoin: 'Su appuntamento chiamando il numero 02 1234567 nei giorni feriali.',
    contact: 'ascolto@parrocchiasangiovannibattista.it',
  },
  {
    id: '4',
    title: 'Gruppo Giovani',
    description: 'Incontri settimanali per ragazzi e giovani adulti per crescere nella fede e nel servizio alla comunità.',
    icon: 'users',
    howToJoin: 'Gli incontri sono il venerdì alle 21:00 nel oratorio. Aperto a tutti i ragazzi dai 14 ai 25 anni.',
    contact: 'giovani@parrocchiasangiovannibattista.it',
  },
];

export const downloadFiles: DownloadFile[] = [
  {
    id: '1',
    title: 'Bollettino Parrocchiale - Febbraio 2025',
    type: 'pdf',
    size: '2.4 MB',
    url: '/downloads/bollettino-febbraio-2025.pdf',
    date: '2025-02-01',
    category: 'bollettino',
  },
  {
    id: '2',
    title: 'Bollettino Parrocchiale - Gennaio 2025',
    type: 'pdf',
    size: '2.1 MB',
    url: '/downloads/bollettino-gennaio-2025.pdf',
    date: '2025-01-01',
    category: 'bollettino',
  },
  {
    id: '3',
    title: 'Canti per la Quaresima',
    type: 'pdf',
    size: '1.8 MB',
    url: '/downloads/canti-quaresima.pdf',
    date: '2025-02-15',
    category: 'canti',
  },
  {
    id: '4',
    title: 'Canti per la Pasqua',
    type: 'pdf',
    size: '2.0 MB',
    url: '/downloads/canti-pasqua.pdf',
    date: '2025-02-10',
    category: 'canti',
  },
  {
    id: '5',
    title: 'Modulo Iscrizione Catechismo',
    type: 'pdf',
    size: '450 KB',
    url: '/downloads/iscrizione-catechismo.pdf',
    date: '2024-09-01',
    category: 'moduli',
  },
  {
    id: '6',
    title: 'Modulo Richiesta Battesimo',
    type: 'pdf',
    size: '380 KB',
    url: '/downloads/richiesta-battesimo.pdf',
    date: '2024-01-01',
    category: 'moduli',
  },
  {
    id: '7',
    title: 'Modulo Richiesta Matrimonio',
    type: 'pdf',
    size: '520 KB',
    url: '/downloads/richiesta-matrimonio.pdf',
    date: '2024-01-01',
    category: 'moduli',
  },
];

export const supporters: Supporter[] = [
  { id: '1', name: 'Mario Rossi', amount: 100, method: 'card', date: '2025-02-20', isAnonymous: false },
  { id: '2', name: null, amount: 50, method: 'paypal', date: '2025-02-18', isAnonymous: true },
  { id: '3', name: 'Famiglia Bianchi', amount: 200, method: 'bank', date: '2025-02-15', isAnonymous: false },
  { id: '4', name: 'Giuseppe Verdi', amount: 30, method: 'card', date: '2025-02-12', isAnonymous: false },
  { id: '5', name: null, amount: 150, method: 'bank', date: '2025-02-10', isAnonymous: true },
  { id: '6', name: 'Anna Maria Colombo', amount: 75, method: 'paypal', date: '2025-02-08', isAnonymous: false },
  { id: '7', name: 'Comitato Feste', amount: 500, method: 'bank', date: '2025-02-05', isAnonymous: false },
  { id: '8', name: null, amount: 25, method: 'card', date: '2025-02-03', isAnonymous: true },
  { id: '9', name: 'Luca e Sara', amount: 120, method: 'card', date: '2025-02-01', isAnonymous: false },
  { id: '10', name: 'Azienda Edile Rossi Srl', amount: 1000, method: 'bank', date: '2025-01-28', isAnonymous: false },
];

export const parishInfo = {
  name: 'Parrocchia di San Giovanni Battista',
  address: 'Via Roma, 1 - 30020 Meolo (VE)',
  phone: '0415 969055',
  email: 'info@parrocchiasangiovannibattista.it',
  pec: 'parrocchiasangiovanni-meolo@pec.it',
  hours: 'Lun-Ven: 9:00-12:00 / 15:00-18:00',
  priest: 'Don Marco Bianchi',
  vicePriest: 'Don Andrea Rossi',
  coordinates: {
    lat: 45.6122,
    lng: 12.4381,
  },
};
