import { useDonors } from '@/hooks/useDonations';
import type { Donation } from '@/lib/supabase';
import { Users, CreditCard, Building2, ArrowUpDown, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function PayPalIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.243-8.558 6.243H9.82c-.524 0-.968.382-1.05.9l-1.302 8.245a.56.56 0 0 0 .556.647h3.882c.46 0 .85-.334.922-.788l.038-.199.732-4.638.047-.256a.932.932 0 0 1 .92-.788h.58c3.755 0 6.697-1.527 7.555-5.945.358-1.845.173-3.384-.478-4.134z" />
        </svg>
    );
}

type SortField = 'date' | 'amount' | 'name';
type SortOrder = 'asc' | 'desc';

const methodIcons: Record<string, React.ElementType> = {
    card: CreditCard,
    bank: Building2,
    paypal: PayPalIcon,
};

const methodLabels: Record<string, string> = {
    card: 'Carta',
    bank: 'Bonifico',
    paypal: 'PayPal',
};

function SkeletonRow() {
    return (
        <div className="grid grid-cols-4 gap-4 p-4 items-center animate-pulse">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
            </div>
            <div className="h-4 w-16 bg-slate-200 rounded" />
            <div className="h-4 w-14 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-200 rounded" />
        </div>
    );
}

export function SupportersSection() {
    const { donors, isLoading, error, refetch } = useDonors();
    const [sortField, setSortField] = useState<SortField>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
        setCurrentPage(1);
    };

    const sortedDonors = [...donors].sort((a: Donation, b: Donation) => {
        let comparison = 0;
        switch (sortField) {
            case 'date':
                comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                break;
            case 'amount':
                comparison = a.amount - b.amount;
                break;
            case 'name': {
                const nameA = a.is_anonymous ? 'zzz' : (a.donor_name || '').toLowerCase();
                const nameB = b.is_anonymous ? 'zzz' : (b.donor_name || '').toLowerCase();
                comparison = nameA.localeCompare(nameB);
                break;
            }
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const totalPages = Math.ceil(sortedDonors.length / itemsPerPage);
    const paginatedDonors = sortedDonors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
        }).format(amount);
    };

    const totalDonated = donors.reduce((sum, d) => sum + d.amount, 0);
    const anonymousCount = donors.filter((d) => d.is_anonymous).length;
    const avgDonation = donors.length > 0 ? totalDonated / donors.length : 0;

    return (
        <section className="py-24 bg-slate-50">
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 mb-6">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">I Nostri Sostenitori</span>
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl text-slate-800 font-bold mb-6">
                        Grazie di Cuore
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Un ringraziamento speciale a tutti coloro che con la loro generosità{' '}
                        ci permettono di portare avanti la nostra missione.
                    </p>
                </div>

                {/* Stats */}
                <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm animate-pulse">
                                <div className="h-8 w-20 bg-slate-200 rounded mx-auto mb-2" />
                                <div className="h-3 w-16 bg-slate-100 rounded mx-auto" />
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                                <p className="text-3xl font-serif font-bold text-amber-600 mb-1">{donors.length}</p>
                                <p className="text-slate-500 text-sm">Sostenitori</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                                <p className="text-3xl font-serif font-bold text-amber-600 mb-1">{formatAmount(totalDonated)}</p>
                                <p className="text-slate-500 text-sm">Totale Donato</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                                <p className="text-3xl font-serif font-bold text-amber-600 mb-1">{anonymousCount}</p>
                                <p className="text-slate-500 text-sm">Donazioni Anonime</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                                <p className="text-3xl font-serif font-bold text-amber-600 mb-1">{formatAmount(avgDonation)}</p>
                                <p className="text-slate-500 text-sm">Media Donazione</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Table */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 border-b border-slate-100">
                            <button
                                onClick={() => handleSort('name')}
                                className="flex items-center gap-2 text-left font-medium text-slate-700 hover:text-amber-700 transition-colors"
                            >
                                Nome
                                <ArrowUpDown className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleSort('amount')}
                                className="flex items-center gap-2 text-left font-medium text-slate-700 hover:text-amber-700 transition-colors"
                            >
                                Importo
                                <ArrowUpDown className="w-4 h-4" />
                            </button>
                            <div className="font-medium text-slate-700">Metodo</div>
                            <button
                                onClick={() => handleSort('date')}
                                className="flex items-center gap-2 text-left font-medium text-slate-700 hover:text-amber-700 transition-colors"
                            >
                                Data
                                <ArrowUpDown className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-slate-100">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : error ? (
                                <div className="p-8 text-center">
                                    <p className="text-red-500 mb-4">Errore nel caricamento: {error}</p>
                                    <Button variant="outline" size="sm" onClick={refetch}>
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Riprova
                                    </Button>
                                </div>
                            ) : donors.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">
                                    Nessun sostenitore ancora. Sii il primo!
                                </div>
                            ) : (
                                paginatedDonors.map((donor) => {
                                    const IconComponent = methodIcons[donor.payment_method] || CreditCard;
                                    return (
                                        <div
                                            key={donor.id}
                                            className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="font-medium text-slate-800">
                                                {donor.is_anonymous ? (
                                                    <span className="inline-flex items-center gap-2 text-slate-500">
                                                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                                                        Anonimo
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-2">
                                                        <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                            {donor.donor_name?.charAt(0).toUpperCase()}
                                                        </span>
                                                        <span className="truncate">{donor.donor_name}</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="font-serif text-lg text-amber-700 font-semibold">
                                                {formatAmount(donor.amount)}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <IconComponent className="w-4 h-4 flex-shrink-0" />
                                                <span className="text-sm">{methodLabels[donor.payment_method]}</span>
                                            </div>
                                            <div className="text-slate-600 text-sm">
                                                {formatDate(donor.created_at)}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Pagination + Refresh */}
                        <div className="flex items-center justify-between p-4 border-t border-slate-100">
                            <div className="flex items-center gap-3">
                                <p className="text-sm text-slate-500">
                                    {isLoading ? '...' : `${donors.length} sostenitori`}
                                </p>
                                <button
                                    onClick={refetch}
                                    disabled={isLoading}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors disabled:opacity-40"
                                    title="Aggiorna lista"
                                >
                                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                            {totalPages > 1 && (
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="rounded-lg"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <span className="flex items-center text-sm text-slate-500 px-2">
                                        {currentPage} / {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="rounded-lg"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
