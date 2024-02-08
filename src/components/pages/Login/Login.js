import React, { useState } from 'react';
import './Login.css'; // make sure to import your CSS file
import loginLogo from '../../../assets/Login_Logo.svg'; // replace with your logo path
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  // Function to handle sign-in, you'll need to implement it
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
      const user = userCredential.user;
      // Redirect to home page
      navigate('/');
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // Show an error message to the user
      alert(errorMessage);
    }
  };

  // Function to handle registering, you'll need to implement it
  const register = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User created successfully
      console.log('User created:', userCredential.user);
      // You can navigate to the home page or do other actions like sending a verification email
      navigate('/'); // Redirect to home page after registration
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // Show an error message to the user
      alert(errorMessage);
    }
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img 
          className='login__logo' 
          src={loginLogo} // Your path to the Amazon logo
          alt='Amazon' 
        />
      </Link>
      <div className='login__container'>
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
          <h5>Password</h5>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
          <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        <button onClick={register} className='login__registerButton'>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );

}

export default Login;