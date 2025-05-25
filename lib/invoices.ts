import { getMonth, getYear } from './dates';
import { sum } from './utils';

export const paymentMethodsById: Record<PaymentMethod, string> = {
    bankTransfer: 'Bank Transfer',
    creditCard: 'Credit Card',
    payPal: 'PayPal',
};

export function getInvoiceItemTotal({ quantity, pricePerUnit }: InvoiceItem) {
    return quantity * pricePerUnit;
}

export function getInvoiceTotal({ items }: Invoice) {
    return sum(...items.map(getInvoiceItemTotal));
}

function getDefaultYearChartData() {
    return Array.from({ length: 12 }).map(() => 0);
}

export function getRevenueStatistics(invoices: Invoice[]) {
    const result: Map<number, number[]> = new Map();

    for (const invoice of invoices) {
        const { status, datePaid } = invoice;

        if (status !== 'paid' || !datePaid) {
            continue;
        }

        const year = getYear(datePaid);
        const month = getMonth(datePaid);

        if (!result.has(year)) {
            result.set(year, getDefaultYearChartData());
        }

        const revenueByMonth = result.get(year);

        if (revenueByMonth) {
            revenueByMonth[month] += getInvoiceTotal(invoice);
        }
    }

    return result;
}
