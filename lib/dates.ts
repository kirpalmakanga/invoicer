export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

function getDateObject(date: string | number | Date) {
    return date instanceof Date ? date : new Date(date);
}

export function getYear(date: string | number | Date) {
    return getDateObject(date).getFullYear();
}

export function getCurrentYear() {
    return getYear(new Date());
}

export function getMonth(date: string | number | Date) {
    return getDateObject(date).getMonth();
}

export function getMonthName(date: string | number | Date) {
    return monthNames[getMonth(date)];
}

export function getTimestamp(date: string | number | Date) {
    return getDateObject(date).getTime();
}
