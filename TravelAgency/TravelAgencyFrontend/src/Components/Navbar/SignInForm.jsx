import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import './SignInForm.css';

const SignInForm = ({ email, setEmail, password, setPassword, toggleSignUp, handleSubmit, closeSignInForm, error }) => {
    return (
        <div className='signInForm'>
            <AiFillCloseCircle className='closeButton' onClick={closeSignInForm} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign In</button>
                <p className='createAccountText'>
                    Don't have an account? <span onClick={toggleSignUp}>Create one!</span>
                </p>
            </form>
        </div>
    );
};

export default SignInForm;
