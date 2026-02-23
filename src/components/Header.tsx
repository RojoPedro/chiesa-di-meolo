import { useState, useEffect } from 'react';
import { Menu, X, Church, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navItems } from '@/data/mockData';

interface HeaderProps {
  onDonateClick: () => void;
}

export function Header({ onDonateClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 lg:py-3'
        : 'bg-transparent py-3 lg:py-5'
        }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-3 group"
          >
            <div
              className={`p-1.5 lg:p-2 rounded-xl transition-all duration-300 ${isScrolled
                ? 'bg-amber-100 text-amber-700'
                : 'bg-white/20 text-white backdrop-blur-sm'
                }`}
            >
              <Church className="w-5 h-5 lg:w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <span
                className={`block text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-amber-700' : 'text-white/90'
                  }`}
              >
                Parrocchia
              </span>
              <span
                className={`block font-serif text-lg font-semibold -mt-1 transition-colors duration-300 ${isScrolled ? 'text-slate-800' : 'text-white'
                  }`}
              >
                San Giovanni Battista
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-500/10 ${isScrolled
                  ? 'text-slate-700 hover:text-amber-700'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Donate Button */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onDonateClick}
              className={`hidden sm:flex items-center gap-2 rounded-full px-6 transition-all duration-300 ${isScrolled
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg'
                : 'bg-white text-amber-700 hover:bg-amber-50 shadow-lg'
                }`}
            >
              <Heart className="w-4 h-4" />
              <span>Dona Ora</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${isScrolled
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
                }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
            }`}
        >
          <nav
            className={`rounded-2xl p-4 space-y-1 ${isScrolled ? 'bg-slate-50' : 'bg-white/10 backdrop-blur-md'
              }`}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${isScrolled
                  ? 'text-slate-700 hover:bg-amber-100 hover:text-amber-700'
                  : 'text-white hover:bg-white/20'
                  }`}
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => {
                onDonateClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full"
            >
              <Heart className="w-4 h-4 mr-2" />
              Dona Ora
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
