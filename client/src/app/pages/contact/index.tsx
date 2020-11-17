import React, { useState } from 'react';
import ContactImage from './call.png';

const Contact: React.FC = (): JSX.Element => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log('Form will be submitted with', { fullName }, { email }, { message });
    };

    return (
        <div className="flex my-16 max-w-screen-xl mx-auto">
            <div className="hidden md:flex h-92 bg-blue-400 flex-1 relative">
                <div className="w-72 flex bg-blue-400 items-center justify-center">
                    <img className="absolute -left-7 w-full min-h-full" src={ContactImage} alt="Contact Us" />
                </div>
                <div className="flex flex-col bg-blue-400 mr-16 justify-evenly">
                    <div>
                        <h2 className="text-white text-4xl leading-none">
                            get in <br /> touch
                        </h2>
                    </div>
                    <div className="text-white text-sm flex flex-col space-y-4 whitespace-no-wrap">
                        <p>contact@eshop.fi</p>
                        <p>+358-44-6736783721</p>
                        <p>koulukatu 22</p>
                        <p>20000 turku</p>
                    </div>
                </div>
                <div className="w-24 h-24 absolute -right-1 top-1/2 rounded-full bg-blue-400" />
            </div>
            <div className="p-2 flex flex-1">
                <form className="pt-8 px-10 w-full" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullname" className="text-sm">
                            Fullname
                            <br />
                            <input
                                className="p-3 w-full border border-gray-400 focus:border-blue-400 mb-6 text-xs"
                                type="text"
                                name="fullname"
                                id="fullname"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your Fullname.."
                                required
                            />
                            <br />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm">
                            Email
                            <br />
                            <input
                                className="p-3 w-full border border-gray-400 focus:border-blue-400 mb-6 text-xs"
                                type="text"
                                name="email"
                                value={email}
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Email.."
                                required
                            />
                            <br />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="message" className="text-sm">
                            Message
                            <br />
                            <textarea
                                className="p-3 w-full border border-gray-400 focus:border-blue-400 mb-6 text-xs h-32"
                                value={message}
                                id="message"
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your Message.."
                            />
                            <br />
                        </label>
                    </div>
                    <div>
                        <button
                            className="bg-blue-400 items-center py-2 px-4 font-serif rounded shadow font-bold border border-gray-400 text-white hover:shadow-lg select-none transition ease-in-out duration-150"
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
