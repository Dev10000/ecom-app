import { useState } from 'react';

interface ILoginFormState {
    email: string;
    password: string;
    error: string[] | string | null;
    loading: boolean;
    loggedIn: boolean; // this should be in the AuthContext
}

const initialState: ILoginFormState = {
    email: '',
    password: '',
    error: null,
    loading: false,
    loggedIn: false,
};

export default function useLogin() {
    const [values, setValues] = useState(initialState);

    const setEmail = (email: string) => {
        setValues((prev) => ({ ...prev, email }));
    };

    const setPassword = (password: string) => {
        setValues((prev) => ({ ...prev, password }));
    };

    const startLoading = () => {
        setValues((prev) => ({ ...prev, loading: true }));
    };

    const handleLoginSuccess = () => {
        setValues({
            ...initialState,
            loggedIn: true,
            loading: false,
        });
    };

    const handleLoginFail = async () => {
        setValues((prev) => ({
            ...prev,
            loggedIn: false,
            loading: false,
            error: 'Invalid email or password',
        }));
    };

    const login = async () => {
        try {
            startLoading();
            // await login...here(values); handleLoginSuccess();
            handleLoginSuccess();
        } catch {
            handleLoginFail();
        }
    };

    const logout = () => {
        setValues(initialState);
    };

    return { values, setEmail, setPassword, login, logout };
}
