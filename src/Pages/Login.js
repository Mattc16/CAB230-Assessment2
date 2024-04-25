import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://4.237.58.241:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    setMessage(data.message);
  };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>

        <header style={{ backgroundColor: '#3498db', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: '300', paddingLeft: '30px', margin: '0' }}>User Login</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/home" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Home</Link>
                <Link to="/volcano-list" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Volcano List</Link>
                <Link to="/register" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Register</Link>
            </div>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '20px', padding: '15px', paddingTop: '30px' }}>
        <label style={{ marginLeft: '20px' }}>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} style={{ fontSize: '20px', padding: '2px', marginLeft: '10px' }} />
        </label>
        <label style={{ marginLeft: '20px' }}>
            Password:
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} style={{ fontSize: '20px', padding: '2px', marginLeft: '10px' }} />
        </label>
        <button type="submit" style={{ fontSize: '20px', padding: '5px', width: '150px', marginLeft: '20px' }}>Login</button>
      </form>
      {message && <p style={{ marginLeft: '20px', color: 'red' }}>{message}</p>}

      <footer style={{ backgroundColor: '#00678B', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', position: 'fixed', left: '0', bottom: '0', width: '100%' }}>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', fontWeight: '300', margin: '0' }}>© 2024 Volcano Explorer</p>
        <div style={{ display: 'flex' }}>
          <span className="hover-text" style={{ fontSize: '16px', marginRight: '30px' }}>Privacy Policy</span>
          <span className="hover-text" style={{ fontSize: '16px', marginRight: '30px' }}>Terms of Service</span>
        </div>
      </footer>

      </div>
    );
};

export default Login;