import React, { useState } from 'react';

const EditAll: React.FC = (): JSX.Element => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');

    return (
        <div>
            <form className="flex flex-col w-full items-center px-4 bg-gray-100">
                <div className="w-full border rounded shadow p-2 mt-4 mx-16 bg-white">
                    <h1 className="text-gray-600 dark:text-gray-200 font-medium text-xl">Edit profile information</h1>
                </div>
                <div className="mt-8">
                    <h2 className="text-gray-600 dark:text-gray-200 font-medium text-lg mt-4">Personal Information</h2>
                </div>
                <div className="w-full flex flex-row justify-between space-x-4">
                    <label htmlFor="firstname" className="block my-2 w-1/2 text-sm font-medium">
                        First Name
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`border rounded dark:border-gray-700 mb-2 p-3 text-sm w-full dark:bg-gray-800 
                            `}
                            value={firstName}
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Enter your first name"
                        />
                    </label>
                    <label htmlFor="lastname" className={`block my-2 w-1/2 text-sm font-medium `}>
                        Last Name
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            className="border rounded dark:border-gray-700 mb-2 p-3 text-sm w-full dark:bg-gray-800"
                            value={lastName}
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Enter your last name"
                        />
                    </label>
                </div>
                <div className="w-full flex flex-row justify-between space-x-4">
                    <label htmlFor="firstname" className="block my-2 w-1/2 text-sm font-medium">
                        E-mail
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border rounded dark:border-gray-700 mb-2 p-3 text-sm w-full dark:bg-gray-800 
                            `}
                            value={email}
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                    </label>
                    <label htmlFor="lastname" className={`block my-2 w-1/2 text-sm font-medium  `}>
                        Phone number
                        <input
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="border rounded dark:border-gray-700 mb-2 p-3 text-sm w-full dark:bg-gray-800"
                            value={phoneNumber}
                            type="text"
                            id="phonenumber"
                            name="phonenumber"
                            placeholder="Enter your phone number"
                        />
                    </label>
                </div>

                <div>
                    <h2 className="text-gray-600 dark:text-gray-200 font-medium text-lg mt-4">Shipping Address</h2>
                </div>
                <div className="w-full flex">
                    <label htmlFor="firstname" className="block w-full my-2 text-sm font-medium">
                        Address
                        <input
                            onChange={(e) => setAddress(e.target.value)}
                            className={`border rounded dark:border-gray-700 mb-2 p-3 text-sm w-full dark:bg-gray-800 
                            `}
                            value={address}
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                        />
                    </label>
                </div>
                <div className="w-full flex flex-row justify-between space-x-4">
                    <label htmlFor="lastname" className={`block my-2 w-1/2 text-sm font-medium  `}>
                        Postal Code
                        <input
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="border rounded dark:border-gray-700 mb-2 p-3 text-sm w-full dark:bg-gray-800"
                            value={postalCode}
                            type="text"
                            id="postalcode"
                            name="postalcode"
                            placeholder="Enter your postal code"
                        />
                    </label>
                    <label htmlFor="firstname" className="block my-2 w-1/2 text-sm font-medium">
                        City
                        <input
                            onChange={(e) => setCity(e.target.value)}
                            className={`border rounded dark:border-gray-700 mb-2 p-3 text-sm w-full dark:bg-gray-800 
                            `}
                            value={city}
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Enter your city"
                        />
                    </label>
                </div>
                <div className="w-full flex">
                    <label htmlFor="firstname" className="block w-full my-2 text-sm font-medium">
                        Country
                        <input
                            onChange={(e) => setCountry(e.target.value)}
                            className={`border rounded dark:border-gray-700 p-3 text-sm w-full dark:bg-gray-800 
                            `}
                            value={country}
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Enter your country"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-400 hover:bg-blue-500 items-center py-2 px-4 mb-10 mt-10 font-serif rounded shadow font-bold border border-gray-200 text-white hover:shadow-lg select-none transition ease-in-out duration-150"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditAll;
