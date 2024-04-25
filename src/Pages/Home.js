import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import image1 from './assets/images/image1.jpg';
import image2 from './assets/images/image2.jpeg';
import image3 from './assets/images/image3.jpg';
import image4 from './assets/images/image4.jpeg';
import image5 from './assets/images/image5.jpg';


function Home() {
    const images = [
        {
          src: image1,
          caption: 'Caption 1',
        },
        {
          src: image2,
          caption: 'Caption 2',
        },
        {
          src: image3,
          caption: 'Caption 3',
        },
        {
          src: image4,
          caption: 'Caption 4',
        },
        {
          src: image5,
          caption: 'Caption 5',
        }
      ];
    
      const [currentSlide, setCurrentSlide] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);
    
      const handleDotClick = (index) => {
        setCurrentSlide(index);
      };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
        
      <header style={{ backgroundColor: '#3498db', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: '300', paddingLeft: '30px', margin: '0' }}>Volcano Explorer</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/volcano-list" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Volcano List</Link>
        <Link to="/register" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Register</Link>
        <Link to="/login" className="hover-text" style={{ fontSize: '20px' }}>Login</Link>
        </div>
      </header>

      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', transition: 'transform 0.5s', transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} style={{ width: '100%', flex: '0 0 auto', textAlign: 'center', position: 'relative' }}>
              <img src={image.src} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '400px', margin: '0 auto' }} />
              <div style={{ marginTop: '10px', marginBottom: '40px' }}>
                <p>{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center' }}>
          {images.map((_, dotIndex) => (
            <div key={dotIndex} style={{ width: '10px', height: '10px', backgroundColor: currentSlide === dotIndex ? '#333' : '#ccc', borderRadius: '50%', margin: '0 5px', cursor: 'pointer' }} onClick={() => handleDotClick(dotIndex)} />
          ))}
        </div>
      </div>
      </div>

    <footer style={{ backgroundColor: '#00678B', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
      <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', fontWeight: '300', margin: '0' }}>© 2024 Volcano Explorer</p>
      <div style={{ display: 'flex' }}>
        <span className="hover-text" style={{ fontSize: '16px', marginRight: '30px' }}>Privacy Policy</span>
        <span className="hover-text" style={{ fontSize: '16px' }}>Terms of Service</span>
      </div>
    </footer>

    </div>
    );
}

export default Home;