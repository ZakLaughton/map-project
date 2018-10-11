import React from 'react';

const Sidebar = ({ updateSearchResults, restaurants, isShowing, handleClick }) => (
  <div className='sidebar'>
    <h1>Hutto Restaurants</h1>
    <input type="text" id="restaurantFilter" onInput={(event) => updateSearchResults(event.target.value)}
 placeholder="Filter restaurants..." title="Type in a name"></input>
    <ul>
      { restaurants.map((restaurant, index) => (
        <li
          key={ index }
          className={ (restaurant.isShowing) ? (restaurant.isSelected ? 'selected' : '') : 'inactive'}
          onClick={() => handleClick(restaurant)}>
          {restaurant.title}
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;