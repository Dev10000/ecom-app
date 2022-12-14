/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { convertFromRaw, EditorState } from 'draft-js';
import {
    formatLocalDateTime,
    formatCurrency,
    countryIdToName,
    categoryIdToName,
    formatNullOrDatetime,
} from '../../utils';
import Options from './options';

import Empty from './empty.svg';
import NoResults from './no-results.svg';

function DataTable<T>(props: IDataTableProps<T>): JSX.Element {
    const { items, columns, actions, APILoading } = props;
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

    const EXCERPT_LENGTH = 60;

    const formatFieldType = (value: string, type?: IColumn<T>['type']) => {
        switch (type) {
            case 'datetime':
                return formatLocalDateTime(value);
            case 'nullOrDatetime':
                return formatNullOrDatetime(value);
            case 'currency':
                return formatCurrency(Number(value));
            case 'country':
                return countryIdToName(Number(value));
            case 'category':
                return categoryIdToName(Number(value));
            case 'image':
                return `image for: '${value}' here`;
            case 'excerpt':
                return value.length > EXCERPT_LENGTH ? `${value.substring(0, EXCERPT_LENGTH)}...` : value;
            case 'WYSIWYGExcerpt':
                const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(value)));
                const text = editorState.getCurrentContent().getPlainText('\u0001');
                return text.length > EXCERPT_LENGTH ? `${text.substring(0, EXCERPT_LENGTH)}...` : text;
            default:
                return value;
        }
    };

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
                    <div className="shadow bg-white overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 mb-6" cellSpacing={0} cellPadding={0}>
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
                                {!APILoading ? (
                                    items.length ? (
                                        filteredItems.length ? ( // this will prevent the 'No results found' flickering
                                            filteredItems.map((row) => {
                                                return (
                                                    <tr key={row.id}>
                                                        {columns.map((column) => (
                                                            <td
                                                                key={`${row.id}${column.db.toString()}`}
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                            >
                                                                {formatFieldType(
                                                                    String(row[column.db]),
                                                                    column.type || 'string',
                                                                )}
                                                            </td>
                                                        ))}
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <Options actions={actions} rowId={row.id || -1} />
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td
                                                    className="w-full text-center p-10 text-gray-800"
                                                    colSpan={columns.length + 1}
                                                >
                                                    <img
                                                        className="w-48 h-auto mx-auto"
                                                        src={NoResults}
                                                        alt="No results found!"
                                                    />
                                                    <div className="w-full text-center text-gray-500 text-md mt-3">
                                                        <p>
                                                            No Results Found for{' '}
                                                            <span className="italic font-medium">
                                                                &quot;{search}&quot;
                                                            </span>
                                                            ! <br />
                                                            <small>Please consider updating your search input!</small>
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    ) : (
                                        <tr>
                                            <td className="w-full text-center p-10" colSpan={columns.length + 1}>
                                                <div className="w-full my-6">
                                                    <img className="w-48 h-auto mx-auto" src={Empty} alt="Empty" />
                                                    <div className="w-full text-center text-gray-500 text-md mt-3">
                                                        <p>
                                                            There are no items to display! <br />
                                                            <small>Please start by adding one!</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td className="w-full text-center p-10" colSpan={columns.length + 1}>
                                            <div className="inline-flex">
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Loading. Please wait ...
                                            </div>
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
