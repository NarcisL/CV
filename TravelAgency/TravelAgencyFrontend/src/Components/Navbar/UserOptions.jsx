import React from 'react';
import './UserOptions.css';

const UserOptions = ({ handleSignOut, handleChangePassword, handleDeleteAccount, closeUserOptions }) => {
    return (
        <div className='userOptionsForm'>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleChangePassword}>Change Password</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
            <button onClick={closeUserOptions}>Close</button>
        </div>
    );
};

export default UserOptions;
