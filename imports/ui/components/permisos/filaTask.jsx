
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FilaTask extends Component {
 render() {

    return (
      <tr>
      <td>{this.props.task.text}</td>
      <td>{this.props.task.text}</td>
    </tr>

    );
  }
}
