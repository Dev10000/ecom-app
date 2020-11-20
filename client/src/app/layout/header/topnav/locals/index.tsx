import React from 'react';

const Locals: React.FC = (): JSX.Element => {
    return (
        <div className="flex items-center text-md">
            <div className="px-1">
                <select className="bg-white dark:bg-gray-900 p-1 rounded">
                    <option>EN</option>
                </select>
            </div>
            <div className="px-1">
                <select className="bg-white dark:bg-gray-900 p-1 rounded">
                    <option>EUR</option>
                </select>
            </div>
        </div>
    );
};

export default Locals;
