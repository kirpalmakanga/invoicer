import { create } from 'zustand';
import { createCustomer, getAllCustomers } from '@/lib/api';
interface CustomersState {
    customers: Customer[];
    fetchCustomers: () => void;
    addCustomer: (data: CustomerFormData) => void;
    updateCustomer: (customerId: string, data: Partial<Customer>) => void;
    removeCustomer: (customerId: string) => void;
    removeBulkCustomers: (customerIds: string[]) => void;
}

export const useCustomersStore = create<CustomersState>((set, get) => ({
    customers: [],
    async fetchCustomers() {
        const customers = await getAllCustomers();

        set(() => ({ customers }));
    },
    async addCustomer(data) {
        const customer = await createCustomer(data);

        set(({ customers }) => ({ customers: [...customers, customer] }));
    },
    updateCustomer(customerId, data) {
        const { customers } = get();
        const index = customers.findIndex(({ id }) => id === customerId);

        if (index > -1) {
            set(() => ({
                customers: customers.with(index, {
                    ...customers[index],
                    ...data,
                }),
            }));
        }
    },
    removeCustomer(customerId) {
        set(({ customers }) => ({
            customers: customers.filter(({ id }) => id !== customerId),
        }));
    },
    removeBulkCustomers(customerIds) {
        set(({ customers }) => ({
            customers: customers.filter(({ id }) => !customerIds.includes(id)),
        }));
    },
}));
