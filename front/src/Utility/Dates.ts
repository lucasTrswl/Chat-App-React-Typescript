import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export function OrderDatesDescending<T>(list: T[], dateFunction: (item: T) => string) {
    return list.sort((a, b) => Date.parse(dateFunction(b)) - Date.parse(dateFunction(a)))
}

export function OrderDatesAscending<T>(list: T[], dateFunction: (item: T) => string) {
    return list.sort((a, b) => Date.parse(dateFunction(a)) - Date.parse(dateFunction(b)))
}

export function RelativeTimeString(date: string) {
    const parsed = Date.parse(date);
    if (isNaN(parsed)) return date;
    return formatDistanceToNow(parsed, { addSuffix: true, locale: fr });
}