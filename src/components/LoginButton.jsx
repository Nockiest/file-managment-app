import GoogleButton from "../partials/GoogleSignInButton";
import React, { useState } from "react";
import { signInWithGoogle, auth } from "../firebase";
export default function LoginButton({user, setUser} ) {
    const [errorMessage, setErrorMessage] = useState("");
 
    const handleSignInWithGoogle = async () => {
        try {
          const result = await signInWithGoogle();
          console.log(result)
          const { displayName, photoURL, email } = result.user;

          setUser({ displayName, photoURL, email });
        } catch (error) {
          setErrorMessage(`Error signing in with Google. ${error}`);
        }
      };

      const handleSignOut = async () => {
        try {
          localStorage.clear();  
          window.location.reload();
          await auth.signOut();
        } catch (error) {
          // Handle sign out error
          console.error('Error signing out:', error);
        }
      };
      const logoutButtonStyles = {
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: '5px',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
      };
    return (
      <div className="loginSecttion">
    
        {!user ? (
          <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <GoogleButton onClick={handleSignInWithGoogle}/>
          </div>
        ) : (
          <button className="log-out-btn btn" onClick={handleSignOut}
          style={logoutButtonStyles} >
            Log Out
          </button>
        )}
         <p>
          {!user ? (
            <p></p>
          ) : (
            <strong>Logged in as: {user.displayName}</strong>
          )}
        </p>
         
      </div>
    );
  }