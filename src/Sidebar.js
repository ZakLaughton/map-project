import React from 'react';

const Sidebar = ({ updateSearchResults, restaurants, showingRestaurants }) => (
  <div className='sidebar'>
    <h1>SIDEBAR</h1>
    <input type="text" id="restaurantFilter" onInput={(event) => updateSearchResults(event.target.value)}
 placeholder="Filter restaurants..." title="Type in a name"></input>
    <ul>
      { restaurants.map((restaurant, index) => (
        <li key={ index }>{restaurant.title}</li>
      ))}
    </ul>
  </div>
);

export default Sidebar;