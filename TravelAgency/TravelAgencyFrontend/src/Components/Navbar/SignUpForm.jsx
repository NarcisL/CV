import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import './SignUpForm.css';

const SignUpForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSubmit, closeSignInForm, error }) => {
    return (
        <div className='signUpForm'>
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
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default SignUpForm;
