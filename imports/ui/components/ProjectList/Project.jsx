import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Project extends Component {
  render() {
    return (
      <li>{this.props.project.text}</li>
    );
  }
}

Project.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  project: PropTypes.object.isRequired,
};
