import { create } from 'zustand';
import { updateSettings } from '@/lib/api';
interface SettingsStoreActions {
    saveSettings: (data: Settings) => void;
}

export const useSettingsStore = create<Settings & SettingsStoreActions>(
    (set) => ({
        name: '',
        address: '',
        email: '',
        companyId: '',
        invoicePrefix: '',
        async saveSettings(updatedSettings: Settings) {
            await updateSettings(updatedSettings);

            set((settings) => ({ ...settings, ...updatedSettings }));
        },
    })
);
