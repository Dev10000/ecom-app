import React from 'react';

interface IFunctionProps {
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    editProfile: (event: React.MouseEvent<HTMLButtonElement>) => void;
    editField: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Edit = (props: IFunctionProps) => {
    const { setDisplay, editProfile, editField } = props;
    return (
        <div className="flex flex-row items-center space-x-4">
            <div className="flex flex-row items-center border rounded border-blue-400">
                <div className="">
                    <label className="flex flex-row" htmlFor="fname">
                        <input
                            className="p-3 text-sm border rounded"
                            onChange={editField}
                            type="text"
                            id="fname"
                            name="fname"
                            placeholder="Type and click save"
                        />
                        <button
                            type="button"
                            onClick={editProfile}
                            className="p-2 bg-blue-400 text-white hover:bg-blue-500"
                        >
                            Save
                        </button>
                    </label>
                </div>
            </div>
            <button onClick={() => setDisplay(false)} className="text-red-400 hover:text-red-500" type="button">
                <svg
                    className="w-4 h-4 fill-current inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
                </svg>
            </button>
        </div>
    );
};

export default Edit;
