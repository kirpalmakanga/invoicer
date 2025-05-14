import { createCustomer } from '@/lib/api';
import { create } from 'zustand';
// import { mockCustomers } from '@/mocks';

interface CustomersState {
    customers: Customer[];
    addCustomer: (data: CustomerFormData) => void;
    updateCustomer: (customerId: string, data: Partial<Customer>) => void;
    removeCustomer: (customerId: string) => void;
    removeBulkCustomers: (customerIds: string[]) => void;
}

export const useCustomersStore = create<CustomersState>((set, get) => ({
    customers: [],
    // customers: mockCustomers,
    async addCustomer(data) {
        const customer = await createCustomer(data);

        console.log(JSON.stringify(customer, null, 2));

        return;

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
