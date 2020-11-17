/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useContext } from 'react';
import AuthContext from '../context/auth';

export const initialState: ILoginFormState = {
    email: '',
    password: '',
    error: null,
    loading: false,
    loggedIn: false,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useLogin() {
    const [values, setValues] = useState(initialState);
    const { login } = useContext(AuthContext);

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

    const doLogin = async () => {
        try {
            startLoading();
            await login(values.email, values.password);
            handleLoginSuccess();
        } catch {
            handleLoginFail();
        }
    };

    const doLogout = () => {
        setValues(initialState);
    };

    return { values, setEmail, setPassword, doLogin, doLogout };
}
