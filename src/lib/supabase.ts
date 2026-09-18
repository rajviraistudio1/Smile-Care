import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { SubmittedAppointment, DatabaseAppointment, AppointmentStatus, AdminUser } from '../types';

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
        persistSession: true,
        autoRefreshToken: true,
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

/**
 * Checks if a given authenticated Supabase user ID exists in the 'clinic_admins' table.
 */
export async function checkIsAdmin(userId: string): Promise<{ isAdmin: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { isAdmin: false, error: 'Supabase is not configured' };
  }

  try {
    const { data, error } = await client
      .from('clinic_admins')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error verifying admin status in clinic_admins table:', error.message);
      return { isAdmin: false, error: error.message };
    }

    return { isAdmin: Boolean(data) };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to verify admin status';
    return { isAdmin: false, error: message };
  }
}

/**
 * Signs in an admin user using email and password, then verifies their clinic_admin role.
 */
export async function signInAdmin(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: AdminUser; isAuthorizedAdmin?: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Supabase credentials are not configured in environment variables.' };
  }

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.trim(),
      password: pass,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'No user data returned from authentication service.' };
    }

    // Check authorization in clinic_admins table
    const { isAdmin, error: authCheckError } = await checkIsAdmin(data.user.id);

    if (!isAdmin) {
      return {
        success: true,
        isAuthorizedAdmin: false,
        user: {
          id: data.user.id,
          email: data.user.email || email,
        },
        error: authCheckError || 'Access Denied: This account is not registered in the clinic_admins authorization table.',
      };
    }

    return {
      success: true,
      isAuthorizedAdmin: true,
      user: {
        id: data.user.id,
        email: data.user.email || email,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Sign in failed';
    return { success: false, error: message };
  }
}

/**
 * Fetches the current session and validates if the user is an authorized admin.
 */
export async function getCurrentAdminUser(): Promise<{
  user: AdminUser | null;
  isAuthorizedAdmin: boolean;
}> {
  const client = getSupabaseClient();
  if (!client) {
    return { user: null, isAuthorizedAdmin: false };
  }

  try {
    const { data: sessionData } = await client.auth.getSession();
    const currentUser = sessionData?.session?.user;

    if (!currentUser) {
      return { user: null, isAuthorizedAdmin: false };
    }

    const { isAdmin } = await checkIsAdmin(currentUser.id);

    return {
      user: {
        id: currentUser.id,
        email: currentUser.email || '',
      },
      isAuthorizedAdmin: isAdmin,
    };
  } catch (err) {
    console.error('Error fetching admin session:', err);
    return { user: null, isAuthorizedAdmin: false };
  }
}

/**
 * Signs out the current admin user.
 */
export async function signOutAdmin(): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: true };
  }

  try {
    const { error } = await client.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Sign out error';
    return { success: false, error: message };
  }
}

/**
 * Fetches appointments from Supabase with optional status filtering.
 */
export async function fetchAppointments(
  statusFilter?: AppointmentStatus | 'all'
): Promise<{ data: DatabaseAppointment[]; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { data: [], error: 'Supabase is not configured.' };
  }

  try {
    let query = client
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (statusFilter && statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching appointments:', error.message);
      return { data: [], error: error.message };
    }

    return { data: (data as DatabaseAppointment[]) || [] };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch appointments';
    return { data: [], error: message };
  }
}

/**
 * Updates an appointment's status in Supabase.
 */
export async function updateAppointmentStatus(
  id: string,
  newStatus: AppointmentStatus
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: 'Supabase is not configured.' };
  }

  try {
    const { error } = await client
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating appointment status:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update status';
    return { success: false, error: message };
  }
}
