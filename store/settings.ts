import { mockSettings } from '@/mocks';
import { create } from 'zustand';

interface SettingsState {
    name: string;
    address: string;
    email: string;
    companyId: string;
    invoicePrefix: string;
    updateSettings: (data: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
    // name: '',
    // address: '',
    // email: '',
    // companyId: '',
    // invoicePrefix: 'INV',
    ...mockSettings,
    updateSettings(data: Partial<SettingsState>) {
        set(() => data);
    },
}));
