import React from 'react';

const Sidebar = ({ hideAllMarkers, restaurants, showingRestaurants }) => (
  <div className='sidebar'>
    <h1>SIDEBAR</h1>
    <input id="hide-markers" type="button" value="Hide Markers" onClick={hideAllMarkers}></input>
    <ul>
      { restaurants.map((restaurant, index) => (
        <li key={ index }>{restaurant.title}</li>
      ))}
    </ul>
  </div>
);

export default Sidebar;