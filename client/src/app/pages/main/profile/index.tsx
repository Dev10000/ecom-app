/* eslint-disable camelcase */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthContext from '../../../../context/auth';
import EditAll from './editAll';
import Navlinks from './navlinks';
import ProfileData from './profileData';

const Profile: React.FC = (): JSX.Element => {
    const { user } = useContext(AuthContext);
    const [firstNameDisplay, setFirstNameDisplay] = useState<boolean>(false);
    const [lastNameDisplay, setLastNameDisplay] = useState<boolean>(false);
    const [emailDisplay, setEmailDisplay] = useState<boolean>(false);
    const [passwordDisplay, setPasswordDisplay] = useState<boolean>(false);
    const [addressDisplay, setAddressDisplay] = useState<boolean>(false);
    const [phoneNumberDisplay, setPhoneNumberDisplay] = useState<boolean>(false);
    const [postalCodeDisplay, setPostalCodeDisplay] = useState<boolean>(false);
    const [cityDisplay, setCityDisplay] = useState<boolean>(false);
    const [countryDisplay, setCountryDisplay] = useState<boolean>(false);
    const [changedValue, setChangedValue] = useState<string>('');
    const [flag, setFlag] = useState<string>('profile');
    const editField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangedValue(e.target.value);
    };

    const saveEdit = (field: string, setDisplay: React.Dispatch<React.SetStateAction<boolean>>) => {
        axios.patch(`/users/${user?.id}`, { [field]: changedValue });
        setDisplay(false);
    };

    return (
        <div>
            <div className="mx-10">
                <div>
                    {user && flag === 'profile' ? (
                        <div className="flex flex-col sm:flex-row sm:space-x-10 sm:mt-16">
                            <div className="flex flex-row sm:flex-col w-full sm:w-1/4 justify-center sm:justify-start sm:space-y-2">
                                <Navlinks flag={flag} setFlag={setFlag} />
                            </div>
                            <div className="flex-grow flex flex-col space-y-10 border rounded-md shadow">
                                <ProfileData
                                    user={user}
                                    firstNameDisplay={firstNameDisplay}
                                    lastNameDisplay={lastNameDisplay}
                                    addressDisplay={addressDisplay}
                                    emailDisplay={emailDisplay}
                                    passwordDisplay={passwordDisplay}
                                    phoneNumberDisplay={phoneNumberDisplay}
                                    cityDisplay={cityDisplay}
                                    countryDisplay={countryDisplay}
                                    postalCodeDisplay={postalCodeDisplay}
                                    setFirstNameDisplay={setFirstNameDisplay}
                                    setLastNameDisplay={setLastNameDisplay}
                                    setAddressDisplay={setAddressDisplay}
                                    setEmailDisplay={setEmailDisplay}
                                    setPasswordDisplay={setPasswordDisplay}
                                    setPhoneNumberDisplay={setPhoneNumberDisplay}
                                    setCityDisplay={setCityDisplay}
                                    setCountryDisplay={setCountryDisplay}
                                    setPostalCodeDisplay={setPostalCodeDisplay}
                                    editField={editField}
                                    saveEdit={saveEdit}
                                />
                            </div>
                            <div className="w-1/4 bg-gray-100 h-auto" />
                        </div>
                    ) : (
                        ''
                    )}
                    {user && flag === 'edit-profile' ? (
                        <div className="flex flex-col sm:flex-row sm:space-x-10 sm:mt-16">
                            <div className="flex flex-row sm:flex-col w-full sm:w-1/4 justify-center sm:justify-start sm:space-y-2">
                                <Navlinks flag={flag} setFlag={setFlag} />
                            </div>
                            <div className="flex-grow flex flex-col space-y-10 border rounded-md shadow">
                                <EditAll />
                            </div>
                            <div className="w-1/4 bg-gray-100 h-auto" />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
