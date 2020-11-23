import { isArray } from 'util';

export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'EUR' });
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
