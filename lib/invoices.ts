import { getMonthName, getTimestamp, getYear } from './dates';

export function getInvoiceItemTotal({ quantity, pricePerUnit }: InvoiceItem) {
    return quantity * pricePerUnit;
}

export function getInvoiceTotal({ items }: Invoice) {
    return items.reduce((total, item) => total + getInvoiceItemTotal(item), 0);
}

export function getInvoicesChartData(invoices: Invoice[]) {
    return invoices
        .toSorted(
            ({ datePaid: a }, { datePaid: b }) =>
                getTimestamp(a) - getTimestamp(b)
        )
        .reduce((charts, invoice) => {
            const { status, datePaid } = invoice;

            if (status !== 'paid') {
                return charts;
            }

            const year = getYear(datePaid);
            const month = getMonthName(datePaid);

            if (!charts.get(year)) {
                charts.set(year, new Map());
            }

            charts
                .get(year)
                ?.set(
                    month,
                    (charts.get(year)?.get(month) || 0) +
                        getInvoiceTotal(invoice)
                );

            return charts;
        }, new Map() as Map<number, Map<ReturnType<typeof getMonthName>, number>>);
}
