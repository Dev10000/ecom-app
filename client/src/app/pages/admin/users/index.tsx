import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../../../ui/datatable';

const Users: React.FC = (): JSX.Element => {
    const [users, setUsers] = useState<IUserModel[]>([]);

    useEffect(() => {
        axios
            .get('users')
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    const buildRow = (row: IUserModel) => {
        return (
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.first_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.last_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.postal_code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.city}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.country_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.phone_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.created_at}</td>
            </tr>
        );
    };

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
                <DataTable
                    items={users}
                    buildHead={() => {
                        return (
                            <tr>
                                <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    First Name
                                </th>
                                <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Name
                                </th>
                                <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    E-mail
                                </th>
                                <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Address
                                </th>
                                <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Postal Code
                                </th>
                                <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    City
                                </th>
                                <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Country
                                </th>
                                <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone Number
                                </th>
                                <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                            </tr>
                        );
                    }}
                    buildRow={buildRow}
                />
            </div>
        </div>
    );
};

export default Users;
