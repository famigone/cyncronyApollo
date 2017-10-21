import React, { Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import { withTracker } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
export default class Project extends Component {
  render() {
    return (
      <tr>
      <td>dddd</td>
      <td>{this.props.project.text}</td>
    </tr>

    );
  }
}

Project.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  project: React.PropTypes.object.isRequired,
};
