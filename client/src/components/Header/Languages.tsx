import React from 'react';

const Languages: React.FC = (): JSX.Element => {
    return (
        <div className="flex items-center">
            <div className="px-1 text-xs">
                <select>
                    <option>EN</option>
                    <option>FI</option>
                </select>
            </div>
            <div className="px-1 text-xs">
                <select>
                    <option>EUR</option>
                    <option>USD</option>
                </select>
            </div>
        </div>
    );
};

export default Languages;
