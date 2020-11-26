import React, { useState, useEffect } from 'react';
import { formatLocalDateTime } from '../../utils';

function DataTable<T>(props: IDataTableProps<T>): JSX.Element {
    const { items, columns } = props;
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        const regex = new RegExp(search.replace(' ', '*.+'), 'i');

        // This might not be the fastest filter
        // TODO: Find a better way
        setFilteredItems(
            items.filter((item) =>
                columns.some((column) => {
                    const dbValue = item[column.db];
                    if (!dbValue) return false;
                    return regex.test(`${dbValue}`);
                }),
            ),
        );
    }, [search, items, columns]);

    return (
        <>
            <div className="max-w-md sm:px-6 lg:px-8 mb-4">
                <input
                    type="text"
                    name="tableSearch"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-full p-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search the table"
                />
            </div>
            <div className="w-full overflow-x-auto overflow-y-auto max-h-96">
                <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200" cellSpacing={0} cellPadding={0}>
                            <thead>
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={column.display}
                                            className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {column.display}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 bg-blue-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        &nbsp;
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items.length ? (
                                    filteredItems.map((row) => {
                                        return (
                                            <tr key={row.id}>
                                                {columns.map((column) => (
                                                    <td
                                                        key={column.db.toString()}
                                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                    >
                                                        {column.type && column.type === 'datetime'
                                                            ? formatLocalDateTime(String(row[column.db]))
                                                            : row[column.db]}
                                                    </td>
                                                ))}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="p-2 rounded-full shadow-md hover:bg-gray-100 hover:text-gray-900 z-10 bg-white ring-1 ring-black ring-opacity-5 cursor-pointer">
                                                        <svg
                                                            className="h-7 w-7"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 101 101"
                                                        >
                                                            <path
                                                                d="M35.898 24.665h51.957a1.5 1.5 0 100-3H35.898a1.5 1.5 0 100 3zM87.855 48.788H35.898a1.5 1.5 0 100 3h51.957a1.5 1.5 0 100-3zM87.855 75.333H35.898a1.5 1.5 0 100 3h51.957a1.5 1.5 0 100-3zM18.021 15.79c-4.068 0-7.377 3.307-7.377 7.373 0 4.07 3.31 7.38 7.377 7.38s7.377-3.312 7.377-7.38c.002-4.066-3.308-7.374-7.377-7.374zm0 11.752a4.383 4.383 0 01-4.377-4.379 4.38 4.38 0 014.377-4.374 4.38 4.38 0 014.377 4.374 4.382 4.382 0 01-4.377 4.38zM18.021 42.91c-4.068 0-7.377 3.31-7.377 7.376 0 4.07 3.31 7.38 7.377 7.38s7.377-3.31 7.377-7.38c.002-4.067-3.308-7.376-7.377-7.376zm0 11.755a4.382 4.382 0 01-4.377-4.379 4.382 4.382 0 014.377-4.376 4.382 4.382 0 014.377 4.376 4.382 4.382 0 01-4.377 4.38zM18.021 69.455c-4.068 0-7.377 3.31-7.377 7.377 0 4.068 3.31 7.378 7.377 7.378s7.377-3.31 7.377-7.378c.002-4.067-3.308-7.377-7.377-7.377zm0 11.756a4.382 4.382 0 01-4.377-4.378 4.382 4.382 0 014.377-4.377 4.383 4.383 0 014.377 4.377 4.382 4.382 0 01-4.377 4.378z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td className="w-full text-center p-10" colSpan={columns.length + 1}>
                                            Loading. Please wait ...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {items.length ? (
                <div className="w-full text-right py-3 sm:px-6 lg:px-8 mb-4">
                    <p className="text-xs text-gray-700">
                        Displaying {filteredItems.length} of {items.length} records.
                    </p>
                </div>
            ) : (
                ''
            )}
        </>
    );
}

export default DataTable;
