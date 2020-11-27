import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../../../ui/datatable';
import Delete from './actions/delete';
import Add from './actions/add';

const Countries: React.FC = (): JSX.Element => {
    const [countries, setCountries] = useState<ICountryModel[]>([]);
    const [forDeletion, setForDeletion] = useState<number>(-1);
    const [deleted, setDeleted] = useState<number>(-1);
    const [createDisplay, setCreateDisplay] = useState(false);

    useEffect(() => {
        axios
            .get('countries/full')
            .then((response) => {
                setCountries(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, [deleted]);

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

    const actions: IOption[] = [
        {
            display: 'Edit',
            action: (rowId: number) => {
                console.log(`clicked edit on ${rowId}`);
            },
        },
        {
            display: 'Delete',
            action: (rowId: number) => {
                setForDeletion(rowId);
            },
        },
    ];

    return (
        <div>
            <div className="bg-white shadow">
                <div className="px-4 sm:px-6 lg:mx-auto lg:px-8">
                    <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between lg:border-t lg:border-gray-200">
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-700 sm:leading-9 sm:truncate">
                            Countries
                        </h1>
                        <button
                            type="button"
                            className="mt-4 md:mt-0 text-center inline-flex items-center pl-2 pr-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => setCreateDisplay(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6 mr-2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8v8M8 12h8" />
                            </svg>
                            <span> Create</span>
                        </button>
                    </div>
                </div>
            </div>
            <Add visible={createDisplay} setVisible={setCreateDisplay} />
            <Delete forDeletion={forDeletion} setForDeletion={setForDeletion} setDeleted={setDeleted} />
            <div className="p-4">
                <DataTable<ICountryModel> items={countries} columns={columns} actions={actions} />
            </div>
        </div>
    );
};

export default Countries;
