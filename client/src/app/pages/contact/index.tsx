import React from 'react';

const Contact: React.FC = (): JSX.Element => {
    return (
        <div className="bg-gray-500 mt-12 border-1 rounded-xl shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl">
            <form className="flex flex-col w-2xl max-w-sm items-center mx-auto mb-16 ">
                <h2 className="font-bold text-2xl mt-4 text-black-300">Contact our E-shop!</h2>
                <div className="w-full text-center">
                    <label htmlFor="fullname">
                        Fullname
                        <input
                            className="p-4 w-full text-xs text-center mt-5 focus:outline-none focus:shadow-outline"
                            type="text"
                            name="fullname"
                            placeholder="Enter your Fullname.."
                            required
                        />
                    </label>
                </div>
                <div className="w-full text-center mt-3">
                    <label htmlFor="email">
                        Email
                        <input
                            className="p-4 text-xs w-full text-center mt-5 focus:outline-none focus:shadow-outline"
                            type="text"
                            name="email"
                            placeholder="Enter your Email.."
                            required
                        />
                    </label>
                </div>
                <div>
                    <textarea
                        className="p-4 text-lg w-full mt-5 resize-x border rounded focus:outline-none focus:shadow-outline"
                        placeholder="Enter your Message.."
                    />
                </div>
            </form>
        </div>
    );
};

export default Contact;
