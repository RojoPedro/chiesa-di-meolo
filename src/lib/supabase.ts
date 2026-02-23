import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------- Types ----------

export interface Donation {
    id: string;
    donor_name: string | null;
    donor_email: string | null;
    amount: number;
    payment_method: 'paypal' | 'card' | 'bank';
    payment_status: 'pending' | 'completed' | 'failed';
    paypal_order_id: string | null;
    message: string | null;
    is_anonymous: boolean;
    created_at: string;
}

export type NewDonation = Omit<Donation, 'id' | 'created_at' | 'payment_status' | 'paypal_order_id'>;
