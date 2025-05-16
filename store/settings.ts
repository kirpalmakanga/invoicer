import { create } from 'zustand';
interface SettingsStoreActions {
    saveSettings: (data: Partial<Settings>) => void;
}

export const useSettingsStore = create<Settings & SettingsStoreActions>(
    (set) => ({
        name: '',
        address: '',
        email: '',
        companyId: '',
        invoicePrefix: '',
        async saveSettings(updatedSettings: Partial<Settings>) {
            console.log(JSON.stringify(updatedSettings, null, 2));
            await updateSettings(updatedSettings);

            set((settings) => ({ ...settings, ...updatedSettings }));
        },
    })
);
