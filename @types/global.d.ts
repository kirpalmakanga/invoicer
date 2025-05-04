interface Customer {
    id: string;
    address: string;
    tel: string;
    email: string;
    companyId: string;
}

interface InvoiceItem {
    description: string;
    amount: number;
    pricePerUnit: number;
    unit: 'hour' | 'day';
}

type InvoiceStatus = 'pending' | 'unpaid' | 'paid';
type PaymentMethod = 'Bank transfer' | 'Credit card' | 'PayPal';

interface Invoice {
    id: string;
    invoiceId: string;
    customerId: string;
    items: InvoiceItem[];
    paymentMethod: PaymentMethod;
    status: InvoiceStatus;
    dateCreated: number;
    dateSent: number;
}
