import React from 'react';

interface IButtonProbs {
    children: React.ReactElement;
    submit: boolean;
}

const ButtonPrimary: React.FC<IButtonProbs> = ({ children, submit }): JSX.Element => {
    return (
        <button type={submit ? 'submit' : 'button'} className="button w-64 h-12 bg-blue-400 text-ceter leading-8">
            {children}
        </button>
    );
};

const ButtonSeconary: React.FC<IButtonProbs> = ({ children, submit }): JSX.Element => {
    return (
        <button
            type={submit ? 'submit' : 'button'}
            className="button w-64 h-12 bg-white text-blue-400 text-ceter leading-8"
        >
            {children}
        </button>
    );
};

export default { ButtonPrimary, ButtonSeconary };
