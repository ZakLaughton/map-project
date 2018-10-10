import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Sidebar from './Sidebar';

class App extends Component {
  state = {
    restaurants: [
      {title: 'Baked \'n Sconed',
       location: {lat: 30.5427284, lng: -97.55608029999999},
       type: 'cafe',
       showMarker: true},
      {title: 'Rio Grande Tex Mex',
       location: {lat: 30.5431313, lng: -97.55684219999999},
       type: 'restaurant',
       showMarker: true},
      {title: 'The Downtown Hall of Fame',
       location: {lat: 30.5442963, lng: -97.54738239999999},
       type: 'restaurant',
       showMarker: true},
      {title: 'Hit the Spot Cafe',
       location: {lat: 30.5422514, lng: -97.5454403},
       type: 'cafe',
       showMarker: true},
      {title: 'Snuffy\'s',
       location: {lat: 30.5431014, lng: -97.54771359999999},
       type: 'bar',
       showMarker: true},
      {title: 'Texan Cafe',
       location: {lat: 30.5443816, lng: -97.54751309999999},
       type: 'cafe',
       showMarker: true}
    ],
    showingRestaurants: []
  }

  hideAllMarkers = () => {
    this.setState({ showingRestaurants: [] })
  }

  componentDidMount() {
    let showingRestaurants = this.state.restaurants.filter(restaurant => restaurant.showMarker === true)
    this.setState({ showingRestaurants: showingRestaurants })
  }

  updateSearchResults = (query) => {
    let upperQuery = query.toUpperCase()
    const results = this.state.restaurants
      .filter(restaurant => (
        restaurant.title.toUpperCase().indexOf(upperQuery) > -1
      ));
    this.setState({ showingRestaurants: results })
  }

  render() {
    const { restaurants, showingRestaurants } = this.state
    return (
      <div className="App">
        <Sidebar
          updateSearchResults={ this.updateSearchResults }
          restaurants={ restaurants }
          showingRestaurants={ showingRestaurants }/>
        <Map showingRestaurants={ showingRestaurants } />
      </div>
    );
  }
}

export default App;
