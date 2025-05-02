'use client';

import { useParams } from 'next/navigation';
import Title1 from '@/components/atoms/H1';

export default function Invoice() {
    const { invoiceId } = useParams<{ invoiceId: string }>();

    return (
        <div>
            <Title1>Invoice {invoiceId}</Title1>
        </div>
    );
}
