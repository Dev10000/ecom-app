import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddOrEdit from './actions/add-or-edit';
import DataTable from '../../../../ui/datatable';
import Delete from './actions/delete';

const News: React.FC = (): JSX.Element => {
    const [articles, setArticles] = useState<ICountryModel[]>([]);
    const [addOrEditDisplay, setAddOrEditDisplay] = useState(false);
    const [forDeletion, setForDeletion] = useState<number>(0);
    const [forEdit, setForEdit] = useState<number>(0);
    const [updated, setUpdated] = useState<number>(0);
    const [APILoading, setAPILoading] = useState(false);

    useEffect(() => {
        setAPILoading(true);
        axios
            .get('articles/all')
            .then((response) => {
                setArticles(response.data.data);
                setAPILoading(false);
            })
            .catch((err) => {
                setAPILoading(false);
                return err;
            });
    }, [updated]);

    const columns: IColumn<IArticleModel>[] = [
        {
            display: 'Title',
            db: 'title',
        },
        {
            display: 'Slug',
            db: 'slug',
        },
        {
            display: 'Featured Image',
            db: 'featured_image',
            type: 'image',
        },
        {
            display: 'Body',
            db: 'body',
            type: 'WYSIWYGExcerpt',
        },
        {
            display: 'Created',
            db: 'created_at',
            type: 'datetime',
        },
        {
            display: 'Published',
            db: 'published_at',
            type: 'nullOrDatetime',
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
                            News Articles
                        </h1>
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
                            <span> Write New</span>
                        </button>
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
                <DataTable<IArticleModel>
                    items={articles}
                    columns={columns}
                    actions={actions}
                    APILoading={APILoading}
                />
            </div>
        </div>
    );
};

export default News;
