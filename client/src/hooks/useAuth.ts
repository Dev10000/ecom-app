import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const useAuth = (): IUseAuth => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const login = async (email: string, password: string) => {
        await axios
            .post('login', { email, password })
            .then((response) => {
                if (response.data.status === 'success') {
                    const authToken = response.data.data.token;
                    setToken(authToken);
                    const { id } = jwt.decode(authToken, { json: true }) as { id: string };

                    localStorage.setItem('token', JSON.stringify(authToken));

                    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
                    axios.get(`users/${id}`).then((res) => {
                        setUser(res.data.data as IUser);
                        setIsLoggedIn(true);
                    });
                }
            })
            .catch((err) => {
                return err;
            });
    };

    return { isLoggedIn, user, login, token };
};

export default useAuth;
