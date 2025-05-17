import { create } from 'zustand';
import {
    createInvoice,
    deleteInvoice,
    deleteInvoices,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
} from '@/lib/api';

interface InvoicesStoreState {
    invoices: Invoice[];
}

interface InvoicesStoreActions {
    fetchInvoices: () => void;
    fetchSingleInvoice: (invoiceId: string) => void;
    addInvoice: (invoicedata: InvoiceFormData) => void;
    updateInvoice: (invoiceId: string, invoiceData: Partial<Invoice>) => void;
    removeInvoice: (invoiceId: string) => void;
    removeBulkInvoices: (invoiceIds: string[]) => void;
}

export const useInvoicesStore = create<
    InvoicesStoreState & InvoicesStoreActions
>((set, get) => ({
    invoices: [],
    async fetchInvoices() {
        const invoices = await getAllInvoices();

        set(() => ({ invoices }));
    },
    async fetchSingleInvoice(invoiceId) {
        const invoice = await getInvoiceById(invoiceId);

        set(({ invoices }) => {
            const index = invoices.findIndex(({ id }) => id === invoiceId);

            if (index > -1) {
                return {
                    invoices: invoices.with(index, {
                        ...invoices[index],
                        ...invoice,
                    }),
                };
            } else {
                return { invoices: [...invoices, invoice] };
            }
        });
    },
    async addInvoice(invoiceData) {
        const invoice = await createInvoice(invoiceData);

        set(({ invoices }) => ({ invoices: [...invoices, invoice] }));
    },
    async updateInvoice(invoiceId, invoiceData) {
        const { invoices } = get();
        const index = invoices.findIndex(({ id }) => id === invoiceId);

        if (index > -1) {
            await updateInvoice(invoiceId, invoiceData);

            set(() => ({
                invoices: invoices.with(index, {
                    ...invoices[index],
                    ...invoiceData,
                }),
            }));
        }
    },
    async removeInvoice(invoiceId) {
        await deleteInvoice(invoiceId);

        set(({ invoices }) => ({
            invoices: invoices.filter(({ id }) => id !== invoiceId),
        }));
    },
    async removeBulkInvoices(invoiceIds) {
        await deleteInvoices(invoiceIds);

        set(({ invoices }) => ({
            invoices: invoices.filter(({ id }) => !invoiceIds.includes(id)),
        }));
    },
}));
