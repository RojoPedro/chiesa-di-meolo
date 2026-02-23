import { caritasActivities } from '@/data/mockData';
import { Heart, HeartHandshake, Users, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ElementType> = {
  'heart-handshake': HeartHandshake,
  'users': Users,
};

export function CaritasSection() {
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
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {caritasActivities.map((activity) => {
            const IconComponent = iconMap[activity.icon] || Heart;

            return (
              <div
                key={activity.id}
                className="group bg-slate-50 rounded-3xl p-8 hover:bg-gradient-to-br hover:from-rose-50 hover:to-amber-50 transition-all duration-500 border border-transparent hover:border-rose-100"
              >
                {/* Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="p-2 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-rose-600" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl text-slate-800 font-bold mb-4 group-hover:text-rose-700 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {activity.description}
                </p>

                {/* How to join */}
                <div className="bg-white/70 rounded-xl p-4 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Come partecipare:</p>
                  <p className="text-slate-700 text-sm">{activity.howToJoin}</p>
                </div>

                {/* Contact */}
                <a
                  href={`mailto:${activity.contact}`}
                  className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {activity.contact}
                </a>
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
            <Button
              size="lg"
              className="bg-white text-rose-600 hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium shadow-lg"
            >
              Contattaci per Informazioni
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
