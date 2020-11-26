import { isArray } from 'util';

export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'EUR' });
};

export const formatLocalDateTime = (dateTime: string): string => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const date = new Date(dateTime);

    const formatedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

    return formatedDate.replace(/\//g, '.');
};

export const fieldError = (field: string, errors: IFormError[] | string | undefined): string | undefined => {
    if (isArray(errors)) {
        const fieldErrors = errors.filter((error) => error.param === field);
        if (fieldErrors.length) return fieldErrors[0].msg;
    }

    if (typeof errors === 'string') {
        return errors;
    }

    return undefined;
};
