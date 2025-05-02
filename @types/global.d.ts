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
    status: 'pending' | 'unpaid' | 'paid';
    paymentMethod: 'bankTransfer' | 'creditCard' | 'paypal';
    dateCreated: string;
}
