/* global google */

import React from 'react';

class Map extends React.Component {
  state = {
    locations: [
      {title: 'Baked \'n Sconed', location: {lat: 30.5427284, lng: -97.55608029999999}},
      {title: 'Rio Grande Tex Mex', location: {lat: 30.5431313, lng: -97.55684219999999}},
      {title: 'The Downtown Hall of Fame', location: {lat: 30.5442963, lng: -97.54738239999999}},
      {title: 'Hit the Spot Cafe', location: {lat: 30.5422514, lng: -97.5454403}},
      {title: 'Snuffy\'s', location: {lat: 30.5431014, lng: -97.54771359999999}},
      {title: 'Texan Cafe', location: {lat: 30.5443816, lng: -97.54751309999999}}
    ]
  }
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
    const { locations } = this.state;
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {lat: 30.542471, lng: -97.5516146}
      });
      locations.map((location, index) => {
        let position = location.location;
        let title = location.title;

        let marker = new google.maps.Marker({
          position: position,
          title: title,
          map: map,
          animation: google.maps.Animation.DROP,
          id: index
        });
      })
    });
  }

  render() {
    return (
      <div className='map-container'>
        <div id='map' style={{width: '100%', height: '100%'}}></div>
      </div>
    );
  }
}

export default Map;