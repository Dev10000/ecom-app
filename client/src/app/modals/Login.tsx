import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth';
import { fieldError } from '../../utils';

const Login: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<IFormError[]>([]);

    const { login } = useContext(AuthContext);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            login(email, password);
        } catch (err) {
            console.log('catch it here');
            setErrors(err.response.data.data);
        }
    };

    return (
        <div>
            <form className="flex flex-col w-full max-w-sm items-center mx-auto mb-16" onSubmit={handleLogin}>
                <h1 className="text-gray-600 dark:text-gray-200 font-bold text-2xl mt-4">Welcome To The E-shop!</h1>
                <p className="my-4 text-sm text-gray-600 dark:text-gray-200 text-center">
                    Login to buy our products online
                </p>
                <div className="w-full">
                    <label
                        htmlFor="email"
                        className={`block my-2 text-xs font-medium mr-4 uppercase ${
                            fieldError('email', errors) ? 'text-red-500' : ''
                        }`}
                    >
                        Email
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border dark:border-gray-700 mb-2 p-4 text-xs w-full dark:bg-gray-800 ${
                                fieldError('email', errors) ? 'border-red-500' : ''
                            }`}
                            type="text"
                            value={email}
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        <div className="text-red-500 normal-case font-light text-xs">{fieldError('email', errors)}</div>
                    </label>
                </div>
                <div className="w-full mb-6">
                    <label
                        htmlFor="password"
                        className={`block my-2 text-xs font-medium mr-4 uppercase ${
                            fieldError('password', errors) ? 'text-red-500' : ''
                        }`}
                    >
                        Password
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border dark:border-gray-700 p-4 text-xs w-full mb-4 dark:bg-gray-800 ${
                                fieldError('password', errors) ? 'border-red-500' : ''
                            }`}
                            type="password"
                            value={password}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                        <div className="text-red-500 normal-case font-light text-xs">
                            {fieldError('password', errors)}
                        </div>
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-400 hover:bg-blue-500 items-center py-2 px-4 font-serif rounded shadow font-bold border border-gray-200 text-white hover:shadow-lg select-none transition ease-in-out duration-150"
                    onClick={() => handleLogin}
                >
                    Login
                </button>
                <button type="button" className="py-8 text-blue-700 dark:text-white hover:underline focus:outline-none">
                    Don’t have an account yet?
                </button>
            </form>
        </div>
    );
};

export default Login;
