export const mockInvoices: Invoice[] = [
    {
        id: crypto.randomUUID(),
        invoiceId: 'INV2025001',
        customerId: 'C001',
        items: [
            {
                name: 'Product 1',
                amount: 5,
                pricePerUnit: 50,
                unit: 'hour',
            },
            {
                name: 'Product 2',
                amount: 3,
                pricePerUnit: 500,
                unit: 'day',
            },
            {
                name: 'Product 3',
                amount: 10,
                pricePerUnit: 50,
                unit: 'hour',
            },
        ],
        status: 'paid',
        paymentMethod: 'PayPal',
        dateCreated: Date.now(),
        dateSent: Date.now(),
    },
    {
        id: crypto.randomUUID(),
        invoiceId: 'INV2025002',
        customerId: 'C002',
        items: [
            {
                name: 'Product 4',
                amount: 5,
                pricePerUnit: 50,
                unit: 'hour',
            },
            {
                name: 'Product 5',
                amount: 7,
                pricePerUnit: 500,
                unit: 'day',
            },
            {
                name: 'Product 6',
                amount: 5,
                pricePerUnit: 50,
                unit: 'hour',
            },
        ],
        status: 'unpaid',
        paymentMethod: 'Bank transfer',
        dateCreated: Date.now(),
        dateSent: Date.now(),
    },
    {
        id: crypto.randomUUID(),
        invoiceId: 'INV2025003',
        customerId: 'C003',
        items: [
            {
                name: 'Product 7',
                amount: 1,
                pricePerUnit: 30,
                unit: 'hour',
            },
            {
                name: 'Product 8',
                amount: 3,
                pricePerUnit: 500,
                unit: 'day',
            },
            {
                name: 'Product 9',
                amount: 8,
                pricePerUnit: 60,
                unit: 'hour',
            },
        ],
        status: 'pending',
        paymentMethod: 'Credit card',
        dateCreated: Date.now(),
        dateSent: Date.now(),
    },
];
