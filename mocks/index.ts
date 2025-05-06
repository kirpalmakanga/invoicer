function padNumber(n: number) {
    return n.toString().padStart(4, '0');
}

export const mockCustomers: Customer[] = [...Array(50).keys()]
    .map((i) => i + 1)
    .map((i) => ({
        id: crypto.randomUUID(),
        name: `Company ${i}`,
        address: `${i} rue du pont, 87000, Limoges`,
        tel: `+${i} 6 62 99 44 44`,
        email: `customer${i}@email.com`,
    }));

export const mockInvoices: Invoice[] = [...Array(50).keys()]
    .map((i) => i + 1)
    .map((i) => ({
        id: crypto.randomUUID(),
        reference: `INV2025${padNumber(i)}`,
        customerId: mockCustomers[i - 1].id as string,
        items: [
            {
                description: 'Product 1',
                quantity: 5,
                pricePerUnit: 50,
                unit: 'hour',
            },
            {
                description: 'Product 2',
                quantity: 3,
                pricePerUnit: 500,
                unit: 'day',
            },
            {
                description: 'Product 3',
                quantity: 10,
                pricePerUnit: 50,
                unit: 'hour',
            },
        ],
        status: 'paid',
        paymentMethod: 'PayPal',
        dateCreated: Date.now(),
    }));
