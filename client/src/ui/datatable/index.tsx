/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {
    formatLocalDateTime,
    formatCurrency,
    countryIdToName,
    categoryIdToName,
    formatNullOrDatetime,
} from '../../utils';
import Options from './options';

function DataTable<T>(props: IDataTableProps<T>): JSX.Element {
    const { items, columns, actions } = props;
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

    const EXCERPT_LENGTH = 100;

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
                const state: RawDraftContentState = JSON.parse(value);
                console.dir(state);
                const markup = draftToHtml(state);
                // console.dir(state.getCurrentContent().getPlainText());
                // return JSON.stringify(state.getCurrentContent);
                return markup;
            // return text.length > EXCERPT_LENGTH ? `${text.substring(0, 100)}...` : text;
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
                                {items.length ? (
                                    filteredItems.length || search === '' ? ( // this will prevent the 'No results found' flickering
                                        filteredItems.map((row) => {
                                            return (
                                                <tr key={row.id}>
                                                    {columns.map((column) => (
                                                        <td
                                                            key={column.db.toString()}
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
                                                <p>
                                                    <span>No Results Found!</span>
                                                    <br />
                                                    <i className="italic mt-2 text-xs text-gray-600">
                                                        Please consider updating your search input!
                                                    </i>
                                                </p>
                                            </td>
                                        </tr>
                                    )
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
