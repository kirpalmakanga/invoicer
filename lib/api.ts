import api from './axiosInstance';

/** Auth */ export async function redirect() {
    const {
        data: { data },
    } = await api.get('/auth/redirect');

    window.location.href = data;
}

export async function register(credentials: AuthRegisterCredentials) {
    await api.post('/register', credentials);

    await redirect();
}

export async function signIn(credentials: AuthCredentials) {
    const {
        data: { data: url },
    } = await api.post('/login', credentials);

    return url as AuthTokens;
}

export async function logIn(code: string, state: string) {
    const {
        data: { data },
    } = await api.get(`/auth/token`, { params: { code, state } });

    return data as AuthTokens;
}

export async function refreshAccessToken(refreshToken: string) {
    const {
        data: { data },
    } = await api.post('/refresh', { params: { refreshToken } });

    return data as AuthTokens;
}

/** Customers */
export async function getAllCustomers() {
    const {
        data: { data },
    } = await api.get('/customers');

    return data as Customer[];
}

export async function getCustomerById(id: string) {
    const {
        data: { data },
    } = await api.get(`/customers/${id}`);

    return data as Customer;
}

export async function createCustomer(customerData: CustomerFormData) {
    const {
        data: { data },
    } = await api.post(`/customers`, customerData);

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

export async function deleteCustomers(ids: string[]) {
    await api.delete('/customers', { params: { ids: ids.join(',') } });
}

/** Invoices */
export async function getAllInvoices() {
    const {
        data: { data },
    } = await api.get('/invoices');

    return data as Invoice[];
}

export async function getInvoiceById(id: string) {
    const {
        data: { data },
    } = await api.get(`/invoices/${id}`);

    return data as Invoice;
}

export async function createInvoice(invoiceData: InvoiceFormData) {
    const {
        data: { data },
    } = await api.post(`/invoices`, invoiceData);

    return data as Invoice;
}

export async function updateInvoice(id: string, invoiceData: Partial<Invoice>) {
    await api.put(`/invoices/${id}`, invoiceData);
}

export async function deleteInvoice(id: string) {
    await api.delete(`/invoices/${id}`);
}

export async function deleteInvoices(ids: string[]) {
    await api.delete('/invoices', { params: { ids: ids.join(',') } });
}

/** Settings */
export async function getSettings() {
    const {
        data: { data },
    } = await api.get('/settings');

    return data as Settings | null;
}

export async function updateSettings(settings: Settings) {
    await api.put('/settings', settings);
}
