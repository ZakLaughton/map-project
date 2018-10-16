import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Sidebar from './Sidebar';

class App extends Component {
  state = {
    restaurants: [
      {title: 'Baked \'n Sconed',
       location: {lat: 30.5427284, lng: -97.55608029999999},
       locationID: '4c0ac9687e3fc9281f44f482',
       photoID: '',
       isShowing: true,
       isSelected: false},
      {title: 'Rio Grande Tex Mex',
       location: {lat: 30.5431313, lng: -97.55684219999999},
       locationID: '4c0ac9687e3fc9281f44f482',
       photoID: '',
       isShowing: true,
       isSelected: false},
      {title: 'The Downtown Hall of Fame',
       location: {lat: 30.5442963, lng: -97.54738239999999},
       locationID: '4c0ac9687e3fc9281f44f482',
       photoID: '',
       isShowing: true,
       isSelected: false},
      {title: 'Hit the Spot Cafe',
       location: {lat: 30.5422514, lng: -97.5454403},
       locationID: '4c0ac9687e3fc9281f44f482',
       photoID: '',
       isShowing: true,
       isSelected: false},
      {title: 'Snuffy\'s',
       location: {lat: 30.5431014, lng: -97.54771359999999},
       locationID: '4c0ac9687e3fc9281f44f482',
       photoID: '',
       isShowing: true,
       isSelected: false},
      {title: 'Texan Cafe',
       location: {lat: 30.5443816, lng: -97.54751309999999},
       locationID: '4c0ac9687e3fc9281f44f482',
       photoID: '',
       isShowing: true,
       isSelected: false}
    ]
  }

  setRestaurantPhotoIDs(restaurantID) {
    const clientID = 'SO0U3NLYRUSUMZ2IOLFIEWD2ZUNMIRCYJCC4C4ZYJRHMVWXV'
    const clientSecret = 'IL1XMEUV2KPD2134P50XWQXNS4H34CN4FWROMZ2TBFRZQDXJ'
    this.state.restaurants.map(restaurant => {
      const APIURL = `https://api.foursquare.com/v2/venues/${restaurant.locationID}?client_id=${clientID}&client_secret=${clientSecret}&v=20180323`
      fetch(APIURL)
        .then((response) => response.json())
        .then(data => {
          let photoID = data.response.venue.bestPhoto.id;
          restaurant.photoID = photoID;
          this.setState({restaurants: Object.assign(this.state.restaurants, restaurant)})
        }).catch(function() {
          console.log('FAIL!', data => data);
      })
    });
  }

  componentDidMount() {
    this.setRestaurantPhotoIDs();
  }

  updateSearchResults = (query) => {
    let upperQuery = query.toUpperCase()
    let results = this.state.restaurants
      .map((restaurant) => {
        if (restaurant.title.toUpperCase().indexOf(upperQuery) > -1) {
          restaurant.isShowing = true
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
