import type {
  MassSchedule,
  ConfessionSchedule,
  GalleryImage,
  HistoryEvent,
  CaritasActivity,
  DownloadFile,
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
  { id: '3', day: 'Su appuntamento', time: 'Contattare la segreteria', note: 'Tel: 0421 61025' },
];

export const historyEvents: HistoryEvent[] = [
  {
    id: '1',
    year: 'V Secolo',
    title: 'Origini Antiche',
    description: 'La fondazione della pieve di Meolo risale al V secolo ad opera dei vescovi di Altino, rendendola una delle chiese più antiche del territorio veneziano.',
    image: '/images/secoloV.png',
  },
  {
    id: '2',
    year: '1146',
    title: 'Prima Menzione Documentata',
    description: 'Il 15 luglio 1146, il vescovo di Treviso Gregorio Giustiniani concede la pieve al Capitolo dei Canonici, sottraendola al diretto controllo vescovile.',
    image: '/images/chiesa-storica5.jpg',
  },
  {
    id: '3',
    year: 'XV Secolo',
    title: 'La Chiesa Attuale',
    description: 'Viene eretto l\'attuale edificio in stile romanico-rinascimentale a tre navate. La facciata in mattoni conserva ancora tracce di rifacimenti medievali e un rosone occluso.',
    image: '/images/chiesa-attuale.jpg',
  },
  {
    id: '4',
    year: '1758',
    title: 'Il Genio dei Tiepolo',
    description: 'Domenico Tiepolo, figlio di Giambattista, decora la volta del presbiterio con un mirabile ciclo di affreschi raffiguranti il Battesimo di Gesù e i quattro Evangelisti.',
    image: '/images/history-4.jpg',
  },
];

export const galleryImages: GalleryImage[] = [
  { id: '1', src: '/images/chiesa-storica1.jpg', alt: 'Facciata della chiesa', caption: 'La facciata in mattoni a vista' },
  { id: '2', src: '/images/chiesa-storica2.jpg', alt: 'Interno della chiesa', caption: 'Navata centrale e presbiterio' },
  { id: '3', src: '/images/chiesa-storica3.jpg', alt: 'Altare maggiore', caption: 'L\'altare con la pala di Matteo Ponzone' },
  { id: '4', src: '/images/chiesa-storica4.jpg', alt: 'Campanile', caption: 'Il campanile rinascimentale' },
  { id: '5', src: '/images/chiesa-storica5.jpg', alt: 'Affreschi del Tiepolo', caption: 'Dettaglio degli affreschi di Domenico Tiepolo' },
  { id: '6', src: '/images/chiesa-storica6.jpg', alt: 'Organo', caption: 'L\'organo Hradetzky' },
];

export const caritasActivities: CaritasActivity[] = [
  {
    id: '1',
    title: 'Sportello Ascolto',
    description: 'Ascolto professionale e orientamento per chi vive situazioni di disagio psicologico, familiare o sociale.',
    icon: 'heart-handshake',
    howToJoin: 'Su appuntamento chiamando il numero 02 1234567 nei giorni feriali.',
    contact: 'meolo@diocesitv.it',
  },
  {
    id: '2',
    title: 'Gruppo Giovani',
    description: 'Incontri settimanali per ragazzi e giovani adulti per crescere nella fede e nel servizio alla comunità.',
    icon: 'users',
    howToJoin: 'Gli incontri sono il venerdì alle 21:00 nel oratorio. Aperto a tutti i ragazzi dai 14 ai 25 anni.',
    contact: 'meolo@diocesitv.it',
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

// export const supporters: Supporter[] = [
//   { id: '1', name: 'Mario Rossi', amount: 100, method: 'card', date: '2025-02-20', isAnonymous: false },
//   { id: '2', name: null, amount: 50, method: 'paypal', date: '2025-02-18', isAnonymous: true },
//   { id: '3', name: 'Famiglia Bianchi', amount: 200, method: 'bank', date: '2025-02-15', isAnonymous: false },
//   { id: '4', name: 'Giuseppe Verdi', amount: 30, method: 'card', date: '2025-02-12', isAnonymous: false },
//   { id: '5', name: null, amount: 150, method: 'bank', date: '2025-02-10', isAnonymous: true },
//   { id: '6', name: 'Anna Maria Colombo', amount: 75, method: 'paypal', date: '2025-02-08', isAnonymous: false },
//   { id: '7', name: 'Comitato Feste', amount: 500, method: 'bank', date: '2025-02-05', isAnonymous: false },
//   { id: '8', name: null, amount: 25, method: 'card', date: '2025-02-03', isAnonymous: true },
//   { id: '9', name: 'Luca e Sara', amount: 120, method: 'card', date: '2025-02-01', isAnonymous: false },
//   { id: '10', name: 'Azienda Edile Rossi Srl', amount: 1000, method: 'bank', date: '2025-01-28', isAnonymous: false },
// ];

export const parishInfo = {
  name: 'Parrocchia di San Giovanni Battista',
  address: 'Piazza Pio X 6, 30020 Meolo (VE)',
  phone: '0421 61025',
  email: 'meolo@diocesitv.it',
  pec: 'parrocchiasangiovanni-meolo@pec.it',
  hours: 'Lun-Ven: 9:00-12:00 / 15:00-18:00',
  priest: 'Rev. Roberto Mistrorigo',
  vicePriest: 'Don Michele Marcato',
  coordinates: {
    lat: 45.62163164844248,
    lng: 12.451641728923748,
  },
};
