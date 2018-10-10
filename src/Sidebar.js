import React from 'react';

const Sidebar = ({ hideAllMarkers }) => (
  <div className='sidebar'>
    <h1>SIDEBAR</h1>
    <input id="hide-markers" type="button" value="Hide Markers" onClick={hideAllMarkers}></input>
  </div>
);

export default Sidebar;