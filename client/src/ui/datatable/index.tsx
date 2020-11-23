import React from 'react';

interface IDataTableProps {
    items: IUserModel[];
    buildHead: () => React.ReactElement;
    buildRow: (row: IUserModel) => React.ReactElement;
}

const DataTable: React.FC<IDataTableProps> = ({ items, buildHead, buildRow }): JSX.Element => {
    return (
        <div className="w-full">
            <div className="overflow-x-auto align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200" cellSpacing={0} cellPadding={0}>
                        <thead>{buildHead()}</thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((row) => {
                                return <React.Fragment key={row.id}>{buildRow(row)}</React.Fragment>;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
