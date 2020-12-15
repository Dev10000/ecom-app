/* eslint-disable no-restricted-globals */
import axios from 'axios';
import React, { useState } from 'react';
import allCountries from './countries.json';

interface ICountryProps {
    user: IUser;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}
const Country: React.FC<ICountryProps> = (props) => {
    const { user, setDisplay } = props;
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const editCountry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = allCountries.find((country) => country.name === selectedCountry)?.id;
        axios.patch(`users/${user.id}`, { country_id: id });
        setDisplay(false);
    };

    const selectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };
    return (
        <form onSubmit={editCountry}>
            <div className="flex flex-row space-x-4">
                <div className="flex flex-row border rounded border-blue-400">
                    <div>
                        <select value={selectedCountry} onChange={selectCountry}>
                            <option selected disabled>
                                Select a country
                            </option>
                            {allCountries.map((country) => (
                                <option key={country.id} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="p-2 bg-blue-400 text-white hover:bg-blue-500">
                        Save
                    </button>
                </div>
                <button onClick={() => setDisplay(false)} className="text-red-400 hover:text-red-500" type="button">
                    <svg
                        className="w-4 h-4 fill-current inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default Country;
