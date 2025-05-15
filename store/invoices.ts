import { create } from 'zustand';
import {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
} from '@/lib/api';

interface InvoicesState {
    invoices: Invoice[];
    fetchInvoices: () => void;
    fetchSingleInvoice: (invoiceId: string) => void;
    addInvoice: (invoicedata: InvoiceFormData) => void;
    updateInvoice: (invoiceId: string, invoiceData: Partial<Invoice>) => void;
    removeInvoice: (invoiceId: string) => void;
    removeBulkInvoices: (invoiceIds: string[]) => void;
}

export const useInvoicesStore = create<InvoicesState>((set, get) => ({
    invoices: [],
    async fetchInvoices() {
        const invoices = await getAllInvoices();

        set(() => ({ invoices }));
    },
    async fetchSingleInvoice(invoiceId: string) {
        const { invoices } = get();
        const index = invoices.findIndex(({ id }) => id === invoiceId);

        const invoice = await getInvoiceById(invoiceId);

        if (index > -1) {
            set(() => ({
                invoices: invoices.with(index, {
                    ...invoices[index],
                    ...invoice,
                }),
            }));
        } else {
            set(() => ({ invoices: [...invoices, invoice] }));
        }
    },
    async addInvoice(invoiceData: InvoiceFormData) {
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
    removeInvoice(invoiceId) {
        set(({ invoices }) => ({
            invoices: invoices.filter(({ id }) => id !== invoiceId),
        }));
    },
    removeBulkInvoices(invoiceIds) {
        set(({ invoices }) => ({
            invoices: invoices.filter(({ id }) => !invoiceIds.includes(id)),
        }));
    },
}));
