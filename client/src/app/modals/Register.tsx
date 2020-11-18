import React, { useState, useContext } from 'react';
import axios from 'axios';
import { isArray } from 'util';
import AuthContext from '../../context/auth';

interface IFormError {
    value: string;
    msg: string;
    param: string;
    location: string;
}

const Register: React.FC = (): JSX.Element => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState<IFormError[]>([]);

    const { login } = useContext(AuthContext);

    //    let history = useHistory();

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
                    <label htmlFor="firstname" className="block my-4 text-xs font-bold text-gray-700 uppercase mr-4">
                        First Name
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`border ${
                                isArray(errors) && errors.filter((error) => error.param === 'first_name').length
                                    ? 'border-red-500 text-red-500'
                                    : null
                            } p-4 text-xs w-full`}
                            value={firstName}
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Enter your first name"
                            required
                        />
                        {isArray(errors) && errors.filter((error) => error.param === 'first_name').length ? (
                            <div className="text-red-500 normal-case font-light text-xs">
                                {isArray(errors) && errors.filter((error) => error.param === 'first_name')[0].msg}
                            </div>
                        ) : (
                            ''
                        )}
                    </label>
                    <label htmlFor="lastname" className="block my-4 text-xs font-bold text-gray-700 uppercase">
                        Last Name
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            className={`border ${
                                isArray(errors) && errors.filter((error) => error.param === 'last_name').length
                                    ? 'border-red-500 text-red-500'
                                    : null
                            } p-4 text-xs w-full`}
                            value={lastName}
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Enter your last name"
                            required
                        />
                        {isArray(errors) && errors.filter((error) => error.param === 'last_name').length ? (
                            <div className="text-red-500 normal-case font-light text-xs">
                                {isArray(errors) && errors.filter((error) => error.param === 'last_name')[0].msg}
                            </div>
                        ) : (
                            ''
                        )}
                    </label>
                </div>
                <div className="w-full">
                    <label htmlFor="email" className="block my-4 text-xs font-bold text-gray-700 uppercase">
                        Email
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border ${
                                isArray(errors) && errors.filter((error) => error.param === 'email').length
                                    ? 'border-red-500 text-red-500'
                                    : null
                            } p-4 text-xs w-full`}
                            value={email}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        {isArray(errors) && errors.filter((error) => error.param === 'email').length ? (
                            <div className="text-red-500 normal-case font-light text-xs">
                                {isArray(errors) && errors.filter((error) => error.param === 'email')[0].msg}
                            </div>
                        ) : (
                            ''
                        )}
                    </label>
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="password" className="block my-4 text-xs font-bold text-gray-700 uppercase">
                        Password
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border ${
                                isArray(errors) && errors.filter((error) => error.param === 'password').length
                                    ? 'border-red-500 text-red-500'
                                    : null
                            } p-4 text-xs w-full mb-4`}
                            value={password}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        {isArray(errors) && errors.filter((error) => error.param === 'password').length ? (
                            <div className="text-red-500 normal-case font-light text-xs">
                                {isArray(errors) && errors.filter((error) => error.param === 'password')[0].msg}
                            </div>
                        ) : (
                            ''
                        )}
                    </label>
                    <label htmlFor="confirmpassword" className="block my-4 text-xs font-bold text-gray-700 uppercase">
                        Confirm Password
                        <input
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className={`border ${
                                isArray(errors) &&
                                errors.filter((error) => error.param === 'passwordConfirmation').length
                                    ? 'border-red-500 text-red-500'
                                    : null
                            } p-4 text-xs w-full mb-4`}
                            value={passwordConfirmation}
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            placeholder="Type your password again"
                            required
                        />
                        {isArray(errors) && errors.filter((error) => error.param === 'passwordConfirmation').length ? (
                            <div className="text-red-500 normal-case font-light text-xs">
                                {isArray(errors) &&
                                    errors.filter((error) => error.param === 'passwordConfirmation')[0].msg}
                            </div>
                        ) : (
                            ''
                        )}
                    </label>
                </div>
                {/* {error ? <p className="text-red-500 pt-2 pb-5">{error}</p> : null} */}
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
