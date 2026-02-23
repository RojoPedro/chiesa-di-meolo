import { Church, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Heart } from 'lucide-react';
import { parishInfo, navItems } from '@/data/mockData';

interface FooterProps {
  onDonateClick: () => void;
}

export function Footer({ onDonateClick }: FooterProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-500 text-white">
                <Church className="w-8 h-8" />
              </div>
              <div>
                <span className="block text-sm text-white/70">Parrocchia</span>
                <span className="block font-serif text-xl font-bold">San Giovanni Battista</span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              Un luogo di fede, speranza e carità dal 1534.
              Ti aspettiamo nella nostra comunità.
            </p>
            <button
              onClick={onDonateClick}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <Heart className="w-4 h-4" />
              Sostienici
            </button>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h3 className="font-serif text-lg font-bold mb-6">Link Rapidi</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-white/70 hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5" />
                <span className="text-white/70">{parishInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500" />
                <span className="text-white/70">{parishInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500" />
                <a
                  href={`mailto:${parishInfo.email}`}
                  className="text-white/70 hover:text-amber-400 transition-colors"
                >
                  {parishInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6">Seguici</h3>
            <div className="flex gap-3 mb-8">
              <a
                href="#"
                className="p-3 rounded-xl bg-white/10 hover:bg-amber-500 text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-white/10 hover:bg-amber-500 text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-white/10 hover:bg-amber-500 text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            <h3 className="font-serif text-lg font-bold mb-4">Orari Segreteria</h3>
            <p className="text-white/70">{parishInfo.hours}</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Parrocchia San Giovanni Battista. Tutti i diritti riservati.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
