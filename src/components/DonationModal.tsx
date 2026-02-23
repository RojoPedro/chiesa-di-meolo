import { useState } from 'react';
import { X, Heart, CreditCard, Building2, CheckCircle, User, Mail, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { submitDonation } from '@/hooks/useDonations';
import type { Donation } from '@/lib/supabase';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = 'card' | 'bank' | 'paypal';
type DonationStep = 'amount' | 'details' | 'payment' | 'processing' | 'success';

const presetAmounts = [10, 25, 50, 100, 200, 500];

// PayPal SVG icon since lucide doesn't have one
function PayPalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.243-8.558 6.243H9.82c-.524 0-.968.382-1.05.9l-1.302 8.245a.56.56 0 0 0 .556.647h3.882c.46 0 .85-.334.922-.788l.038-.199.732-4.638.047-.256a.932.932 0 0 1 .92-.788h.58c3.755 0 6.697-1.527 7.555-5.945.358-1.845.173-3.384-.478-4.134z" />
    </svg>
  );
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [step, setStep] = useState<DonationStep>('amount');
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paypal');
  const [completedDonation, setCompletedDonation] = useState<Donation | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount(null);
  };

  const getFinalAmount = () => {
    return amount || Number(customAmount) || 0;
  };

  const handleNext = async () => {
    if (step === 'amount' && getFinalAmount() > 0) {
      setStep('details');
    } else if (step === 'details' && (isAnonymous || (name && email))) {
      setStep('payment');
    } else if (step === 'payment') {
      setSubmitError(null);
      setStep('processing');

      const { donation, error } = await submitDonation({
        donor_name: isAnonymous ? null : name,
        donor_email: isAnonymous ? null : email,
        amount: getFinalAmount(),
        payment_method: paymentMethod,
        message: message || null,
        is_anonymous: isAnonymous,
      });

      if (error || !donation) {
        setSubmitError(error ?? 'Errore sconosciuto. Riprova.');
        setStep('payment');
      } else {
        setCompletedDonation(donation);
        setStep('success');
      }
    }
  };

  const handleBack = () => {
    if (step === 'details') setStep('amount');
    else if (step === 'payment') setStep('details');
  };

  const handleClose = () => {
    setStep('amount');
    setAmount(null);
    setCustomAmount('');
    setName('');
    setEmail('');
    setMessage('');
    setIsAnonymous(false);
    setPaymentMethod('paypal');
    setCompletedDonation(null);
    setSubmitError(null);
    onClose();
  };

  const paymentMethods: { id: PaymentMethod; label: string; subtitle: string; icon: React.ElementType }[] = [
    { id: 'paypal', label: 'PayPal', subtitle: 'Demo sandbox — nessun addebito reale', icon: PayPalIcon },
    { id: 'card', label: 'Carta di Credito', subtitle: 'Simulazione mock', icon: CreditCard },
    { id: 'bank', label: 'Bonifico Bancario', subtitle: 'Riceverai le coordinate via email', icon: Building2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold">Dona Ora</h2>
                <p className="text-white/80 text-sm">Sostieni la nostra parrocchia</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step indicator */}
          {step !== 'success' && step !== 'processing' && (
            <div className="flex items-center gap-2 mt-4">
              {(['amount', 'details', 'payment'] as const).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === s
                        ? 'bg-white text-amber-600'
                        : (['amount', 'details', 'payment'].indexOf(step) > i)
                          ? 'bg-white/60 text-amber-700'
                          : 'bg-white/20 text-white'
                      }`}
                  >
                    {i + 1}
                  </div>
                  {i < 2 && <div className="w-8 h-0.5 bg-white/30" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {step === 'amount' && (
            <div className="space-y-6">
              <div>
                <Label className="text-slate-700 font-medium mb-4 block">
                  Scegli l'importo della tua donazione
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAmountSelect(value)}
                      className={`py-4 rounded-xl font-serif text-xl font-semibold transition-all duration-300 ${amount === value
                          ? 'bg-amber-500 text-white shadow-lg scale-105'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                      €{value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-700 font-medium mb-2 block">
                  Oppure inserisci un importo personalizzato
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-serif text-xl">
                    €
                  </span>
                  <Input
                    type="number"
                    placeholder="Importo"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-10 py-6 text-lg font-serif"
                  />
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                  <strong>Importo selezionato:</strong>{' '}
                  <span className="font-serif text-xl font-bold">
                    €{getFinalAmount() || 0}
                  </span>
                </p>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-5">
              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <p className="text-amber-800">
                  <strong>Importo donazione:</strong>{' '}
                  <span className="font-serif text-xl font-bold">€{getFinalAmount()}</span>
                </p>
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                  className="mt-0.5"
                />
                <div>
                  <Label
                    htmlFor="anonymous"
                    className="font-medium text-slate-800 cursor-pointer"
                  >
                    Donazione anonima
                  </Label>
                  <p className="text-sm text-slate-500">
                    Il tuo nome non verrà mostrato nella lista dei sostenitori
                  </p>
                </div>
              </div>

              {!isAnonymous && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nome e Cognome <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Mario Rossi"
                        className="pl-10"
                        required={!isAnonymous}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mario@esempio.it"
                        className="pl-10"
                        required={!isAnonymous}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">Messaggio (opzionale)</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Lascia un messaggio per la comunità..."
                    className="pl-10 resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-5">
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-amber-800">Totale da pagare:</span>
                  <span className="font-serif text-2xl font-bold text-amber-800">
                    €{getFinalAmount()}
                  </span>
                </div>
                {!isAnonymous && (
                  <p className="text-sm text-amber-700 mt-2">
                    Donatore: {name}
                  </p>
                )}
                {isAnonymous && (
                  <p className="text-sm text-amber-700 mt-2">
                    Donazione anonima
                  </p>
                )}
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm">⚠️ {submitError}</p>
                </div>
              )}

              <Label className="text-slate-700 font-medium">Scegli il metodo di pagamento</Label>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${paymentMethod === method.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-slate-200 hover:border-slate-300'
                        }`}
                    >
                      <div
                        className={`p-3 rounded-xl ${paymentMethod === method.id
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-100 text-slate-600'
                          }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <span
                          className={`font-medium block ${paymentMethod === method.id ? 'text-amber-800' : 'text-slate-700'
                            }`}
                        >
                          {method.label}
                        </span>
                        <span className="text-xs text-slate-500">{method.subtitle}</span>
                      </div>
                      {paymentMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-amber-500 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'bank' && (
                <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                  <p className="font-medium text-slate-800">Coordinate bancarie:</p>
                  <p className="text-sm text-slate-600">
                    <strong>Intestatario:</strong> Parrocchia San Giovanni Battista
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>IBAN:</strong> IT60 X054 2811 1010 0000 0123 456
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Causale:</strong> Donazione {isAnonymous ? 'Anonima' : name}
                  </p>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-blue-800 text-sm">
                    ⚡ <strong>Demo PayPal attivo</strong> — Nessun account reale collegato. La donazione sarà simulata e registrata nel database a scopo dimostrativo.
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                    {paymentMethod === 'paypal' ? (
                      <PayPalIcon className="w-10 h-10 text-blue-600" />
                    ) : (
                      <CreditCard className="w-10 h-10 text-amber-600" />
                    )}
                  </div>
                  <Loader2 className="w-24 h-24 absolute -top-2 -left-2 text-amber-400 animate-spin" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-slate-800 font-bold mb-2">
                    {paymentMethod === 'paypal' ? 'Elaborazione PayPal...' : 'Elaborazione in corso...'}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {paymentMethod === 'paypal'
                      ? 'Simulazione redirect PayPal sandbox...'
                      : 'Attendere prego...'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="p-4 rounded-full bg-green-100 text-green-600 w-fit mx-auto mb-6">
                <CheckCircle className="w-16 h-16" />
              </div>
              <h3 className="font-serif text-2xl text-slate-800 font-bold mb-4">
                Grazie per la Tua Donazione!
              </h3>
              <p className="text-slate-600 mb-4">
                Il tuo contributo di <strong>€{getFinalAmount()}</strong> ci aiuterà{' '}
                a continuare la nostra missione pastorale e caritativa.
              </p>
              {completedDonation && (
                <div className="bg-slate-50 rounded-xl p-4 mb-4 text-sm text-slate-500 text-left space-y-1">
                  <p><strong>ID Donazione:</strong> <span className="font-mono">{completedDonation.id.slice(0, 8)}...</span></p>
                  <p><strong>Metodo:</strong> {completedDonation.payment_method === 'paypal' ? 'PayPal (Demo)' : completedDonation.payment_method}</p>
                  {completedDonation.paypal_order_id && (
                    <p><strong>Ref. PayPal:</strong> <span className="font-mono text-xs">{completedDonation.paypal_order_id}</span></p>
                  )}
                </div>
              )}
              {isAnonymous ? (
                <p className="text-sm text-slate-500">
                  Hai scelto di rimanere anonimo. Il tuo nome non verrà pubblicato.
                </p>
              ) : (
                <p className="text-sm text-slate-500">
                  Il tuo nome verrà pubblicato nella lista dei sostenitori.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'success' && step !== 'processing' && (
          <div className="p-6 border-t border-slate-100 flex gap-3">
            {step !== 'amount' && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 rounded-xl"
              >
                Indietro
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={
                (step === 'amount' && getFinalAmount() <= 0) ||
                (step === 'details' && !isAnonymous && (!name || !email))
              }
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl disabled:opacity-50"
            >
              {step === 'payment' ? 'Completa Donazione' : 'Continua'}
            </Button>
          </div>
        )}

        {step === 'success' && (
          <div className="p-6 border-t border-slate-100">
            <Button
              onClick={handleClose}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl"
            >
              Chiudi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
