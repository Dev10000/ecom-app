import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';

Modal.setAppElement('#root');

const Modals: React.FC = () => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [visibleModal, setVisibleModal] = useState<string>('');

    const openModal = (status: string): void => {
        setIsOpen(true);
        setVisibleModal(status);
    };

    const closeModal = (): void => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className="flex items-center space-x-10">
                <div>
                    <button
                        className="flex items-center hover:text-blue-500"
                        type="button"
                        onClick={() => openModal('register')}
                    >
                        <svg
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                        </svg>
                        <div className="text-xs">Register</div>
                    </button>
                </div>
                <div>
                    <button
                        className="flex items-center hover:text-blue-500"
                        type="button"
                        onClick={() => openModal('login')}
                    >
                        <svg
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                        </svg>
                        <span className="text-xs">Login</span>
                    </button>
                </div>

                <div>
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                        {visibleModal === 'login' ? <Login /> : ''}
                        {visibleModal === 'register' ? <Register /> : ''}

                        <button
                            className="text-2xl focus:outline-none absolute top-0 right-0 pt-4 px-4 text-indigo-800 hover:text-indigo-500"
                            onClick={closeModal}
                            type="button"
                        >
                            <svg className="w-6 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 35">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13.769 10l7.865-7.865A1.25 1.25 0 1019.865.366L12 8.232 4.135.366a1.25 1.25 0 10-1.769 1.77L10.232 10l-7.866 7.865a1.25 1.25 0 101.769 1.769L12 11.768l7.865 7.866a1.247 1.247 0 001.769 0 1.25 1.25 0 000-1.77L13.769 10zM.924 34.652v-8.544h5.712v1.224h-4.2v2.364h3.948v1.224H2.436v2.508h4.2v1.224H.924zm9.912.108c-.656 0-1.27-.088-1.842-.264a4.233 4.233 0 01-1.458-.756l.528-1.128c.416.312.85.542 1.302.69.452.148.946.222 1.482.222.592 0 1.05-.104 1.374-.312.324-.208.486-.5.486-.876 0-.32-.15-.566-.45-.738-.3-.172-.794-.334-1.482-.486-1.072-.232-1.852-.532-2.34-.9-.488-.368-.732-.904-.732-1.608a2.3 2.3 0 01.408-1.344c.272-.392.658-.7 1.158-.924.5-.224 1.078-.336 1.734-.336.6 0 1.17.09 1.71.27.54.18.982.43 1.326.75l-.516 1.128c-.76-.608-1.6-.912-2.52-.912-.552 0-.988.114-1.308.342-.32.228-.48.538-.48.93a.85.85 0 00.426.768c.284.176.77.34 1.458.492.712.168 1.292.35 1.74.546.448.196.792.448 1.032.756s.36.694.36 1.158c0 .512-.136.958-.408 1.338-.272.38-.664.674-1.176.882-.512.208-1.116.312-1.812.312zm8.712 0c-.84 0-1.574-.18-2.202-.54a3.61 3.61 0 01-1.446-1.53c-.336-.66-.504-1.434-.504-2.322 0-.88.168-1.65.504-2.31a3.573 3.573 0 011.446-1.524c.628-.356 1.362-.534 2.202-.534.576 0 1.118.09 1.626.27.508.18.93.43 1.266.75l-.504 1.128a4.065 4.065 0 00-1.146-.678c-.38-.14-.786-.21-1.218-.21-.824 0-1.462.268-1.914.804-.452.536-.678 1.304-.678 2.304 0 1.008.224 1.782.672 2.322.448.54 1.088.81 1.92.81.432 0 .838-.07 1.218-.21.38-.14.762-.366 1.146-.678l.504 1.128c-.336.32-.758.57-1.266.75-.508.18-1.05.27-1.626.27z"
                                    fill="#718096"
                                />
                            </svg>
                        </button>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Modals;
