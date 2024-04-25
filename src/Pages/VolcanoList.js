import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function VolcanoList() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>

            <header style={{ backgroundColor: '#3498db', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: '300', paddingLeft: '30px', margin: '0' }}>Volcano List</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/home" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Home</Link>
                <Link to="/register" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Register</Link>
                <Link to="/login" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Login</Link>
                </div>
            </header>

            { /* content goes here */}
            
            <footer style={{ backgroundColor: '#00678B', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', position: 'fixed', left: '0', bottom: '0', width: '100%' }}>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', fontWeight: '300', margin: '0' }}>© 2024 Volcano Explorer</p>
                <div style={{ display: 'flex' }}>
                  <span className="hover-text" style={{ fontSize: '16px', marginRight: '30px' }}>Privacy Policy</span>
                  <span className="hover-text" style={{ fontSize: '16px', marginRight: '30px' }}>Terms of Service</span>
                </div>
            </footer>

        </div>
    );
}

export default VolcanoList;
