import { create } from 'zustand';
import { mockSettings } from '@/mocks';

interface SettingsState {
    name: string;
    address: string;
    email: string;
    companyId: string;
    invoicePrefix: string;
    updateSettings: (data: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    // name: '',
    // address: '',
    // email: '',
    // companyId: '',
    // invoicePrefix: '',
    ...mockSettings,
    updateSettings(data: Partial<SettingsState>) {
        set(() => data);
    },
}));
