import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const getStoredToken = (): string | null => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return null;
    return JSON.parse(storedToken);
};

const useAuth = (): IUseAuth => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(getStoredToken());
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const logTokenIn = (authToken: string): void => {
        // decode the token
        const { id } = jwt.decode(authToken, { json: true }) as { id: string };

        // get the authenticated user
        setIsLoggedIn(true); // setting this earlier will prevent the flickering...
        axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
        axios.get(`users/${id}`).then((res) => {
            setUser(res.data.data as IUser);
        });
    };

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (token) return logTokenIn(token);

        setIsLoggedIn(false);
        setUser(null);
    }, [token]);

    const login = async (email: string, password: string) => {
        await axios
            .post('login', { email, password })
            .then((response) => {
                if (response.data.status === 'success') {
                    const authToken = response.data.data.token;
                    setToken(authToken);
                    localStorage.setItem('token', JSON.stringify(authToken));
                    logTokenIn(authToken);
                }
            })
            .catch((err) => {
                return err;
            });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return { isLoggedIn, user, token, login, logout };
};

export default useAuth;
