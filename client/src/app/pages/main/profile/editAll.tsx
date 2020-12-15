import React, { useState } from 'react';
import axios from 'axios';
import allCountries from './countries.json';

interface IUserProps {
    user: IUser;
}

const EditAll: React.FC<IUserProps> = (props): JSX.Element => {
    const { user } = props;
    const [firstName, setFirstName] = useState<string | undefined>(user.first_name);
    const [lastName, setLastName] = useState<string | undefined>(user.last_name);
    const [email, setEmail] = useState<string | undefined>(user.email);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(user.phone_number);
    const [address, setAddress] = useState<string | undefined>(user.address);
    const [city, setCity] = useState<string | undefined>(user.city);
    const [country, setCountry] = useState<number | undefined>(user.country_id);
    const [postalCode, setPostalCode] = useState<string | undefined>(user.postal_code);

    const selectCountry = (value: string) => {
        const id = allCountries.find((item) => item.name === value)?.id;

        setCountry(id);
    };

    const editAll = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.patch(`users/${user.id}`, {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phoneNumber,
            address,
            city,
            country_id: country,
            postal_code: postalCode,
        });
    };
    return (
        <div>
            <form onSubmit={editAll} className="flex flex-col w-full items-center px-4 bg-gray-100">
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
                        <select value={country} onChange={(e) => selectCountry(e.target.value)}>
                            <option selected disabled>
                                Select a country
                            </option>
                            {allCountries.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
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
