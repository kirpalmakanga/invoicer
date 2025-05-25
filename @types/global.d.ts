interface AuthCredentials {
    email: string;
    password: string;
}

interface AuthRegisterCredentials extends AuthCredentials {
    name: string;
    confirmPassword: string;
}

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

interface Settings {
    name: string;
    address: string;
    email: string;
    companyId: string;
    invoicePrefix: string;
}

interface Customer {
    id: string;
    name: string;
    address: string;
    tel: string;
    email: string;
}

type CustomerFormData = Omit<Customer, 'id'>;

type InvoiceItemUnit = 'hour' | 'day' | 'week';

interface InvoiceItem {
    description: string;
    quantity: number;
    pricePerUnit: number;
    unit: InvoiceItemUnit;
}

type InvoiceStatus = 'pending' | 'unpaid' | 'paid';
type PaymentMethod = 'bankTransfer' | 'creditCard' | 'payPal';

interface Invoice {
    id: string;
    customerId: string;
    reference: string;
    paymentMethod: PaymentMethod;
    status: InvoiceStatus;
    items: InvoiceItem[];
    dateCreated: string;
    datePaid: string | null;
}

type InvoiceFormData = Omit<Invoice, 'id'>;
