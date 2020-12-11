import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

const Options: React.FC<IOPtionsProps> = ({ actions, rowId }): JSX.Element => {
    const [rowDropdownOpen, setRowDropdownOpen] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                setRowDropdownOpen(false);
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const showIcon = (action: string): React.ReactElement => {
        switch (action.toLowerCase()) {
            case 'delete':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-gray-700 mr-4"
                        viewBox="0 0 24 24"
                    >
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                    </svg>
                );
            case 'edit':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-gray-700 mr-4"
                        viewBox="0 0 24 24"
                    >
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                );
            default:
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-gray-700 mr-4"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                );
        }
    };

    return !actions ? (
        <></>
    ) : (
        <div className="relative z-100 flex justify-end items-center">
            <button
                type="button"
                onClick={() => setRowDropdownOpen(!rowDropdownOpen)}
                className="p-2 z-0 rounded-full hover:bg-gray-100 hover:text-gray-900 bg-white ring-1 ring-black ring-opacity-5 cursor-pointer"
            >
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                >
                    <path d="M0 0h24v24H0z" stroke="none" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="19" r="1" />
                    <circle cx="12" cy="5" r="1" />
                </svg>
            </button>
            <Transition
                show={rowDropdownOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <>
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                        type="button"
                        className="fixed z-10 inset-0 h-full w-full cursor-default focus:outline-none"
                        onClick={() => setRowDropdownOpen(false)}
                        tabIndex={-1}
                    />
                    <div className="mx-3 z-20 origin-top-right absolute right-8 top-0 w-40 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200">
                        <div className="py-1">
                            {actions.map((action) => (
                                <button
                                    className="block w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                    type="button"
                                    key={action.display}
                                    onClick={() => action.action(rowId)}
                                >
                                    <span className="inline-flex">
                                        {showIcon(action.display)} {action.display}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            </Transition>
        </div>
    );
};

export default Options;
