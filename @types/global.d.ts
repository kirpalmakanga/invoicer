interface Customer {
    id: string;
    name: string;
    address: string;
    tel: string;
    email: string;
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
    reference: string;
    customerId: string;
    items: InvoiceItem[];
    paymentMethod: PaymentMethod;
    status: InvoiceStatus;
    dateCreated: number;
    dateSent?: number;
}
