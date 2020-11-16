/* eslint-disable no-console */
import { useState } from 'react';
import axios from 'axios';

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

            // probably this needs to go to authcontext
            axios
                .post('login', {
                    email: values.email,
                    password: values.password,
                })
                .then((response) => {
                    const res = response.data;

                    if (res.status === 'success') {
                        const { token } = res.data;
                        localStorage.setItem('token', JSON.stringify(token));
                    }
                })
                .catch((err) => {
                    return err;
                });
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
