import { useState, useEffect, useCallback } from 'react';
import { supabase, type Donation } from '@/lib/supabase';

// ---------- Fetch hook ----------

export function useDonors() {
    const [donors, setDonors] = useState<Donation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDonors = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const { data, error: fetchError } = await supabase
            .from('donations')
            .select('*')
            .eq('payment_status', 'completed')
            .order('created_at', { ascending: false });

        if (fetchError) {
            setError(fetchError.message);
        } else {
            setDonors(data ?? []);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchDonors();
    }, [fetchDonors]);

    return { donors, isLoading, error, refetch: fetchDonors };
}

// ---------- Submit donation ----------

export interface SubmitDonationInput {
    donor_name: string | null;
    donor_email: string | null;
    amount: number;
    payment_method: 'paypal' | 'card' | 'bank';
    message: string | null;
    is_anonymous: boolean;
}

export async function submitDonation(input: SubmitDonationInput): Promise<{
    donation: Donation | null;
    error: string | null;
}> {
    // 1. Insert a pending donation row
    const { data: inserted, error: insertError } = await supabase
        .from('donations')
        .insert({
            donor_name: input.is_anonymous ? null : input.donor_name,
            donor_email: input.is_anonymous ? null : input.donor_email,
            amount: input.amount,
            payment_method: input.payment_method,
            payment_status: 'pending',
            message: input.message,
            is_anonymous: input.is_anonymous,
        })
        .select()
        .single();

    if (insertError || !inserted) {
        return { donation: null, error: insertError?.message ?? 'Unknown error' };
    }

    // 2. Simulate payment processing
    //    For PayPal: 2s delay simulating the redirect + confirmation
    //    For card/bank: immediate
    if (input.payment_method === 'paypal') {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // 3. Mark the donation as completed
    const { data: updated, error: updateError } = await supabase
        .from('donations')
        .update({
            payment_status: 'completed',
            paypal_order_id:
                input.payment_method === 'paypal'
                    ? `MOCK_PP_${Math.random().toString(36).substring(2, 12).toUpperCase()}`
                    : null,
        })
        .eq('id', inserted.id)
        .select()
        .single();

    if (updateError || !updated) {
        return { donation: null, error: updateError?.message ?? 'Update failed' };
    }

    return { donation: updated, error: null };
}
