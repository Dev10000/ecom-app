import React, { useState, useEffect } from 'react';

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
                                                        {row[column.db]}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td className="w-full text-center p-10" colSpan={columns.length}>
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
