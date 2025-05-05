import { create } from 'zustand';
import { mockCustomers } from '@/mocks';

interface CustomersState {
    customers: Customer[];
    getSingleCustomer: (customerId: string) => void;
    addCustomer: (customer: Customer) => void;
    updateCustomer: (customer: Partial<Customer>) => void;
    removeCustomer: (customerId: string) => void;
    removeBulkCustomers: (customerIds: string[]) => void;
}

export const useCustomersStore = create<CustomersState>((set, get) => ({
    // customers: [],
    customers: mockCustomers,
    getSingleCustomer(customerId) {},
    addCustomer(customer) {
        set(({ customers }) => ({ customers: [...customers, customer] }));
    },
    updateCustomer(customer) {
        const { customers } = get();
        const index = customers.findIndex(({ id }) => id === customer.id);

        if (index > -1) {
            set(() => ({
                customers: customers.with(index, {
                    ...customers[index],
                    ...customer,
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
