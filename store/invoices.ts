import { create } from 'zustand';
import { mockInvoices } from '@/mocks';

interface InvoicesState {
    invoices: Invoice[];
    getSingleInvoice: (invoiceId: string) => void;
    addInvoice: (invoice: Invoice) => void;
    updateInvoice: (invoice: Partial<Invoice>) => void;
    removeInvoice: (invoiceId: string) => void;
    removeBulkInvoices: (invoiceIds: string[]) => void;
}

export const useInvoicesStore = create<InvoicesState>((set, get) => ({
    // invoices: [],
    invoices: mockInvoices,
    getSingleInvoice(invoiceId) {},
    addInvoice(invoice) {
        set(({ invoices }) => ({ invoices: [...invoices, invoice] }));
    },
    updateInvoice(invoice) {
        const { invoices } = get();
        const index = invoices.findIndex(({ id }) => id === invoice.id);

        if (index > -1) {
            set(() => ({
                invoices: invoices.with(index, {
                    ...invoices[index],
                    ...invoice,
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
