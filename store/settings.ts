import { create } from 'zustand';
import { getSettings, updateSettings } from '@/lib/api';
interface SettingsStoreActions {
    fetchSettings: () => void;
    saveSettings: (data: Settings) => void;
}

export const useSettingsStore = create<Settings & SettingsStoreActions>(
    (set) => ({
        name: '',
        address: '',
        email: '',
        companyId: '',
        invoicePrefix: '',
        async fetchSettings() {
            const settings = await getSettings();

            if (settings) {
                set(() => settings);
            }
        },
        async saveSettings(updatedSettings: Settings) {
            await updateSettings(updatedSettings);

            set((settings) => ({ ...settings, ...updatedSettings }));
        },
    })
);
