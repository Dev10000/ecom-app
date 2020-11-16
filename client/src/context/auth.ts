/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
    login: async () => {},
};

const AuthContext = createContext<IUseAuth>(initialState);

export default AuthContext;
