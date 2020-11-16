import React, { useState } from 'react';

const Quantity: React.FC = (): JSX.Element => {
    const stockQty = 10;
    const [count, setCount] = useState<number>(1);
    const handleMinus = (): void => {
        if (count > 0) setCount(count - 1);
    };
    const handlePlus = () => {
        if (count < stockQty) setCount(count + 1);
    };
    return (
        <div className="flex px-1 w-20 items-center justify-between text-base bg-gray-400 border round">
            <button className="block w-full bg-gray-400" type="button" onClick={() => handleMinus()}>
                -
            </button>
            <div className="bg-gray-400 items-center w-full">{count}</div>
            <button className="block w-full bg-gray-400" type="button" onClick={() => handlePlus()}>
                +
            </button>
        </div>
    );
};

export default Quantity;
