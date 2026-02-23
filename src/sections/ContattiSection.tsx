import { useState } from 'react';
import { parishInfo } from '@/data/mockData';
import { MapPin, Phone, Mail, Clock, User, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function ContattiSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula invio form
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contatti" className="py-24 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 mb-6">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Contatti</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-800 font-bold mb-6">
            Siamo Qui per Te
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Per qualsiasi informazione, prenotazione sacramenti o semplicemente
            per parlare, non esitare a contattarci.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="p-3 rounded-xl bg-amber-100 text-amber-700 w-fit mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-slate-800 mb-2">Indirizzo</h3>
                <p className="text-slate-600 text-sm">{parishInfo.address}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="p-3 rounded-xl bg-amber-100 text-amber-700 w-fit mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-slate-800 mb-2">Telefono</h3>
                <p className="text-slate-600 text-sm">{parishInfo.phone}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="p-3 rounded-xl bg-amber-100 text-amber-700 w-fit mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-slate-800 mb-2">Email</h3>
                <p className="text-slate-600 text-sm">{parishInfo.email}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="p-3 rounded-xl bg-amber-100 text-amber-700 w-fit mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-slate-800 mb-2">Orari Segreteria</h3>
                <p className="text-slate-600 text-sm">{parishInfo.hours}</p>
              </div>
            </div>

            {/* Priests */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-amber-700" />
                <h3 className="font-medium text-slate-800">I Nostri Sacerdoti</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Parroco</span>
                  <span className="font-medium text-slate-800">{parishInfo.priest}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Vice-parroco</span>
                  <span className="font-medium text-slate-800">{parishInfo.vicePriest}</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-video relative">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.223!2d${parishInfo.coordinates.lng}!3d${parishInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47794da8381ced77%3A0x33b8a13a0e10f63a!2sChiesa%20arcipretale%20di%20San%20Giovanni%20Battista!5e0!3m2!1sit!2sit!4v1740317000000!5m2!1sit!2sit`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Parrocchia San Giovanni Battista"
                className="absolute inset-0"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 rounded-3xl p-8">
            <h3 className="font-serif text-2xl text-slate-800 font-bold mb-6">
              Scrivici un Messaggio
            </h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-4 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h4 className="text-xl font-medium text-slate-800 mb-2">
                  Messaggio Inviato!
                </h4>
                <p className="text-slate-600">
                  Ti risponderemo al più presto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome e Cognome *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Mario Rossi"
                      className="bg-white border-slate-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="mario@esempio.it"
                      className="bg-white border-slate-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+39 123 456 7890"
                      className="bg-white border-slate-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Oggetto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Richiesta informazioni"
                      className="bg-white border-slate-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Messaggio *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Scrivi qui il tuo messaggio..."
                    className="bg-white border-slate-200 focus:border-amber-500 focus:ring-amber-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-6 text-lg font-medium"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Invia Messaggio
                </Button>

                <p className="text-slate-500 text-sm text-center">
                  I campi contrassegnati con * sono obbligatori
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
