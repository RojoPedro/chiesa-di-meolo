import { useEffect, useState } from 'react';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onDonateClick: () => void;
}

export function HeroSection({ onDonateClick }: HeroSectionProps) {
  const [nextMass, setNextMass] = useState<string>('');

  useEffect(() => {
    // Calcola la prossima messa
    const calculateNextMass = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour * 60 + minute;

      // Orari messa in minuti dalla mezzanotte
      const massTimes: Record<number, number[]> = {
        0: [480, 600, 690, 1110], // Domenica: 8:00, 10:00, 11:30, 18:30
        6: [480, 1110], // Sabato: 8:00, 18:30
      };

      const defaultTimes = [480, 1110]; // Feriali: 8:00, 18:30

      const todayTimes = massTimes[day] || defaultTimes;

      // Trova la prossima messa
      for (const massTime of todayTimes) {
        if (massTime > currentTime) {
          const massHour = Math.floor(massTime / 60);
          const massMinute = massTime % 60;
          return `${String(massHour).padStart(2, '0')}:${String(massMinute).padStart(2, '0')}`;
        }
      }

      // Se non ci sono messe oggi, mostra la prima di domani
      return '08:00';
    };

    setNextMass(calculateNextMass());
  }, []);

  const scrollToOrari = () => {
    const element = document.querySelector('#orari');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Chiesa"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-white/90 text-sm">Meolo, Venezia</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white font-bold leading-tight mb-6">
            Chiesa
            <span className="block text-amber-400">San Giovanni Battista </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            Un luogo di fede, speranza e carità dal 1892.
            Ti invitiamo a partecipare alla nostra comunità parrocchiale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Button
              onClick={onDonateClick}
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sostieni la Parrocchia
            </Button>
            <button
              onClick={scrollToOrari}
              className="inline-flex items-center justify-center gap-0 rounded-full px-8 py-4 text-lg font-medium
                bg-white/10 backdrop-blur-md border border-white/30 text-white
                hover:bg-white/20 hover:border-white/60 hover:shadow-[0_0_24px_rgba(255,255,255,0.15)]
                active:scale-95 transition-all duration-300"
            >
              Scopri gli Orari
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Next Mass Card */}
          <div className="inline-block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-white/70 text-sm uppercase tracking-wider">
                  Prossima Messa
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-serif font-bold text-white">
                  {nextMass}
                </span>
                <span className="text-white/60">oggi</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                Consulta tutti gli orari delle Messe e Confessioni
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
