'use client';

import { useEffect } from 'react';
import { useCustomersStore } from '@/store/customers';

export default function Customers() {
    const customers = useCustomersStore(({ customers }) => customers);
    const fetchCustomers = useCustomersStore(
        ({ fetchCustomers }) => fetchCustomers
    );

    useEffect(() => {
        fetchCustomers();
    }, []);

    return <pre>{JSON.stringify(customers, null, 2)}</pre>;
}
