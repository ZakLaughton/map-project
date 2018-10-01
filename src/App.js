import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap,  } from 'react-google-maps';
import './App.css';

const MainMap = withScriptjs(withGoogleMap((props) =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }} 
      />
    ))

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainMap
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDhlOiZW9I8f9t6V5KzLbBbi1LKc-N7C38&v=3'
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      
    );
  }
}

export default App;
