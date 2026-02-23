import { massSchedules, confessionSchedules } from '@/data/mockData';
import { Calendar, Clock, Info, BookOpen } from 'lucide-react';

export function OrariSection() {
  const feriali = massSchedules.filter((m) => m.type === 'ferial');
  const festivi = massSchedules.filter((m) => m.type === 'festive');
  const speciali = massSchedules.filter((m) => m.type === 'special');

  return (
    <section id="orari" className="py-24 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 mb-6">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Orari Liturgici</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-800 font-bold mb-6">
            Orari delle Messe
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Partecipa alla celebrazione eucaristica. Ti aspettiamo per vivere insieme 
            la bellezza della fede nella nostra comunità parrocchiale.
          </p>
        </div>

        {/* Tables Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Messe Feriali */}
          <div className="bg-slate-50 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-700">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-slate-800 font-bold">
                  Messe Feriali
                </h3>
                <p className="text-slate-500 text-sm">Dal Lunedì al Sabato</p>
              </div>
            </div>

            <div className="space-y-3">
              {feriali.map((mass) => (
                <div
                  key={mass.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <span className="font-medium text-slate-800">{mass.day}</span>
                    {mass.note && (
                      <p className="text-slate-500 text-sm">{mass.note}</p>
                    )}
                  </div>
                  <span className="font-serif text-xl text-amber-700 font-semibold">
                    {mass.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Messe Festive */}
          <div className="bg-slate-50 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-700">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-slate-800 font-bold">
                  Messe Festive
                </h3>
                <p className="text-slate-500 text-sm">Domenica e prefeste</p>
              </div>
            </div>

            <div className="space-y-3">
              {festivi.map((mass) => (
                <div
                  key={mass.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <span className="font-medium text-slate-800">{mass.day}</span>
                    {mass.note && (
                      <p className="text-slate-500 text-sm">{mass.note}</p>
                    )}
                  </div>
                  <span className="font-serif text-xl text-amber-700 font-semibold">
                    {mass.time}
                  </span>
                </div>
              ))}
              {speciali.map((mass) => (
                <div
                  key={mass.id}
                  className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100"
                >
                  <div>
                    <span className="font-medium text-slate-800">{mass.day}</span>
                    {mass.note && (
                      <p className="text-slate-500 text-sm">{mass.note}</p>
                    )}
                  </div>
                  <span className="font-serif text-xl text-amber-700 font-semibold">
                    {mass.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confessioni */}
        <div className="mt-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-500 text-white">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-slate-800 font-bold">
                  Orari delle Confessioni
                </h3>
                <p className="text-slate-500 text-sm">
                  Sacramento della Riconciliazione
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {confessionSchedules.map((conf) => (
                <div
                  key={conf.id}
                  className="flex items-start gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl"
                >
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800 block">
                      {conf.day}
                    </span>
                    <span className="text-amber-700 font-semibold">
                      {conf.time}
                    </span>
                    {conf.note && (
                      <p className="text-slate-500 text-sm mt-1">{conf.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 bg-amber-100/50 rounded-xl">
              <Info className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <p className="text-slate-700 text-sm">
                Per confessioni fuori dagli orari indicati, è possibile concordare un appuntamento 
                contattando direttamente il parroco o la segreteria parrocchiale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
