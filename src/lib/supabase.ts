import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SubmittedAppointment } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-ref.supabase.co' &&
  supabaseAnonKey !== 'your-anon-public-api-key-here'
);

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return supabaseInstance;
};

export interface DatabaseAppointmentInsert {
  reference_id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  preferred_date: string;
  preferred_time_slot: string;
  treatment: string;
  dentist_preference?: string | null;
  message?: string | null;
  status?: string;
  created_at?: string;
}

/**
 * Inserts an appointment record into the Supabase 'appointments' table.
 */
export async function insertAppointment(
  appointment: SubmittedAppointment
): Promise<{ success: boolean; error?: string; isLocalFallback?: boolean }> {
  const client = getSupabaseClient();

  // If Supabase environment variables are not yet configured
  if (!client) {
    console.info(
      'Supabase credentials not configured in environment variables. Falling back to local confirmation state.'
    );
    return {
      success: true,
      isLocalFallback: true,
    };
  }

  try {
    const payload: DatabaseAppointmentInsert = {
      reference_id: appointment.referenceId,
      full_name: appointment.fullName.trim(),
      phone: appointment.phone.trim(),
      email: appointment.email.trim() || null,
      preferred_date: appointment.date,
      preferred_time_slot: appointment.timeSlot,
      treatment: appointment.treatment,
      dentist_preference: appointment.dentistPreference || null,
      message: appointment.message.trim() || null,
      status: 'pending',
      created_at: appointment.submittedAt || new Date().toISOString(),
    };

    const { error } = await client.from('appointments').insert([payload]);

    if (error) {
      console.error('Error inserting appointment into Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown database error occurred';
    console.error('Unexpected Supabase insertion error:', message);
    return { success: false, error: message };
  }
}
