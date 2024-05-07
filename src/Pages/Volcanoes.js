import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Map, Marker } from 'pigeon-maps';
import { Chart, BarController, CategoryScale, BarElement, Title, Tooltip, Legend, LogarithmicScale } from 'chart.js';

Chart.register(LogarithmicScale, BarController, CategoryScale, BarElement, Title, Tooltip, Legend);

function Volcanoes() {
  const { id } = useParams();
  const [volcano, setVolcano] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`http://4.237.58.241:3000/volcano/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
    })
    .then(response => response.json())
    .then(data => setVolcano(data));
  }, [id]);

  useEffect(() => {
    let myChart;
  
    if (chartRef.current && volcano) {
      if (typeof myChart !== "undefined") myChart.destroy();
  
      const labels = ['5km', '10km', '30km', '100km'];
      const dataValues = [volcano.population_5km, volcano.population_10km, volcano.population_30km, volcano.population_100km];
  
      const data = {
        labels: labels,
        datasets: [{
          label: 'Population Density',
          data: dataValues,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        }]
      };
  
      const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              type: 'logarithmic',
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Population Density'
            }
          }
        },
      };
  
      myChart = new Chart(chartRef.current, config);
    }
  
    return () => {
      if (typeof myChart !== "undefined") myChart.destroy();
    };
  }, [volcano]);

  return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>

        <header style={{ backgroundColor: '#3498db', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: '300', paddingLeft: '30px', margin: '0' }}>
              {volcano ? volcano.name : ''}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/volcano-list" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Back</Link>
          </div>
        </header>

        <div style={{ padding: '25px', display: 'flex' }}>
        {volcano ? (
            <div style={{ flex: '1' }}>
              <div><b style={{ fontSize: '18px' }}>Country:</b></div>
              <p style={{ marginTop: '5px' }}>{volcano.country}</p>
              <div><b style={{ fontSize: '18px' }}>Region:</b></div>
              <p style={{ marginTop: '5px' }}>{volcano.region}</p>
              <div><b style={{ fontSize: '18px' }}>Subregion:</b></div>
              <p style={{ marginTop: '5px' }}>{volcano.subregion}</p>
              <div><b style={{ fontSize: '18px' }}>Last eruption:</b></div>
              <p style={{ marginTop: '5px' }}>{volcano.last_eruption}</p>
              <div><b style={{ fontSize: '18px' }}>Summit:</b></div>
              <p style={{ marginTop: '5px' }}>{volcano.summit}</p>
              <div><b style={{ fontSize: '18px' }}>Elevation:</b></div>
              <p style={{ marginTop: '5px' }}>{volcano.elevation}</p>
            </div>
           ) : (
             <p>Loading...</p>
           )}
          {volcano && (
              <div style={{ flex: '1' }}>
                <Map height={450} width={450} defaultCenter={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]} defaultZoom={2}>
                  <Marker anchor={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]} />
                </Map>
              </div>
          )}
        </div>

        { /* bar chart goes here */ }
        <div style={{ flex: '1', padding: '25px' }}>
          <canvas ref={chartRef} />
        </div>
        

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

export default Volcanoes;