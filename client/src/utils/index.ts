/* eslint-disable import/prefer-default-export */
export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'EUR' });
};
