import React from 'react';

const Locals: React.FC = (): JSX.Element => {
    return (
        <div className="flex items-center text-md">
            <div className="px-1">
                <select>
                    <option>EN</option>
                </select>
            </div>
            <div className="px-1">
                <select>
                    <option>EUR</option>
                </select>
            </div>
        </div>
    );
};

export default Locals;
