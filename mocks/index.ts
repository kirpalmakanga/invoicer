export const mockInvoices: Invoice[] = [...Array(50).keys()]
    .map((i) => i + 1)
    .map((i) => ({
        id: `INV202500${i}`,
        customerId: `C00${i}`,
        items: [
            {
                description: 'Product 1',
                amount: 5,
                pricePerUnit: 50,
                unit: 'hour',
            },
            {
                description: 'Product 2',
                amount: 3,
                pricePerUnit: 500,
                unit: 'day',
            },
            {
                description: 'Product 3',
                amount: 10,
                pricePerUnit: 50,
                unit: 'hour',
            },
        ],
        status: 'paid',
        paymentMethod: 'PayPal',
        dateCreated: Date.now(),
    }));

export const mockCustomers: Customer[] = [...Array(50).keys()]
    .map((i) => i + 1)
    .map((i) => ({
        id: `C00${i}`,
        name: `Company ${i}`,
        address: `${i} rue du pont, 87000, Limoges`,
        tel: `+${i} 6 62 99 44 44`,
        email: `customer${i}@email.com`,
    }));
