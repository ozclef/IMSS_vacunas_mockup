import { create } from 'zustand';

interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  message: string;
}

interface Patient {
  nss: string;
  name: string;
  age: number;
  riskGroups: string[];
}

interface SessionData {
  location: string;
  vaccine: string;
  lot: string;
}

interface AppState {
  activePatient: Patient | null;
  sessionData: SessionData | null;
  alerts: Alert[];
  setActivePatient: (patient: Patient | null) => void;
  setSessionData: (data: SessionData | null) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  removeAlert: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activePatient: null,
  sessionData: null,
  alerts: [
    { id: '1', type: 'warning', message: 'Dosis pendiente: Influenza' },
  ],
  setActivePatient: (patient) => set({ activePatient: patient }),
  setSessionData: (data) => set({ sessionData: data }),
  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
  removeAlert: (id) =>
    set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
}));
