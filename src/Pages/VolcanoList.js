import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'

function VolcanoList() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('Algeria');
    const [populatedWithin, setPopulatedWithin] = useState('');
    const [volcanoes, setVolcanoes] = useState([]);
    const navigate = useNavigate();

    const columnDefs = [
      { 
        headerName: "Name", 
        field: "name", 
        cellRendererFramework: params => {
          console.log(params.data);
          return <Link to={`/volcanoes/${params.data.id}`}>{params.value}</Link>
        },
        cellStyle: { textAlign: "center" },
        headerClass: "center-header"
      },
      { 
        headerName: "Region", 
        field: "region",
        cellStyle: { textAlign: "center" },
        headerClass: "center-header"
      },
      { 
        headerName: "Subregion", 
        field: "subregion",
        cellStyle: { textAlign: "center" },
        headerClass: "center-header"
      },
    ];

    const onCellClicked = (params) => {
      if (params.colDef.field === 'name') {
        navigate(`/volcanoes/${params.data.id}`);
      }
    };

    useEffect(() => {
        fetch('http://4.237.58.241:3000/countries')
        .then(response => response.json())
        .then(data => setCountries(data))
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`http://4.237.58.241:3000/volcanoes?country=${country}&populatedWithin=${populatedWithin}`);
        const data = await response.json();
        if (Array.isArray(data)) {
            setVolcanoes(data);
          } else {
            console.error('Server response is not an array:', data);
          }

        setVolcanoes(data);
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
        <header style={{ backgroundColor: '#3498db', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: '400', margin: '0' }}>Volcano Explorer</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/home" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Home</Link>
            <Link to="/register" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Register</Link>
            <Link to="/login" className="hover-text" style={{ fontSize: '20px', marginRight: '20px' }}>Login</Link>
          </div>
        </header>

      <div style={{ padding: '20px' }}>
        <div style={{ paddingBottom: '10px' }}>
          <form onSubmit={handleSubmit}>
            <select value={country} onChange={(event) => setCountry(event.target.value)}>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
            </select>
            <select value={populatedWithin} onChange={(event) => setPopulatedWithin(event.target.value)}>
              <option value="">Select populatedWithin value</option>
              <option value="5km">5km</option>
              <option value="10km">10km</option>
              <option value="30km">30km</option>
              <option value="100km">100km</option>
            </select>
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="ag-theme-alpine" style={{ height: '800px', width: '620px' }}>
          <AgGridReact
            suppressCellSelection={true}
            rowData={volcanoes}
            columnDefs={columnDefs}
            onCellClicked={onCellClicked}
          />
        </div>
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

export default VolcanoList;
