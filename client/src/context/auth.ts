import { createContext } from 'react';

interface IAuthContext {
    user: IUser | null;
    token: string;
}

export const initialState = {
    user: null,
    token: '',
};

const AuthContext = createContext<IAuthContext>(initialState);

export default AuthContext;
