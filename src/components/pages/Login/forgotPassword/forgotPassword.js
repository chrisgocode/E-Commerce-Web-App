import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../Firebase';
import { useNavigate, Link } from 'react-router-dom';
import loginLogo from '../../../../assets/Login_Logo.svg'; // replace with your logo path
import './forgotPassword.css'; // Make sure to create this CSS file

function PasswordAssistance() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent!');
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='forgotPassword'>
            <img 
                className='forgotPassword__logo' 
                src={loginLogo}
                alt='Amazon' 
                onClick={() => navigate('/')} // Navigate to home when logo is clicked
            />
            <div className='forgotPassword__container'>
                <h1>Forgot Password?</h1>
                <p>Enter the email address associated with your account.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                    />
                    <button type='submit' className='forgotPassword__continueButton'>
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PasswordAssistance;