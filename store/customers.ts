import { create } from 'zustand';
import {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
} from '@/lib/api';
interface CustomersState {
    customers: Customer[];
    fetchCustomers: () => void;
    fetchSingleCustomer: (customerId: string) => void;
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
    async fetchSingleCustomer(customerId: string) {
        const { customers } = get();
        const index = customers.findIndex(({ id }) => id === customerId);

        const customer = await getCustomerById(customerId);

        if (index > -1) {
            set(() => ({
                customers: customers.with(index, {
                    ...customers[index],
                    ...customer,
                }),
            }));
        } else {
            set(() => ({ customers: [...customers, customer] }));
        }
    },
    async addCustomer(data) {
        const customer = await createCustomer(data);

        set(({ customers }) => ({ customers: [...customers, customer] }));
    },
    async updateCustomer(customerId, customerData) {
        const { customers } = get();
        const index = customers.findIndex(({ id }) => id === customerId);

        if (index > -1) {
            await updateCustomer(customerId, customerData);

            set(() => ({
                customers: customers.with(index, {
                    ...customers[index],
                    ...customerData,
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
