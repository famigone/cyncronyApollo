import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Insert extends Component {
  render() {
    return (
      <tr>
      <td>{this.props.project.codigo}</td>
      <td>{this.props.project.nombre}</td>
    </tr>

    );
  }
}

Insert.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  project: PropTypes.object.isRequired,
};
