import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../../../ui/datatable';
import Delete from './actions/delete';
import AddOrEdit from './actions/add-or-edit';

const Countries: React.FC = (): JSX.Element => {
    const [countries, setCountries] = useState<ICountryModel[]>([]);
    const [forDeletion, setForDeletion] = useState<number>(-1);
    const [forEdit, setForEdit] = useState<number>(0);
    const [updated, setUpdated] = useState<number>(-1);
    const [addOrEditDisplay, setAddOrEditDisplay] = useState(false);
    const [APILoading, setAPILoading] = useState(false);

    const regenerateStatic = () => {
        axios
            .get('admin/export-countries')
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        setAPILoading(true);
        axios
            .get('countries')
            .then((response) => {
                setCountries(response.data.data);
                setAPILoading(false);
            })
            .catch((err) => {
                setAPILoading(false);
                return err;
            });
    }, [updated]);

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
                setForEdit(rowId);
                setAddOrEditDisplay(true);
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
                        <div>
                            <button
                                type="button"
                                className="mt-4 mr-4 md:mt-0 text-center inline-flex items-center pl-2 pr-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => setAddOrEditDisplay(true)}
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

                            <button
                                type="button"
                                className="mt-4 md:mt-0 text-center inline-flex items-center pl-2 pr-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={regenerateStatic}
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
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                                </svg>
                                <span> Generate Config</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AddOrEdit
                visible={addOrEditDisplay}
                setVisible={setAddOrEditDisplay}
                setUpdated={setUpdated}
                edit={forEdit}
                setForEdit={setForEdit}
            />
            <Delete forDeletion={forDeletion} setForDeletion={setForDeletion} setUpdated={setUpdated} />
            <div className="p-4">
                <DataTable<ICountryModel>
                    items={countries}
                    columns={columns}
                    actions={actions}
                    APILoading={APILoading}
                />
            </div>
        </div>
    );
};

export default Countries;
