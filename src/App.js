import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Sidebar from './Sidebar';

class App extends Component {
  state = {
    restaurants: [
      {title: 'Baked \'n Sconed',
       location: {lat: 30.5427284, lng: -97.55608029999999},
       locationID: '50a51f68e4b052be235c6b48',
       photoURL: '',
       isShowing: true,
       isSelected: false},
      {title: 'Rio Grande Tex Mex',
       location: {lat: 30.5431313, lng: -97.55684219999999},
       locationID: '4b807b5df964a520737630e3',
       photoURL: '',
       isShowing: true,
       isSelected: false},
      {title: 'The Downtown Hall of Fame',
       location: {lat: 30.5442963, lng: -97.54738239999999},
       locationID: '4eed4d025c5c794ad209d1fc',
       photoURL: '',
       isShowing: true,
       isSelected: false},
      {title: 'Hit the Spot Cafe',
       location: {lat: 30.5422514, lng: -97.5454403},
       locationID: '59b438210d173f341f23996d',
       photoURL: '',
       isShowing: true,
       isSelected: false},
      {title: 'Snuffy\'s',
       location: {lat: 30.5431014, lng: -97.54771359999999},
       locationID: '4c0ac9687e3fc9281f44f482',
       photoURL: '',
       isShowing: true,
       isSelected: false},
      {title: 'Texan Cafe',
       location: {lat: 30.5443816, lng: -97.54751309999999},
       locationID: '4b3fbf55f964a520ccad25e3',
       photoID: '',
       isShowing: true,
       isSelected: false}
    ]
  }

  setRestaurantPhotoURLs(restaurantID) {
    const clientID = 'SO0U3NLYRUSUMZ2IOLFIEWD2ZUNMIRCYJCC4C4ZYJRHMVWXV'
    const clientSecret = 'IL1XMEUV2KPD2134P50XWQXNS4H34CN4FWROMZ2TBFRZQDXJ'
    this.state.restaurants.map(restaurant => {
      const APIURL = `https://api.foursquare.com/v2/venues/${restaurant.locationID}?client_id=${clientID}&client_secret=${clientSecret}&v=20180323`
      fetch(APIURL)
        .then((response) => response.json())
        .then(data => {
          let photo = data.response.venue.bestPhoto;
          if (photo) {
            let photoURL = photo.prefix + 'height100' + photo.suffix
            restaurant.photoURL = photoURL;
            this.setState({restaurants: Object.assign(this.state.restaurants, restaurant)})
          }
        }).catch(function(error) {
          console.log(error);
        })
    });
  }

  componentDidMount() {
    this.setRestaurantPhotoURLs();
  }

  updateSearchResults = (query) => {
    let upperQuery = query.toUpperCase()
    let results = this.state.restaurants
      .map((restaurant) => {
        if (restaurant.title.toUpperCase().indexOf(upperQuery) > -1) {
          restaurant.isShowing = true;
        } else {
          restaurant.isShowing = false;
          restaurant.isSelected = false;
        }
        return restaurant;
      });
    this.setState({ restaurants: results })
  }

  unselectAllRestaurants = () => {
    let unselectedRestaurants = this.state.restaurants.map((restaurant) => {
      restaurant.isSelected = false;
      return restaurant;
    })
    this.setState({ restaurants: unselectedRestaurants })
  }

  handleClick = (restaurant) => {
    if (restaurant.isSelected) {
      restaurant.isSelected = false;
    } else {
      this.unselectAllRestaurants()
      restaurant.isSelected = true;
    }
    this.setState({restaurants: Object.assign(this.state.restaurants, restaurant)})
  }

  render() {
    const { restaurants, showingRestaurants } = this.state
    return (
      <div className="App">
        <Sidebar
          updateSearchResults={ this.updateSearchResults.bind(this) }
          restaurants={ restaurants }
          handleClick={ this.handleClick }/>
        <Map
          restaurants={ restaurants }
          handleClick={ this.handleClick }/>
      </div>
    );
  }
}

export default App;
