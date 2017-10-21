//import React, { PropTypes } from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
const AppHeaderNotificationMenuItem = ({ classNames, message }) => (
  <li>
    <a href="#">
      <i className={classNames} /> {message}
    </a>
  </li>
);

AppHeaderNotificationMenuItem.propTypes = {
  classNames: React.PropTypes.string,
  message: React.PropTypes.string,
};

export default AppHeaderNotificationMenuItem;
