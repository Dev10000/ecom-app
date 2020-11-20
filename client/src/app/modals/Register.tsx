import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth';
import { fieldError } from '../../utils';

const Register: React.FC = (): JSX.Element => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState<IFormError[]>([]);

    const { login } = useContext(AuthContext);

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios
            .post('register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                passwordConfirmation,
            })
            .then((response) => {
                if (response.data.data.id) {
                    login(email, password);
                }
            })
            .catch((err) => setErrors(err.response.data.data));
    };

    return (
        <div>
            <form className="flex flex-col w-full max-w-sm items-center mx-auto mb-16" onSubmit={handleRegister}>
                <h1 className="text-gray-600 font-bold text-2xl mt-4">Create a New Account!</h1>
                <p className="my-4 text-sm text-gray-600 text-center">
                    Create a FREE account to order our products online.
                </p>
                <div className="w-full flex">
                    <label
                        htmlFor="firstname"
                        className={`block my-2 text-xs font-medium mr-4 uppercase mr-4 ${
                            fieldError('first_name', errors) ? 'text-red-500' : ''
                        }`}
                    >
                        First Name
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`border mb-2 p-4 text-xs w-full ${
                                fieldError('first_name', errors) ? 'border-red-500' : ''
                            }`}
                            value={firstName}
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Enter your first name"
                            required
                        />
                        <div className="text-red-500 normal-case font-light text-xs">
                            {fieldError('first_name', errors)}
                        </div>
                    </label>
                    <label
                        htmlFor="lastname"
                        className={`block my-2 text-xs font-medium mr-4 uppercase  ${
                            fieldError('last_name', errors) ? 'text-red-500' : ''
                        }`}
                    >
                        Last Name
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            className={`border mb-2 p-4 text-xs w-full ${
                                fieldError('last_name', errors) ? 'border-red-500' : ''
                            }`}
                            value={lastName}
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Enter your last name"
                            required
                        />
                        <div className="text-red-500 normal-case font-light text-xs">
                            {fieldError('last_name', errors)}
                        </div>
                    </label>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="email"
                        className={`block my-2 text-xs font-medium mr-4 uppercase  ${
                            fieldError('email', errors) ? 'text-red-500' : ''
                        }`}
                    >
                        Email
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border mb-2 p-4 text-xs w-full ${
                                fieldError('email', errors) ? 'border-red-500' : ''
                            }`}
                            value={email}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        <div className="text-red-500 normal-case font-light text-xs">{fieldError('email', errors)}</div>
                    </label>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="password"
                        className={`block my-2 text-xs font-medium mr-4 uppercase  ${
                            fieldError('password', errors) ? 'text-red-500' : ''
                        }`}
                    >
                        Password
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border mb-2 p-4 text-xs w-full ${
                                fieldError('password', errors) ? 'border-red-500 text-red-500' : ''
                            }`}
                            value={password}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        <div className="text-red-500 normal-case font-light text-xs">
                            {fieldError('password', errors)}
                        </div>
                    </label>
                </div>
                <div className="w-full">
                    <label
                        htmlFor="confirmpassword"
                        className={`block my-2 text-xs font-medium mr-4 uppercase ${
                            fieldError('passwordConfirmation', errors) ? 'text-red-500' : ''
                        }`}
                    >
                        Confirm Password
                        <input
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className={`border mb-2 p-4 text-xs w-full ${
                                fieldError('passwordConfirmation', errors) ? 'border-red-500 text-red-500' : ''
                            }`}
                            value={passwordConfirmation}
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            placeholder="Type your password again"
                            required
                        />
                        <div className="text-red-500 normal-case font-light text-xs">
                            {fieldError('passwordConfirmation', errors)}
                        </div>
                    </label>
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center py-2 px-4 mx-3 font-serif rounded shadow font-bold border border-gray-400 bg-blue-700 text-white hover:shadow-lg select-none transition ease-in-out duration-150"
                >
                    Sign Up
                </button>
                <button type="button" className="pt-8 text-blue-700 hover:underline cursor-pointer focus:outline-none">
                    Already have an account?
                </button>
            </form>
        </div>
    );
};
export default Register;
