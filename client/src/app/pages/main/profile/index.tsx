import React, { useContext } from 'react';
import AuthContext from '../../../../context/auth';

const Profile: React.FC = (): JSX.Element => {
    const { user } = useContext(AuthContext);

    return (
        <div className="mx-10">
            {user ? (
                <div>
                    <div>{user.email}</div>
                    <div>{user.password}</div>
                    <div>{user.first_name}</div>
                    <div>{user.last_name}</div>
                    <div>{user.address}</div>
                    <div>{user.country_id}</div>
                    <div>{user.city}</div>
                    <div>{user.postal_code}</div>
                    <div>{user.phone_number}</div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Profile;
