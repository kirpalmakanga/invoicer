import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;

    if (a == null || b == null) return a === b;

    if (typeof a !== typeof b) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((item, index) => isEqual(item, b[index]));
    }

    if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a) as (keyof typeof a)[];
        const keysB = Object.keys(b) as (keyof typeof b)[];

        if (keysA.length !== keysB.length) return false;
        return keysA.every((key) => key in b && isEqual(a[key], b[key]));
    }

    return false;
}

export function omit<T extends object, K extends keyof T>(
    base: T,
    ...keys: K[]
): Omit<T, K> {
    if (keys.length) {
        const result = { ...base };

        for (const key of keys) delete result[key];

        return result;
    }

    return base;
}

export function getCurrentYear() {
    return new Date().getFullYear();
}

enum SortByOrder {
    ASC = 1,
    DESC = -1,
}
export function sortByKey<T, K extends keyof T>(
    items: T[],
    key: K,
    order: SortByOrder = SortByOrder.ASC
) {
    return items.toSorted(({ [key]: a }, { [key]: b }) => {
        return order * String(a).localeCompare(String(b));
    });
}
