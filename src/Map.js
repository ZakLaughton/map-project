import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const styles = [
  {
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#242f3e'
      }
    ]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#746855'
      }
    ]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#242f3e'
      }
    ]
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'administrative.locality',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#d59563'
      }
    ]
  },
  {
    'featureType': 'poi',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#d59563'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#263c3f'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#6b9a76'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#38414e'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#212a37'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#9ca5b3'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#746855'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#1f2835'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#f3d19c'
      }
    ]
  },
  {
    'featureType': 'transit',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'transit',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#2f3948'
      }
    ]
  },
  {
    'featureType': 'transit.station',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#d59563'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#17263c'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#515c6d'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#17263c'
      }
    ]
  }
];

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{lat: 30.542471, lng: -97.5516146}}
    defaultOptions={{
      styles,
      mapTypeControl: false,
      fullscreenControl: false }}
  >
    {props.restaurants &&
     props.restaurants
       .filter(restaurant => restaurant.isShowing)
       .map((marker, index) =>
         <Marker
           key={index}
           position={ marker.location }
           title={ marker.title }
           onClick={() => props.handleClick(marker)}>
           {marker.isSelected === true && (
             <InfoWindow>
               <div>
                <h2>{marker.title}</h2>
                <img src={ marker.photoURL }></img>
               </div>
             </InfoWindow>)}
         </Marker>
       )}
  </GoogleMap>
));

class Map extends React.Component {

  render() {
    return(
      <MyMapComponent
        isMarkerShown
        restaurants = { this.props.restaurants }
        handleClick = {this.props.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDhlOiZW9I8f9t6V5KzLbBbi1LKc-N7C38"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} className='map-loader' />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}

export default Map;