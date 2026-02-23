import { Heart } from 'lucide-react';

interface FloatingDonateButtonProps {
  onClick: () => void;
}

export function FloatingDonateButton({ onClick }: FloatingDonateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Dona ora"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20" />
      
      {/* Button */}
      <div className="relative flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="p-2 rounded-full bg-white/20">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <span className="font-medium pr-2">Dona Ora</span>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap">
          Sostieni la nostra parrocchia
          <div className="absolute top-full right-6 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </div>
      </div>
    </button>
  );
}
