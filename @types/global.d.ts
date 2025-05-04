interface Customer {
    id: string;
    address: string;
    tel: string;
    email: string;
    companyId: string;
}

interface InvoiceItem {
    productId: string;
    name: string;
    amount: number;
    pricePerUnit: number;
    unit: 'hour' | 'day';
}

interface Invoice {
    id: string;
    invoiceId: string;
    customerId: string;
    items: InvoiceItem[];
    paymentMethod: 'Bank transfer' | 'Credit card' | 'PayPal';
    status: 'pending' | 'unpaid' | 'paid';
    dateCreated: number;
    dateSent: number;
}
