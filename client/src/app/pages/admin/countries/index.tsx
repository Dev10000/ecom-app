import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../../../ui/datatable';

const Countries: React.FC = (): JSX.Element => {
    const [countries, setCountries] = useState<ICountryModel[]>([]);

    useEffect(() => {
        axios
            .get('countries/full')
            .then((response) => {
                setCountries(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    const columns: IColumn<ICountryModel>[] = [
        {
            display: 'Name',
            db: 'name',
        },
        {
            display: 'Alpha 2',
            db: 'alpha2',
        },
        {
            display: 'Alpha 3',
            db: 'alpha3',
        },
        {
            display: 'Code',
            db: 'code',
        },
        {
            display: 'ISO 3166 2',
            db: 'iso_3166_2',
        },
        {
            display: 'Region',
            db: 'region',
        },
        {
            display: 'Sub Region',
            db: 'sub_region',
        },
        {
            display: 'Intermediate Region',
            db: 'intermediate_region',
        },
        {
            display: 'Region Code',
            db: 'region_code',
        },
        {
            display: 'Sub Region Code',
            db: 'sub_region_code',
        },
        {
            display: 'Intermediate Region Code',
            db: 'intermediate_region_code',
        },
        {
            display: 'Created',
            db: 'created_at',
            type: 'datetime',
        },
    ];

    return (
        <div>
            <div className="bg-white shadow">
                <div className="px-4 sm:px-6 lg:mx-auto lg:px-8">
                    <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-700 sm:leading-9 sm:truncate">
                            Countries
                        </h1>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <DataTable<ICountryModel> items={countries} columns={columns} />
            </div>
        </div>
    );
};

export default Countries;
