/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { fieldError } from '../../../utils';

interface IModalInputProps {
    id: string;
    label: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    errors: IFormError[];
}

const ModalInput: React.FC<IModalInputProps> = ({ id, label, errors, value, setValue }): JSX.Element => {
    return (
        <>
            <label
                htmlFor={id}
                className={`block text-sm font-medium text-gray-500 mb-1 ${
                    fieldError(id, errors) ? 'text-red-500' : ''
                }`}
            >
                {label}
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    name={id}
                    id={id}
                    className={`p-2 block w-full border shadow-sm sm:text-sm border-gray-300 rounded-md ${
                        fieldError(id, errors) ? 'border-red-500' : ''
                    }`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="text-red-500 font-light text-xs">{fieldError(id, errors)}</div>
        </>
    );
};

export default ModalInput;
