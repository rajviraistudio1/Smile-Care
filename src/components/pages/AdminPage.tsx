import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Lock, 
  UserCheck, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  User, 
  Stethoscope,
  ChevronDown
} from 'lucide-react';
import { PageId, DatabaseAppointment, AppointmentStatus, AdminUser } from '../../types';
import { 
  signInAdmin, 
  signOutAdmin, 
  getCurrentAdminUser, 
  fetchAppointments, 
  updateAppointmentStatus, 
  isSupabaseConfigured 
} from '../../lib/supabase';
import { CLINIC_INFO } from '../../data/clinicData';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard appointments state
  const [appointments, setAppointments] = useState<DatabaseAppointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<AppointmentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected appointment for details modal
  const [selectedAppointment, setSelectedAppointment] = useState<DatabaseAppointment | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState<string | null>(null);

  // Initial check for existing admin session
  useEffect(() => {
    async function checkSession() {
      setIsCheckingAuth(true);
      if (!isSupabaseConfigured) {
        setIsCheckingAuth(false);
        return;
      }
      const { user, isAuthorizedAdmin } = await getCurrentAdminUser();
      setCurrentUser(user);
      setIsAuthorized(isAuthorizedAdmin);
      setIsCheckingAuth(false);
    }
    checkSession();
  }, []);

  // Fetch appointments whenever authorized user state is true
  const loadAppointments = useCallback(async () => {
    if (!isAuthorized) return;
    setIsLoadingAppointments(true);
    setFetchError(null);
    const { data, error } = await fetchAppointments('all');
    if (error) {
      setFetchError(error);
    } else {
      setAppointments(data);
    }
    setIsLoadingAppointments(false);
  }, [isAuthorized]);

  useEffect(() => {
    if (isAuthorized) {
      loadAppointments();
    }
  }, [isAuthorized, loadAppointments]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!email.trim() || !password) {
      setLoginError('Please enter both email address and password.');
      return;
    }

    setIsLoggingIn(true);
    const result = await signInAdmin(email, password);
    setIsLoggingIn(false);

    if (!result.success) {
      setLoginError(result.error || 'Authentication failed. Please verify credentials.');
      return;
    }

    if (result.user) {
      setCurrentUser(result.user);
      setIsAuthorized(Boolean(result.isAuthorizedAdmin));
      if (!result.isAuthorizedAdmin) {
        setLoginError('Access Denied: This account is authenticated but not authorized in the clinic_admins table.');
      }
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOutAdmin();
    setCurrentUser(null);
    setIsAuthorized(false);
    setAppointments([]);
    setSelectedAppointment(null);
    setEmail('');
    setPassword('');
  };

  // Handle Status Update
  const handleStatusChange = async (appointmentId: string, newStatus: AppointmentStatus) => {
    setIsUpdatingStatus(true);
    setStatusUpdateMessage(null);
    const result = await updateAppointmentStatus(appointmentId, newStatus);
    setIsUpdatingStatus(false);

    if (result.success) {
      // Update local state immediately for snappy UI
      setAppointments((prev) =>
        prev.map((app) => (app.id === appointmentId ? { ...app, status: newStatus } : app))
      );
      if (selectedAppointment && selectedAppointment.id === appointmentId) {
        setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      setStatusUpdateMessage(`Status updated to ${newStatus}`);
      setTimeout(() => setStatusUpdateMessage(null), 3000);
    } else {
      alert(`Failed to update status: ${result.error || 'Database error'}`);
    }
  };

  // Metrics counts
  const counts = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === 'pending').length;
    const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
    const completed = appointments.filter((a) => a.status === 'completed').length;
    const cancelled = appointments.filter((a) => a.status === 'cancelled').length;
    return { total, pending, confirmed, completed, cancelled };
  }, [appointments]);

  // Filtered and searched appointments list
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesFilter = activeFilter === 'all' || app.status === activeFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        app.full_name.toLowerCase().includes(query) ||
        app.phone.includes(query) ||
        (app.email && app.email.toLowerCase().includes(query)) ||
        app.treatment.toLowerCase().includes(query) ||
        app.reference_id.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [appointments, activeFilter, searchQuery]);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Cancelled
          </span>
        );
    }
  };

  // 1. Loading screen while checking existing auth session
  if (isCheckingAuth) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-teal-600 animate-spin" />
        <p className="text-slate-600 font-medium text-sm">Verifying clinic credentials...</p>
      </div>
    );
  }

  // 2. Unauthenticated / Login View
  if (!currentUser || !isAuthorized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-100/60">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md shadow-teal-600/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Clinic Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Secure authentication for SmileCare dental clinic staff
            </p>
          </div>

          {/* Access Denied Warning if logged in but unauthorized */}
          {currentUser && !isAuthorized && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-rose-900 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-sm">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Access Denied (Unauthorized)</span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">
                Logged in as <strong>{currentUser.email}</strong>, but this Supabase user ID is not registered in the{' '}
                <code className="bg-rose-100 px-1 py-0.5 rounded font-mono text-[11px]">clinic_admins</code> table.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium underline"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}

          {/* Configuration Notice if Supabase is missing */}
          {!isSupabaseConfigured && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Supabase Environment Variables Required
              </p>
              <p className="text-amber-800 leading-relaxed">
                Add <code className="bg-amber-100 px-1 rounded font-mono">VITE_SUPABASE_URL</code> and{' '}
                <code className="bg-amber-100 px-1 rounded font-mono">VITE_SUPABASE_ANON_KEY</code> to your{' '}
                <code className="bg-amber-100 px-1 rounded font-mono">.env</code> or Vercel settings.
              </p>
            </div>
          )}

          {/* Login Form */}
          {(!currentUser || isAuthorized) && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Staff Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@smilecare.in"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold py-3.5 rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Log In to Dashboard</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer return link */}
          <div className="pt-2 text-center border-t border-slate-100">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authorized Admin Dashboard View
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Top Admin Header Bar */}
      <section className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-display tracking-tight">
                  SmileCare Admin Dashboard
                </h1>
                <span className="bg-teal-900 text-teal-300 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border border-teal-700">
                  Authorized
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>Logged in as:</span>
                <span className="text-slate-200 font-medium">{currentUser.email}</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={loadAppointments}
              disabled={isLoadingAppointments}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              title="Refresh appointments"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-teal-400 ${isLoadingAppointments ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-rose-600/90 hover:bg-rose-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Appointments</p>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                {counts.total}
              </span>
              <span className="text-xs font-medium text-slate-500">All submissions</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-2xs space-y-1 bg-gradient-to-br from-amber-50/40 to-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Pending Action</p>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-700 font-display">
                {counts.pending}
              </span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                Needs Review
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-teal-200/80 shadow-2xs space-y-1 bg-gradient-to-br from-teal-50/40 to-white">
            <p className="text-xs font-bold text-teal-800 uppercase tracking-wider">Confirmed Appointments</p>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-teal-700 font-display">
                {counts.confirmed}
              </span>
              <span className="text-xs font-semibold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                Ready for Visit
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All', count: counts.total },
              { id: 'pending', label: 'Pending', count: counts.pending },
              { id: 'confirmed', label: 'Confirmed', count: counts.confirmed },
              { id: 'completed', label: 'Completed', count: counts.completed },
              { id: 'cancelled', label: 'Cancelled', count: counts.cancelled },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as AppointmentStatus | 'all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Error Notification */}
        {fetchError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Error loading database records</p>
              <p className="text-xs text-rose-700 mt-0.5">{fetchError}</p>
            </div>
          </div>
        )}

        {/* Appointments Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Patient Appointment Requests</span>
              <span className="text-xs font-normal text-slate-500">
                ({filteredAppointments.length} matching)
              </span>
            </h2>
          </div>

          {isLoadingAppointments ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
              <p className="text-sm font-medium text-slate-600">Loading appointments from Supabase...</p>
            </div>
          ) : filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4 sm:px-6">Patient Name</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Date & Time Slot</th>
                    <th className="py-3.5 px-4">Treatment</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-teal-50/30 transition-colors group cursor-pointer"
                      onClick={() => setSelectedAppointment(app)}
                    >
                      {/* Patient Name & Ref */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
                            {app.full_name}
                          </p>
                          <span className="inline-block font-mono text-[11px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded font-semibold">
                            {app.reference_id}
                          </span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5 font-medium text-slate-800">
                            <Phone className="w-3 h-3 text-teal-600" />
                            <span>{app.phone}</span>
                          </div>
                          {app.email && (
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="truncate max-w-[150px]">{app.email}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5 text-xs">
                          <p className="font-bold text-slate-800 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{app.preferred_date}</span>
                          </p>
                          <p className="text-slate-500 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{app.preferred_time_slot}</span>
                          </p>
                        </div>
                      </td>

                      {/* Treatment */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <p className="font-medium text-slate-800 text-xs truncate max-w-[160px]">
                            {app.treatment}
                          </p>
                          {app.dentist_preference && (
                            <p className="text-[11px] text-slate-400 truncate max-w-[160px]">
                              Pref: {app.dentist_preference}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value as AppointmentStatus)
                          }
                          className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer ${
                            app.status === 'pending'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : app.status === 'confirmed'
                              ? 'bg-teal-50 text-teal-800 border-teal-200'
                              : app.status === 'completed'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedAppointment(app)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center space-y-2 p-6">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700">No appointments found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {activeFilter !== 'all'
                  ? `There are currently no appointments with status "${activeFilter}".`
                  : 'No appointment requests have been submitted yet.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-6 p-6 sm:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded">
                    {selectedAppointment.reference_id}
                  </span>
                  {getStatusBadge(selectedAppointment.status)}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {selectedAppointment.full_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Contact Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Phone Number
                </span>
                <a
                  href={`tel:${selectedAppointment.phone}`}
                  className="text-sm font-bold text-teal-700 hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{selectedAppointment.phone}</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Email Address
                </span>
                {selectedAppointment.email ? (
                  <a
                    href={`mailto:${selectedAppointment.email}`}
                    className="text-sm font-semibold text-slate-700 hover:underline flex items-center gap-1.5 truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{selectedAppointment.email}</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 italic">Not provided</span>
                )}
              </div>
            </div>

            {/* Booking Details Grid */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Appointment Schedule & Treatment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl border border-slate-100 bg-white space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium block">Preferred Date</span>
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>{selectedAppointment.preferred_date}</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-100 bg-white space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium block">Preferred Time Slot</span>
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{selectedAppointment.preferred_time_slot}</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-100 bg-white space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium block">Requested Treatment</span>
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                    <span>{selectedAppointment.treatment}</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-100 bg-white space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium block">Dentist Preference</span>
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    <span>{selectedAppointment.dentist_preference || 'Any Available'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Patient Message / Symptoms */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Patient Message / Symptoms Notes
              </span>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed min-h-[60px]">
                {selectedAppointment.message ? (
                  selectedAppointment.message
                ) : (
                  <span className="text-slate-400 italic text-xs">No additional message provided.</span>
                )}
              </div>
            </div>

            {/* Submission metadata */}
            <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100">
              <span>Submitted: {new Date(selectedAppointment.created_at).toLocaleString()}</span>
              {statusUpdateMessage && (
                <span className="text-teal-600 font-bold animate-pulse">{statusUpdateMessage}</span>
              )}
            </div>

            {/* Quick Status Updater Action Bar */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Change Appointment Status:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['pending', 'confirmed', 'completed', 'cancelled'] as AppointmentStatus[]).map(
                  (statusOption) => {
                    const isCurrent = selectedAppointment.status === statusOption;
                    return (
                      <button
                        key={statusOption}
                        disabled={isUpdatingStatus || isCurrent}
                        onClick={() => handleStatusChange(selectedAppointment.id, statusOption)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isCurrent ? `✓ ${statusOption}` : statusOption}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
