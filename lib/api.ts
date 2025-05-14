import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

/** Customers */
export async function getAllCustomers() {
    const { data } = await api.get('/customers');

    return data as Customer[];
}

export async function getCustomerById(id: string) {
    const { data } = await api.get(`/customers/${id}`);

    return data as Customer;
}

export async function createCustomer(customerData: CustomerFormData) {
    const { data } = await api.post(`/customers`, customerData);

    return data as Customer;
}

export async function updateCustomer(
    id: string,
    customerData: Partial<Customer>
) {
    await api.put(`/customers/${id}`, customerData);
}

export async function deleteCustomer(id: string) {
    await api.delete(`/customers/${id}`);
}

/** Invoices */
export async function getAllInvoices() {
    const { data } = await api.get('/invoices');

    return data as Invoice[];
}

export async function getInvoiceById(id: string) {
    const { data } = await api.get(`/invoices/${id}`);

    return data as Invoice;
}

export async function createInvoice(invoiceData: InvoiceFormData) {
    const { data } = await api.post(`/invoices`, invoiceData);

    return data as Invoice;
}

export async function updateInvoice(id: string, invoiceData: Partial<Invoice>) {
    await api.put(`/invoices/${id}`, invoiceData);
}

export async function deleteInvoice(id: string) {
    await api.delete(`/invoices/${id}`);
}
