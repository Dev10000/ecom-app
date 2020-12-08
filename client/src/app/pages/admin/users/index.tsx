import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../../../ui/datatable';

const Users: React.FC = (): JSX.Element => {
    const [users, setUsers] = useState<IUserModel[]>([]);

    useEffect(() => {
        axios
            .get('users?page=1&items=2500')
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    const columns: IColumn<IUserModel>[] = [
        {
            display: 'First Name',
            db: 'first_name',
        },
        {
            display: 'Last Name',
            db: 'last_name',
        },
        {
            display: 'E-mail',
            db: 'email',
        },
        {
            display: 'Address',
            db: 'address',
        },
        {
            display: 'Postal Code',
            db: 'postal_code',
        },
        {
            display: 'City',
            db: 'city',
        },
        {
            display: 'Country',
            db: 'country_id',
            type: 'country',
        },
        {
            display: 'Phone Number',
            db: 'phone_number',
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
                            Users
                        </h1>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <DataTable<IUserModel> items={users} columns={columns} />
            </div>
        </div>
    );
};

export default Users;
