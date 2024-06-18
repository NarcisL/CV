import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaMapLocationDot } from 'react-icons/fa6';
import './Navbar.css';
import userIcon from 'C:/Users/Dima/Desktop/travelproject/src/Assets/cox.png';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm.jsx';
import UserOptions from './UserOptions';

const Navbar = ({ isSignedIn, setIsSignedIn, email, setEmail }) => {
    const [navBar, setNavBar] = useState('menu');
    const [showSignIn, setShowSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);

    const showNavBar = () => {
        setNavBar("menu showNavbar");
    };

    const toggleUserOptions = () => {
        setShowUserOptions(prevState => !prevState);
    };

    const toggleSignIn = () => {
        setShowSignIn(!showSignIn);
        setIsSignUp(false);
    };

    const toggleSignUp = () => {
        setIsSignUp(true);
    };

    const closeSignInForm = () => {
        setShowSignIn(false);
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailCrit = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailCrit.test(email)) {
            setError('Email must not contain special characters.');
            return;
        }
        if (password.length < 4) {
            setError('Password must be at least 4 characters long.');
            return;
        }
        if (isSignUp && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');

        const url = isSignUp ? 'http://localhost:3000/api/accounts/signup' : 'http://localhost:3000/api/accounts/signin';
        const method = 'POST';
        const body = JSON.stringify({ mail: email, password: password });

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            if (isSignUp) {
                console.log('Account created successfully');
                setShowSignIn(false);
            } else {
                console.log('Signed in successfully');
                setIsSignedIn(true);
                setShowSignIn(false);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
        setShowUserOptions(false);
        setShowSignIn(true);
    };

    const handleChangePassword = () => {
        setShowChangePassword(true);
        setShowUserOptions(false);
    };

    const handleDeleteAccount = () => {
        setShowDeleteAccount(true);
        setShowUserOptions(false);
    };

    const closeUserOptions = () => {
        setShowUserOptions(false);
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }

        const url = `http://localhost:3000/api/accounts?mail=${email}`;
        const body = JSON.stringify({ mail: email, password: newPassword });

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            console.log('Password changed successfully');
            setShowChangePassword(false);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const closeChangePasswordForm = () => {
        setShowChangePassword(false);
    };

    const handleDeleteAccountConfirmation = async () => {
        const url = `http://localhost:3000/api/accounts?mail=${email}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            console.log('Account deleted');
            setShowDeleteAccount(false);
            setIsSignedIn(false);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const closeDeleteAccountForm = () => {
        setShowDeleteAccount(false);
    };

    return (
        <div className='navBar'>
            <div className="logoDiv">
                <FaMapLocationDot className='icon' />
                <span>SMART TRAVEL</span>
            </div>

            <div className={navBar}>
                <ul>
                    <li className='navList' onClick={() => scrollToSection('destinationSection')}>Destination</li>
                    <li className='navList' onClick={() => scrollToSection('aboutUsSection')}>About Us</li>
                    <li className='navList' onClick={() => scrollToSection('reviewsSection')}>Endorsements</li>
                    <li className='navList' onClick={() => scrollToSection('subscribeSection')}>Showcase</li>
                    {!isSignedIn && <li className='navList signInBtn' onClick={toggleSignIn}>Sign In</li>}
                    {isSignedIn && <li className='navList navListWithIcon' onClick={toggleUserOptions}><img src={userIcon} alt="User Icon" className="userIcon" /></li>}
                </ul>
            </div>
            
            {showSignIn && (
                isSignUp ? (
                    <SignUpForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        handleSubmit={handleSubmit}
                        closeSignInForm={closeSignInForm}
                        error={error}
                    />
                ) : (
                    <SignInForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        toggleSignUp={toggleSignUp}
                        handleSubmit={handleSubmit}
                        closeSignInForm={closeSignInForm}
                        error={error}
                    />
                )
            )}

            {showUserOptions && (
                <UserOptions
                    handleSignOut={handleSignOut}
                    handleChangePassword={handleChangePassword}
                    handleDeleteAccount={handleDeleteAccount}
                    closeUserOptions={closeUserOptions}
                />
            )}

            {showChangePassword && (
                <div className='changePasswordForm'>
                    <form onSubmit={handleChangePasswordSubmit}>
                        <div>
                            <label htmlFor="newPassword">New Password:</label>
                            <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                            <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button type="submit">Change Password</button>
                    </form>
                </div>
            )}

            {showDeleteAccount && (
                <div className='deleteAccountForm'>
                    <p>Are you sure you want to delete your account?</p>
                    <button onClick={handleDeleteAccountConfirmation}>Yes</button>
                    <button onClick={closeDeleteAccountForm}>No</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
