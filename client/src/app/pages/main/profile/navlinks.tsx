/* eslint-disable no-console */
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

interface INavlinksProps {
    flag: string;
    setFlag: React.Dispatch<React.SetStateAction<string>>;
    user: IUser;
}
const Navlinks: React.FC<INavlinksProps> = (props) => {
    const { setFlag, user } = props;
    const [profileColorClick, setProfileColorClick] = useState<string>('white');
    const [editProfileColorClick, setEditProfileColorClick] = useState<string>('white');
    const [orderColorClick, setOrderColorClick] = useState<string>('white');
    const [display, setDisplay] = useState<boolean>(false);
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const savePassword = () => {
        console.log(user.password);
        if (password1 === password2) {
            axios.patch(`/users/${user.id}`, { password: password1 });
        }
    };

    const history = useHistory();
    const redirect = (path: string) => {
        if (path === 'profile') {
            setProfileColorClick('gray-200');
        }
        if (path === 'edit-profile') {
            setEditProfileColorClick('gray-200');
        }
        if (path === 'orders') {
            setOrderColorClick('gray-200');
        }
        setFlag(path);
        history.push({ pathname: `/${path}` });
    };

    return (
        <div>
            <div className="flex flex-row sm:flex-col w-full justify-center sm:justify-start sm:space-y-2">
                <button
                    type="button"
                    onClick={() => redirect('profile')}
                    className={`flex flex-row text-gray-700 bg-${profileColorClick} hover:bg-blue-400 w-1/4 sm:w-full hover:text-white px-2 py-4 border shadow rounded-md space-x-2`}
                >
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    <div>Profile</div>
                </button>
                <button
                    type="button"
                    onClick={() => redirect('edit-profile')}
                    className={`flex flex-row text-gray-700 bg-${editProfileColorClick} hover:bg-blue-400 w-1/4 sm:w-full hover:text-white px-2 py-4 border shadow rounded-md space-x-2`}
                >
                    <svg
                        className="w-5 h-5 hover:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                    <div>Edit Profile</div>
                </button>
                <button
                    type="button"
                    onClick={() => redirect('orders')}
                    className={`flex flex-row text-gray-700 bg-${orderColorClick} w-1/4 sm:w-full hover:bg-blue-400 hover:text-white px-2 py-4 border shadow rounded-md space-x-2`}
                >
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    <div>Orders</div>
                </button>
                <button
                    type="button"
                    onClick={() => setDisplay(true)}
                    className={`flex flex-row text-gray-700 bg-${orderColorClick} w-1/4 sm:w-full hover:bg-blue-400 hover:text-white px-2 py-4 border shadow rounded-md space-x-2`}
                >
                    <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    <div>Change password</div>
                </button>
            </div>
            {display ? (
                <div className="bg-gray-100 border rounded shadow mt-10">
                    <div className="flex flex-col p-8">
                        <label htmlFor="password">
                            <input
                                className="w-full p-4 border rounded shadow border-gray-200"
                                onChange={(e) => setPassword1(e.target.value)}
                                type="text"
                                id="password"
                                name="password"
                                placeholder="Enter new password"
                            />
                        </label>
                        <label htmlFor="retypepassword">
                            <input
                                className="mt-4 w-full p-4 border rounded shadow border-gray-200"
                                onChange={(e) => setPassword2(e.target.value)}
                                type="text"
                                id="retypepassword"
                                name="retypepassword"
                                placeholder="Enter new password again"
                            />
                        </label>
                        <div className="mt-10 flex flex-row justify-between">
                            <button
                                type="button"
                                onClick={savePassword}
                                className="w-1/3 bg-blue-400 hover:bg-blue-500 items-center py-2 px-4 rounded shadow border border-gray-200 text-white hover:shadow-lg select-none transition ease-in-out duration-150"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setDisplay(false)}
                                type="button"
                                className="w-1/3 bg-red-400 hover:bg-red-500 items-center py-2 px-4 rounded shadow border border-gray-200 text-white hover:shadow-lg select-none transition ease-in-out duration-150"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Navlinks;
