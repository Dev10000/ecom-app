/* eslint-disable no-console */
import React, { useState } from 'react';
import ContactImage from './call.png';

const Contact: React.FC = (): JSX.Element => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form will be submitted with', { fullName }, { email }, { message });
    };

    return (
        <div className="flex my-16 max-w-screen-xl mx-auto">
            <div className="hidden md:flex h-92 bg-blue-400 dark:bg-gray-800 flex-1 relative">
                <div className="w-72 flex items-center justify-center">
                    <img className="absolute -left-7 w-full min-h-full" src={ContactImage} alt="Contact Us" />
                </div>
                <div className="flex flex-col mr-16 justify-evenly">
                    <div>
                        <h2 className="text-white text-4xl leading-none">
                            get in <br /> touch
                        </h2>
                    </div>
                    <div className="text-white text-sm flex flex-col space-y-4 whitespace-nowrap">
                        <p>contact@eshop.fi</p>
                        <p>+358-44-6736783721</p>
                        <p>koulukatu 22</p>
                        <p>20000 turku</p>
                    </div>
                </div>
                <div className="w-24 h-24 absolute -right-1 top-1/2 rounded-full bg-blue-400 dark:bg-gray-800" />
            </div>
            <div className="p-2 flex flex-1">
                <form className="pt-8 px-10 w-full" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullname" className="my-2 text-xs font-medium mr-4 uppercase">
                            Fullname
                            <input
                                className="border dark:border-gray-700 mb-2 p-4 text-xs w-full dark:bg-gray-800"
                                type="text"
                                name="fullname"
                                id="fullname"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="email" className="my-2 text-xs font-medium mr-4 uppercase">
                            Email
                            <input
                                className="border dark:border-gray-700 mb-2 p-4 text-xs w-full dark:bg-gray-800"
                                type="text"
                                name="email"
                                value={email}
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="message" className="my-2 text-xs font-medium mr-4 uppercase">
                            Message
                            <textarea
                                className="border dark:border-gray-700 mb-2 p-4 text-xs w-full dark:bg-gray-800 h-32"
                                value={message}
                                id="message"
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your message"
                            />
                        </label>
                    </div>
                    <div>
                        <button
                            className="bg-blue-400 hover:bg-blue-500 items-center py-2 px-4 font-serif rounded shadow font-bold border border-gray-200 text-white hover:shadow-lg select-none transition ease-in-out duration-150"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
