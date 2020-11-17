import React, { useState } from 'react';
import './style.css';
// import ContactImage from './contact.png';

const Contact: React.FC = (): JSX.Element => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted with', { fullName }, { email }, { message });
    };

    return (
        <div className="flex-container">
            <div className="flex-item-left">
                <div className="sub-left">{/* <img className="img-left" src={ContactImage} alt="img" /> */}</div>
                <div className="sub-middle">
                    <div>
                        <h2>
                            get in <br /> touch
                        </h2>
                    </div>
                    <div className="para">
                        <p>contact@eshop.fi</p>
                        <p>+358-44-6736783721</p>
                        <p>koulukatu 22</p>
                        <p>20000 turku</p>
                    </div>
                </div>
                <div className="sub-right" />
            </div>
            <div className="flex-item-right">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullname">
                            Fullname
                            <br />
                            <input
                                type="text"
                                name="fullname"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your Fullname.."
                                required
                            />
                            <br />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="email">
                            Email
                            <br />
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Email.."
                                required
                            />
                            <br />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="message">
                            Message
                            <br />
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your Message.."
                            />
                            <br />
                        </label>
                    </div>
                    <div>
                        <button id="btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
