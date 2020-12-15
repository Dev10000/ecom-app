/* eslint-disable camelcase */
import React from 'react';
import { countryIdToName } from '../../../../utils';
import Country from './country';
import Edit from './edit';

interface IProfileDataProps {
    user: IUser;
    firstNameDisplay: boolean;
    lastNameDisplay: boolean;
    addressDisplay: boolean;
    emailDisplay: boolean;
    passwordDisplay: boolean;
    phoneNumberDisplay: boolean;
    cityDisplay: boolean;
    countryDisplay: boolean;
    postalCodeDisplay: boolean;
    setFirstNameDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setLastNameDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setAddressDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setEmailDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setPasswordDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setPhoneNumberDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setCityDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setCountryDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setPostalCodeDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    editField: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveEdit: (field: string, setDisplay: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const ProfileData: React.FC<IProfileDataProps> = (props) => {
    const {
        user,
        firstNameDisplay,
        lastNameDisplay,
        addressDisplay,
        emailDisplay,
        phoneNumberDisplay,
        cityDisplay,
        countryDisplay,
        postalCodeDisplay,
        setFirstNameDisplay,
        setLastNameDisplay,
        setAddressDisplay,
        setEmailDisplay,
        setPhoneNumberDisplay,
        setCityDisplay,
        setCountryDisplay,
        setPostalCodeDisplay,
        editField,
        saveEdit,
    } = props;
    return (
        <div className="flex-grow flex flex-col space-y-10 border rounded-md shadow">
            <div className="mt-5">
                <div className="flex flex-row justify-center">
                    <div className="w-24 h-24 border-4 rounded-full border-blue-400 text-blue-400">
                        {' '}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-row justify-center text-gray-300">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-center space-x-2">
                            <div>{user?.first_name}</div>
                            <div>{user?.last_name}</div>
                        </div>
                        <div>{user?.email}</div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex justify-between border-b border-gray-200 p-2 mx-1 sm:mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full flex flex-row space-x-2">
                            <svg
                                className="w-5 h-5 text-blue-400"
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
                            <div>First Name</div>
                            <div className="text-gray-400">{user?.first_name}</div>
                        </div>
                        {firstNameDisplay ? (
                            <Edit
                                setDisplay={setFirstNameDisplay}
                                editProfile={() => saveEdit('first_name', setFirstNameDisplay)}
                                editField={editField}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="flex items-start">
                        <button className="" type="button" onClick={() => setFirstNameDisplay(true)}>
                            <svg
                                className="w-6 h-6 text-blue-400 hover:text-blue-500"
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
                            </svg>{' '}
                        </button>
                    </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 p-2 mx-1 sm:mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full flex flex-row space-x-2">
                            <svg
                                className="w-5 h-5 text-blue-400"
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
                            <div>Last name</div>
                            <div className="text-gray-400">{user?.last_name}</div>
                        </div>
                        {lastNameDisplay ? (
                            <Edit
                                setDisplay={setLastNameDisplay}
                                editProfile={() => saveEdit('last_name', setLastNameDisplay)}
                                editField={editField}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="flex items-start">
                        <button className="" type="button" onClick={() => setLastNameDisplay(true)}>
                            <svg
                                className="w-6 h-6 text-blue-400 hover:text-blue-500"
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
                            </svg>{' '}
                        </button>
                    </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 p-2 mx-1 sm:mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full flex flex-row space-x-2">
                            <svg
                                className="w-5 h-5 text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            <div>Email</div>
                            <div className="text-gray-400">{user?.email}</div>
                        </div>

                        {emailDisplay ? (
                            <Edit
                                setDisplay={setEmailDisplay}
                                editProfile={() => saveEdit('email', setEmailDisplay)}
                                editField={editField}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="flex items-start">
                        <button className="" type="button" onClick={() => setEmailDisplay(true)}>
                            {' '}
                            <svg
                                className="w-6 h-6 text-blue-400 hover:text-blue-500"
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
                            </svg>{' '}
                        </button>
                    </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 p-2 mx-1 sm:mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full flex flex-row space-x-2">
                            <svg
                                className="w-5 h-5 text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                            <div>Phone number</div>
                            <div className="text-gray-400">{user?.phone_number}</div>
                        </div>

                        {phoneNumberDisplay ? (
                            <Edit
                                setDisplay={setPhoneNumberDisplay}
                                editProfile={() => saveEdit('phone_number', setPhoneNumberDisplay)}
                                editField={editField}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <div>
                        <button className="" type="button" onClick={() => setPhoneNumberDisplay(true)}>
                            <svg
                                className="w-6 h-6 text-blue-400 hover:text-blue-500"
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
                            </svg>{' '}
                        </button>
                    </div>
                </div>

                <div className="flex justify-between border-b border-gray-200 p-2 mx-1 sm:mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full flex flex-row space-x-2">
                            <svg
                                className="w-5 h-5 text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <div>Address</div>
                            <div className="text-gray-400">{user?.address}</div>
                        </div>

                        {addressDisplay ? (
                            <Edit
                                setDisplay={setAddressDisplay}
                                editProfile={() => saveEdit('address', setAddressDisplay)}
                                editField={editField}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <div>
                        <button className="" type="button" onClick={() => setAddressDisplay(true)}>
                            <svg
                                className="w-6 h-6 text-blue-400 hover:text-blue-500"
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
                            </svg>{' '}
                        </button>
                    </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 p-2 mx-1 sm:mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full flex flex-row space-x-2">
                            <svg
                                className="w-5 h-5 text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                            </svg>
                            <div>City</div>
                            <div className="text-gray-400">{user?.city}</div>
                        </div>
                        {cityDisplay ? (
                            <Edit
                                setDisplay={setCityDisplay}
                                editProfile={() => saveEdit('city', setCityDisplay)}
                                editField={editField}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="flex items-start">
                        <button className="" type="button" onClick={() => setCityDisplay(true)}>
                            <svg
                                className="w-6 h-6 text-blue-400 hover:text-blue-500"
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
                            </svg>{' '}
                        </button>
                    </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 p-2 mx-1 sm:mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full flex flex-row space-x-2">
                            <svg
                                className="w-5 h-5 text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                            </svg>
                            <div>Country</div>
                            <div className="text-gray-400">
                                {user.country_id ? countryIdToName(user.country_id) : ''}
                            </div>
                        </div>
                        {countryDisplay ? <Country user={user} setDisplay={setCountryDisplay} /> : ''}
                    </div>
                    <div className="flex items-start">
                        <button className="" type="button" onClick={() => setCountryDisplay(true)}>
                            <svg
                                className="w-6 h-6 text-blue-400 hover:text-blue-500"
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
                        </button>
                    </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 p-2 mx-1 sm:mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full flex flex-row space-x-2">
                            <svg
                                className="w-5 h-5 text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                            </svg>
                            <div>Postal code</div>
                            <div className="text-gray-400">{user?.postal_code}</div>
                        </div>
                        {postalCodeDisplay ? (
                            <Edit
                                setDisplay={setPostalCodeDisplay}
                                editProfile={() => saveEdit('postal_code', setPostalCodeDisplay)}
                                editField={editField}
                            />
                        ) : (
                            ' '
                        )}
                    </div>
                    <div className="flex items-start">
                        <button type="button" onClick={() => setPostalCodeDisplay(true)}>
                            <svg
                                className="w-6 h-6 text-blue-400 hover:text-blue-500"
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
                            </svg>{' '}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileData;
