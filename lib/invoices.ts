import { getMonthName, getTimestamp, getYear, monthNames } from './dates';

export function getInvoiceItemTotal({ quantity, pricePerUnit }: InvoiceItem) {
    return quantity * pricePerUnit;
}

export function getInvoiceTotal({ items }: Invoice) {
    return items.reduce((total, item) => total + getInvoiceItemTotal(item), 0);
}

function getDefaultYearChartData() {
    return new Map(monthNames.map((monthName) => [monthName, 0]));
}

export function getRevenueStatistics(invoices: Invoice[]) {
    const data = invoices
        .filter(({ status }) => status === 'paid')
        .toSorted(
            ({ datePaid: a }, { datePaid: b }) =>
                getTimestamp(a) - getTimestamp(b)
        )
        .reduce((charts, invoice) => {
            const { datePaid } = invoice;

            const year = getYear(datePaid);
            const month = getMonthName(datePaid);

            if (!charts.has(year)) {
                charts.set(year, getDefaultYearChartData());
            }

            const yearData = charts.get(year);

            if (yearData) {
                yearData.set(
                    month,
                    (yearData.get(month) || 0) + getInvoiceTotal(invoice)
                );
            }

            return charts;
        }, new Map() as Map<number, Map<string, number>>);

    return data;
}
