import { createContext } from 'react';
import { initialState } from '../hooks/useAuth';

const AuthContext = createContext<ILoginFormState>(initialState);

export default AuthContext;
