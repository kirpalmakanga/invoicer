import { create } from 'zustand';
import {
    createCustomer,
    deleteCustomer,
    deleteCustomers,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
} from '@/lib/api';
interface CustomersStoreState {
    customers: Customer[];
    fetchCustomers: () => void;
    fetchSingleCustomer: (customerId: string) => void;
    addCustomer: (data: CustomerFormData) => void;
    updateCustomer: (customerId: string, data: Partial<Customer>) => void;
    removeCustomer: (customerId: string) => void;
    removeBulkCustomers: (customerIds: string[]) => void;
}

interface CustomersStoreActions {
    customers: Customer[];
    fetchCustomers: () => void;
    fetchSingleCustomer: (customerId: string) => void;
    addCustomer: (data: CustomerFormData) => void;
    updateCustomer: (customerId: string, data: Partial<Customer>) => void;
    removeCustomer: (customerId: string) => void;
    removeBulkCustomers: (customerIds: string[]) => void;
}

export const useCustomersStore = create<
    CustomersStoreState & CustomersStoreActions
>((set, get) => ({
    customers: [],
    async fetchCustomers() {
        const customers = await getAllCustomers();

        set(() => ({ customers }));
    },
    async fetchSingleCustomer(customerId) {
        const customer = await getCustomerById(customerId);

        set(({ customers }) => {
            const index = customers.findIndex(({ id }) => id === customerId);

            if (index > -1) {
                return {
                    customers: customers.with(index, {
                        ...customers[index],
                        ...customer,
                    }),
                };
            } else {
                return { customers: [...customers, customer] };
            }
        });
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
    async removeCustomer(customerId) {
        await deleteCustomer(customerId);

        set(({ customers }) => ({
            customers: customers.filter(({ id }) => id !== customerId),
        }));
    },
    async removeBulkCustomers(customerIds) {
        await deleteCustomers(customerIds);

        set(({ customers }) => ({
            customers: customers.filter(({ id }) => !customerIds.includes(id)),
        }));
    },
}));
