import React, { useState } from 'react';

const Login: React.FC = (): JSX.Element => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const error = null;

    //  const authContext = useContext(AuthContext);

    //   const history = useHistory();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <form className="flex flex-col w-2xl max-w-sm items-center mx-auto mb-16" onSubmit={handleLogin}>
                <h1 className="text-gray-600 font-bold text-2xl mt-4">Welcome To The E-shop!</h1>
                <p className="my-4 text-sm text-gray-600 text-center">Login to buy our products online</p>
                <div className="w-full">
                    <label
                        htmlFor="email"
                        className={`block my-4 text-xs font-bold ${
                            error ? 'text-red-500' : 'text-gray-700'
                        }  uppercase`}
                    >
                        Email
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className={`border ${error ? 'border-red-500' : null} p-4 text-xs w-full`}
                            type="text"
                            value={username}
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </label>
                </div>
                <div className="w-full mb-6">
                    <label
                        htmlFor="password"
                        className={`block my-4 text-xs font-bold ${
                            error ? 'text-red-500' : 'text-gray-700'
                        }  uppercase`}
                    >
                        Password
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border ${error ? 'border-red-500' : null} p-4 text-xs w-full mb-4`}
                            type="password"
                            value={password}
                            id="password"
                            name="password"
                            placeholder="Enter your password required"
                        />
                    </label>
                </div>
                {error ? <p className="text-red-500 pt-2 pb-5">{error}</p> : null}

                <button
                    type="submit"
                    className="inline-flex items-center py-2 px-4 mx-3 font-serif rounded shadow font-bold border border-gray-400 bg-blue-700 text-white hover:shadow-lg select-none transition ease-in-out duration-150"
                    onClick={() => handleLogin}
                >
                    Login
                </button>
                <button type="button" className="py-8 text-blue-700 hover:underline focus:outline-none">
                    Don’t have an account yet?
                </button>
            </form>
        </div>
    );
};

export default Login;
