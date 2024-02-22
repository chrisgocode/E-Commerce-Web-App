import React, { useState, dispatch } from "react";
import { useStateValue } from "../../../context/StateProvider";
import "./Login.css";
import loginLogo from "../../../assets/Login_Logo.svg";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { display } from "@mui/system";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // New state to control form type
  const [errors, setErrors] = useState({}); // New state for error messages
  const [{ user }, dispatch] = useStateValue(); // Get the user from the global state

  const showRegisterForm = () => setIsRegistering(true); // Handler to show registration form
  const showLoginForm = () => setIsRegistering(false); // Handler to show login form

  // Validate form fields
  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = name ? "" : "Enter your name";
    tempErrors.email = email ? "" : "Enter your email";
    tempErrors.password =
      password.length > 5 ? "" : "Minimum 6 characters required";
    tempErrors.rePassword =
      rePassword === password ? "" : "Passwords must match";
    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  // Function to handle sign-in
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User signed in successfully
      const user = userCredential.user;
      // Redirect to home page
      navigate("/");
    } catch (error) {
      // Handle Errors here.
      alert(error.message);
    }
  };

  // Function to handle registering
  const register = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, {
          displayName: name,
        });
        // User created successfully
        console.log("User created:", userCredential.user);
        dispatch({
          type: "SET_USER",
          user: userCredential.user,
          userName: name, // Send the name to the global state
        });
        // You can navigate to the home page or do other actions like sending a verification email
        navigate("/"); // Redirect to home page after registration
      } catch (error) {
        // Handle Errors here.
        const errorMessage = error.message;
        // Show an error message to the user
        alert(errorMessage);
      }
    }
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={loginLogo} alt="Amazon" />
      </Link>
      <div className="login__container">
        {isRegistering ? (
          // Registration form
          <>
            <h1>Create account</h1>
            <form>
              <h5>Your name</h5>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="login__error">{errors.name}</p>}

              <h5>Your email</h5>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="login__error">{errors.email}</p>}

              <h5>Password</h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="login__error">{errors.password}</p>
              )}
              <h5>Re-enter password</h5>
              <input
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              {errors.rePassword && (
                <p className="login__error">{errors.rePassword}</p>
              )}

              <button
                type="submit"
                onClick={register}
                className="login__continueButton"
              >
                Continue
              </button>
            </form>
            <p>
              By creating an account, you agree to Amazon's Conditions of Use
              and Privacy Notice.
            </p>
            <button onClick={showLoginForm} className="login__signInLink">
              Already have an account? Sign in
            </button>
          </>
        ) : (
          // Sign-in form
          <>
            <h1>Sign-in</h1>
            <form>
              <h5>Email</h5>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <h5>Password</h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                onClick={signIn}
                className="login__signInButton"
              >
                Sign In
              </button>
            </form>
            <p>
              By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use
              & Sale. Please see our Privacy Notice, our Cookies Notice and our
              Interest-Based Ads Notice.
            </p>
            <div className="login__actions">
              <button
                onClick={forgotPassword}
                className="login__forgotPasswordButton"
              >
                Forgot Password
              </button>
              <button
                onClick={showRegisterForm}
                className="login__registerButton"
              >
                Register a new account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
