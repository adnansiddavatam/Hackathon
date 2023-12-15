
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';  

export const AuthLogin = () => {
  const { onLogin } = UserAuth();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(email, password);
      router.push('/journal');
    } catch (error) {
      console.error('Login failed', error);
      window.alert(`Login failed: ${error.message}`);
    }
  };
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const inputStyle = {
    color: 'black',
    marginBottom: '10px',
    padding: '8px',
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
  };
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  };
  
  const logInTitleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
        <h3 style={logInTitleStyle}>Log In</h3>
      <form style={formStyle} onSubmit={handleSubmit}>
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
            <button type="submit" style={buttonStyle}>Login</button>
        </div>
      </form>
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
