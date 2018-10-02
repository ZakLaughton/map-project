/* global google */

import React from 'react';

class Map extends React.Component {
  getGoogleMaps() {
  // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);
          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement('script');
        const API = 'AIzaSyDhlOiZW9I8f9t6V5KzLbBbi1LKc-N7C38';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {
      const uluru = {lat: -25.363, lng: 131.044};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
      });
      const marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    });
  }

  render() {
    return (
      <div class='map-container'>
        <div id='map' style={{width: '100%', height: '100%'}}></div>
      </div>
    );
  }
}

export default Map;