import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Sidebar from './Sidebar';

class App extends Component {
  state = {
    restaurants: [
      {title: 'Baked \'n Sconed',
       location: {lat: 30.5427284, lng: -97.55608029999999},
       isSelected: false},
      {title: 'Rio Grande Tex Mex',
       location: {lat: 30.5431313, lng: -97.55684219999999},
       isSelected: false},
      {title: 'The Downtown Hall of Fame',
       location: {lat: 30.5442963, lng: -97.54738239999999},
       isSelected: false},
      {title: 'Hit the Spot Cafe',
       location: {lat: 30.5422514, lng: -97.5454403},
       isSelected: false},
      {title: 'Snuffy\'s',
       location: {lat: 30.5431014, lng: -97.54771359999999},
       isSelected: false},
      {title: 'Texan Cafe',
       location: {lat: 30.5443816, lng: -97.54751309999999},
       isSelected: false}
    ],
    showingRestaurants: []
  }

  isShowingRestaurant = (restaurantTitle) => {
    for(let restaurant of this.state.showingRestaurants) {
      if (restaurantTitle === restaurant.title) {return true;}
    }
    return false;
  }

  componentDidMount() {
    // Show all restaurant markers on map at first load
    let showingRestaurants = this.state.restaurants
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

  unselectAllRestaurants = () => {
    let unselectedRestaurants = this.state.restaurants.map((restaurant) => {
      restaurant.isSelected = false;
      return restaurant;
    })
    this.setState({ restaurants: unselectedRestaurants })
  }

  handleClick = (restaurant) => {
    this.unselectAllRestaurants()
    restaurant.isSelected = true;
    this.setState({restaurants: Object.assign(this.state.restaurants, restaurant)})
  }

  render() {
    const { restaurants, showingRestaurants } = this.state
    return (
      <div className="App">
        <Sidebar
          updateSearchResults={ this.updateSearchResults }
          isShowingRestaurant={ this.isShowingRestaurant }
          restaurants={ restaurants }
          showingRestaurants={ showingRestaurants }
          handleClick={ this.handleClick }/>
        <Map
          showingRestaurants={ showingRestaurants }
          handleClick={ this.handleClick }/>
      </div>
    );
  }
}

export default App;
