import { useState } from 'react';
import { caritasActivities } from '@/data/mockData';
import { Heart, HeartHandshake, Users, Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ElementType> = {
  'heart-handshake': HeartHandshake,
  'users': Users,
};

export function CaritasSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="caritas" className="py-24 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 mb-6">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Caritas e Volontariato</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-800 font-bold mb-6">
            Metti il Tuo Cuore in Azione
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            La carità è il cuore della nostra comunità. Scopri come puoi contribuire
            al bene comune attraverso il volontariato o richiedendo supporto.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {caritasActivities.map((activity) => {
            const IconComponent = iconMap[activity.icon] || Heart;
            const isOpen = openId === activity.id;

            return (
              <div
                key={activity.id}
                className={`group bg-slate-50 rounded-3xl transition-all duration-300 border border-transparent ${isOpen ? 'border-rose-100 bg-rose-50/30' : 'hover:border-rose-100 hover:bg-slate-100/50'
                  }`}
              >
                {/* Accordion Header (Mobile) / Card Header (Desktop) */}
                <button
                  onClick={() => toggleAccordion(activity.id)}
                  className="w-full flex items-center justify-between p-6 lg:p-8 text-left md:pointer-events-none focus:outline-none"
                >
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div className={`p-3 lg:p-4 rounded-2xl transition-colors duration-300 ${isOpen ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white'
                      }`}>
                      <IconComponent className="w-6 h-6 lg:w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-xl lg:text-2xl text-slate-800 font-bold group-hover:text-rose-700 transition-colors">
                      {activity.title}
                    </h3>
                  </div>
                  <div className="md:hidden p-2 rounded-full bg-slate-200/50 text-slate-500">
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="hidden md:block p-2 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-rose-600" />
                  </div>
                </button>

                {/* Content (Collapsible on mobile, always visible on desktop) */}
                <div className={`px-6 pb-6 lg:px-8 lg:pb-8 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 md:max-h-none opacity-0 md:opacity-100'
                  }`}>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {activity.description}
                  </p>

                  <div className="bg-white/70 rounded-xl p-4 mb-4">
                    <p className="text-sm text-slate-500 mb-1">Come partecipare:</p>
                    <p className="text-slate-700 text-sm">{activity.howToJoin}</p>
                  </div>

                  <a
                    href={`mailto:${activity.contact}`}
                    className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {activity.contact}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl p-8 md:p-12 text-center text-white">
            <Heart className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h3 className="font-serif text-3xl font-bold mb-4">
              Vuoi Diventare Volontario?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Il tuo tempo è il dono più prezioso. Unisciti alla nostra équipe di volontari
              e metti le tue competenze al servizio dei più bisognosi.
            </p>
            <a href="#contact-form">
              <Button
                size="lg"
                className="bg-white text-rose-600 hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium shadow-lg"
              >
                Contattaci per Informazioni
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
