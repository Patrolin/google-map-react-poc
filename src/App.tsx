import React from 'react';
import { MapWithRoute } from './MapWithRoute';
import './App.css';


function App() {
  return (
    <div className="App">
      <MapWithRoute
        googleMapURL="https://maps.googleapis.com/maps/api/js"
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100vh" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        path={[
          { lat: -34.397, lng: 150.644 },
          { lat: -34.396, lng: 150.644 }
        ]}
        pathColor={"#f00"}
      />
    </div>
  );
}

export default App;
