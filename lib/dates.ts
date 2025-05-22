export const monthNamesByNumber = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
};

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
    return getDateObject(date).getMonth() + 1;
}

export function getMonthName(date: string | number | Date) {
    return monthNamesByNumber[
        getMonth(date) as keyof typeof monthNamesByNumber
    ];
}

export function getTimestamp(date: string | number | Date) {
    return getDateObject(date).getTime();
}
