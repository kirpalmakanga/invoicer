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

type DateFormats =
    | 'YYYY-MM-DD'
    | 'DD MMM YYYY'
    | 'MMMM DD, YYYY'
    | 'MM/DD/YYYY'
    | 'DD/MM/YYYY';

export function formatDate(date: string | number | Date, format: DateFormats) {
    const dateObject = date instanceof Date ? date : new Date(date);

    let result = '⛔️ No valid format';

    switch (format) {
        case 'YYYY-MM-DD': {
            result = dateObject
                .toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
                .split('/')
                .reverse()
                .join('-');
            break;
        }
        case 'DD MMM YYYY': {
            const formattedDate = dateObject.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
            const [m, d, y] = formattedDate.split(' ');
            result = `${d} ${m.toUpperCase()} ${y}`;
            break;
        }
        case 'MMMM DD, YYYY': {
            result = dateObject.toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });
            break;
        }
        case 'MM/DD/YYYY': {
            result = dateObject.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });
            break;
        }
        case 'DD/MM/YYYY': {
            result = dateObject.toLocaleDateString('en-GB');
            break;
        }
    }

    return result;
}
