/* eslint-disable no-console */
import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const storeOrInitialValue = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(new Error(`Cannot READ from localStorage item with key "${key}":`), error.message);
            return initialValue;
        }
    };

    const [value, setValue] = useState(storeOrInitialValue);

    const setStoreValue = (newValue: T) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(newValue));
            setValue(storeOrInitialValue);
        } catch (error) {
            console.log(new Error(`Cannot WRITE to localStorage item with key "${key}":`), error.message);
        }
    };

    return { value, setStoreValue };
}
