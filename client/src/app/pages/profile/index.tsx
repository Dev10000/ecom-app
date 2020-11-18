import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = (): JSX.Element => {
    const [user, setUser] = useState<IUser>();
    useEffect(() => {
        axios
            .get('users/1')
            .then((response) => {
                setUser(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    return (
        <div>
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
