/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const initialState: ILoginFormState = {
    email: '',
    password: '',
    error: null,
    loading: false,
    loggedIn: false,
    token: null,
    user: null,
    // setEmail: () => {},
    // setPassword: () => {},
    // login: async () => {},
    // logout: () => {},
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useAuth() {
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
            error: 'Invalid email or password', // get the server error(s) here
        }));
    };

    const login = async () => {
        try {
            startLoading();

            axios
                .post('login', { email: values.email, password: values.password })
                .then((response) => {
                    if (response.data.status === 'success') {
                        const { token } = response.data.data;
                        const { id } = jwt.decode(token, { json: true }) as { id: string };

                        localStorage.setItem('token', JSON.stringify(token));

                        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                        axios.get(`users/${id}`).then((res) => {
                            const user = res.data.data as IUser;

                            setValues({
                                email: '',
                                password: '',
                                error: null,
                                loading: false,
                                loggedIn: true,
                                token,
                                user,
                            });
                        });
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
