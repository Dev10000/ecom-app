/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import ModalInput from '../../../../../../ui/components/modal-input';

Modal.setAppElement('#root');

interface IAddProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdated: React.Dispatch<React.SetStateAction<number>>;
    setForEdit: React.Dispatch<React.SetStateAction<number>>;
    edit: number;
}

const AddOrEdit: React.FC<IAddProps> = ({ visible, setVisible, setUpdated, edit, setForEdit }): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [alpha2, setAlpha2] = useState('');
    const [alpha3, setAlpha3] = useState('');
    const [code, setCode] = useState('');
    const [ISO31162, setISO31162] = useState('');
    const [region, setRegion] = useState('');
    const [regionCode, setRegionCode] = useState('');
    const [subRegion, setSubRegion] = useState('');
    const [subRegionCode, setSubRegionCode] = useState('');
    const [intermediateRegion, setIntermediateRegion] = useState('');
    const [intermediateRegionCode, setIntermediateRegionCode] = useState('');

    const [errors, setErrors] = useState<IFormError[]>([]);

    useEffect(() => {
        if (edit) {
            setLoading(true);
            axios.get(`countries/${edit}`).then((response) => {
                if (response.data.data.id) {
                    const { data } = response.data;
                    setName(data.name);
                    setAlpha2(data.alpha2);
                    setAlpha3(data.alpha3);
                    setCode(data.code);
                    setISO31162(data.iso_3166_2);
                    setRegion(data.region);
                    setRegionCode(data.region_code);
                    setSubRegion(data.sub_region);
                    setSubRegionCode(data.sub_region_code);
                    setIntermediateRegion(data.intermediate_region);
                    setIntermediateRegionCode(data.intermediate_region_code);
                }
                setLoading(false);
            });
        }
    }, [edit]);

    const closeModal = (): void => {
        setVisible(false);
        setLoading(false);
        setName('');
        setAlpha2('');
        setAlpha3('');
        setCode('');
        setISO31162('');
        setRegion('');
        setRegionCode('');
        setSubRegion('');
        setSubRegionCode('');
        setIntermediateRegion('');
        setIntermediateRegionCode('');
        setErrors([]);
        setForEdit(0);
    };

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        axios
            .post('countries', {
                name,
                alpha2,
                alpha3,
                code,
                iso_3166_2: ISO31162,
                region,
                region_code: regionCode,
                sub_region: subRegion,
                sub_region_code: subRegionCode,
                intermediate_region: intermediateRegion,
                intermediate_region_code: intermediateRegionCode,
            })
            .then((response) => {
                if (response.data.data.id) {
                    setUpdated(response.data.data.id);
                    closeModal();
                }
                setLoading(false);
            })
            .catch((err) => {
                setErrors(err.response.data.data);
                setLoading(false);
            });
    };

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        axios
            .patch(`countries/${edit}`, {
                name,
                alpha2,
                alpha3,
                code,
                iso_3166_2: ISO31162,
                region,
                region_code: regionCode,
                sub_region: subRegion,
                sub_region_code: subRegionCode,
                intermediate_region: intermediateRegion,
                intermediate_region_code: intermediateRegionCode,
            })
            .then((response) => {
                if (response.data.data.id) {
                    setUpdated(response.data.data.id);
                    setForEdit(0);
                    closeModal();
                    setLoading(false);
                }
            })
            .catch((err) => {
                setErrors(err.response.data.data);
                setLoading(false);
            });
    };

    return (
        <Modal
            overlayClassName="fixed z-50 inset-0 -top-16 overflow-y-auto flex items-end justify-center min-h-screen pt-4 mt-16 px-4 pb-20 text-center bg-gray-600 bg-opacity-75"
            className="items-center align-bottom inline-block h-auto w-full max-w-2xl m-auto relative top-2 left-2 right-2 bottom-2 bg-white dark:bg-gray-900 dark:text-white bg-opacity-100 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all focus:outline-none"
            isOpen={visible}
            onRequestClose={closeModal}
        >
            <form onSubmit={edit ? handleUpdate : handleCreate}>
                <div className="p-5 sm:flex sm:items-end sm:flex-col">
                    <div className="mt-3 sm:mt-0 sm:ml-4 w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{edit ? 'Edit' : 'Add'} Country</h3>

                        <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <ModalInput id="name" label="Name" value={name} setValue={setName} errors={errors} />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput
                                    id="alpha2"
                                    label="Alpha-2"
                                    value={alpha2}
                                    setValue={setAlpha2}
                                    errors={errors}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput
                                    id="alpha3"
                                    label="Alpha-3"
                                    value={alpha3}
                                    setValue={setAlpha3}
                                    errors={errors}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput id="code" label="Code" value={code} setValue={setCode} errors={errors} />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput
                                    id="iso-3166-2"
                                    label="ISO 3166-2"
                                    value={ISO31162}
                                    setValue={setISO31162}
                                    errors={errors}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput
                                    id="region"
                                    label="Region"
                                    value={region}
                                    setValue={setRegion}
                                    errors={errors}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput
                                    id="region_code"
                                    label="Region Code"
                                    value={regionCode}
                                    setValue={setRegionCode}
                                    errors={errors}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput
                                    id="sub_region"
                                    label="Sub Region"
                                    value={subRegion}
                                    setValue={setSubRegion}
                                    errors={errors}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput
                                    id="sub_region_code"
                                    label="Sub Region Code"
                                    value={subRegionCode}
                                    setValue={setSubRegionCode}
                                    errors={errors}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput
                                    id="intermediate_region"
                                    label="Intermediate Region"
                                    value={intermediateRegion}
                                    setValue={setIntermediateRegion}
                                    errors={errors}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <ModalInput
                                    id="intermediate_region_code"
                                    label="Intermediate Region Code"
                                    value={intermediateRegionCode}
                                    setValue={setIntermediateRegionCode}
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <button
                            className="text-2xl focus:outline-none absolute top-0 right-0 pt-4 px-4 text-gray-800 hover:text-gray-500"
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
                    </div>

                    <div className="mt-6 sm:mt-10 sm:flex sm:flex-1">
                        <button
                            type="submit"
                            className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm ${
                                loading ? 'cursor-not-allowed' : ''
                            }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    <span>Please wait...</span>
                                </>
                            ) : edit ? (
                                'Update'
                            ) : (
                                'Create'
                            )}
                        </button>
                        <button
                            type="button"
                            className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                                loading ? 'cursor-not-allowed' : ''
                            }`}
                            onClick={closeModal}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default AddOrEdit;
