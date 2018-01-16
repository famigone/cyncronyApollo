import React from 'react';
import PropTypes from 'prop-types'; // ES6

const CallOutMessage = ({ title, description, color }) => (
  
  <div className={color}>
    {title && <h4>{title}</h4>}
    <p>{description}</p>
  </div>
);

CallOutMessage.propTypes = {
  title: React.PropTypes.string,
  description:React.PropTypes.string,
  color: React.PropTypes.string,
};

export default CallOutMessage;
