import React, { useState } from 'react';

const Register: React.FC = (): JSX.Element => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error = null;

    //    let history = useHistory();

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                            onChange={(e) => setName(e.target.value)}
                            className={`border ${error ? 'border-red-500' : null} p-4 text-xs w-full`}
                            value={name}
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Enter your full name"
                            required
                        />
                    </label>
                    <label htmlFor="lastname" className="block my-4 text-xs font-bold text-gray-700 uppercase">
                        Last Name
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className={`border ${error ? 'border-red-500' : null} p-4 text-xs w-full`}
                            value={name}
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Enter your full name"
                            required
                        />
                    </label>
                </div>
                <div className="w-full">
                    <label htmlFor="email" className="block my-4 text-xs font-bold text-gray-700 uppercase">
                        Email
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border ${error ? 'border-red-500' : null} p-4 text-xs w-full`}
                            value={email}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </label>
                </div>
                <div className="w-full mb-6">
                    <label htmlFor="password" className="block my-4 text-xs font-bold text-gray-700 uppercase">
                        Password
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border ${error ? 'border-red-500' : null} p-4 text-xs w-full mb-4`}
                            value={password}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </label>
                    <label htmlFor="confirmpassword" className="block my-4 text-xs font-bold text-gray-700 uppercase">
                        Confirm Password
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border ${error ? 'border-red-500' : null} p-4 text-xs w-full mb-4`}
                            value={password}
                            type="confirmpassword"
                            id="confirmpassword"
                            name="confirmpassword"
                            placeholder="Type your password again"
                            required
                        />
                    </label>
                </div>
                {error ? <p className="text-red-500 pt-2 pb-5">{error}</p> : null}
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
