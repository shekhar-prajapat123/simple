import React from 'react';
import { UserDetails as UserDetailsType } from '../types';

interface UserDetailsProps {
    user: UserDetailsType;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <div className="user-details-container">
            <h3 className="user-details-header">User Details</h3>
            <div className="user-details-grid">
                <span>ID:</span> <strong>{user.id}</strong>
                <span>Name:</span> <strong>{user.name}</strong>
                <span>Email:</span> <strong>{user.email}</strong>
                <span>Status:</span> <strong>{user.status}</strong>
            </div>
        </div>
    );
};

export default UserDetails;
