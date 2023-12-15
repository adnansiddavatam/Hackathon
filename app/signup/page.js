'use client'
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { useRouter } from 'next/navigation';  

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>{
        const user = userCredential.user;
        window.alert('User signed up successfully!'); 
        console.log(user);
      });
    } catch (error) {
      window.alert(` Sign up failed: ${error.message}`); 
      console.error("Sign up failed:", error.message);
    }
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
  };
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  };
  
  const inputStyle = {
    color: 'black',
    marginBottom: '10px',
    padding: '8px',
  };
  
  const signUpTitleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };
  
  return (
    <div style={containerStyle}>
      <h3 style={signUpTitleStyle}>Sign Up</h3>
      <div style={formStyle}>
        <div>
          <input
            style={inputStyle}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            style={inputStyle}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={signUp} style={buttonStyle}>Submit</button>
        </div>
      </div>
      <button
          onClick={() => {
            router.push('/');
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            borderRadius: '5px',
            color: 'white',
            border: '1px solid ',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
    </div>
  );
  
};
