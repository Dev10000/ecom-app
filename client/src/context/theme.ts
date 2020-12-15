/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const initialState: IUseTheme = {
    theme: 'light',
    toggleTheme: () => undefined,
};

const ThemeContext = createContext(initialState);

export default ThemeContext;
