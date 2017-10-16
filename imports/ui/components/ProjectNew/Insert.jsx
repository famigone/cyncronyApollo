import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Task component - represents a single todo item
export default class Insert extends Component {
  constructor({ initialChecked }) {
    super();
   // this.state = { id: "qhZ8fHk54ntyguRqz" }
  }

 onClick(newState) {
    
    this.setState({ id: newState }); // we update our state
    this.props.callbackParent(newState); // we notify our parent
  }

  render() {
    return (
      <tr onClick={() => this.onClick(this.props.project._id)}>
      <td>{this.props.project.codigo}</td>
      <td>{this.props.project.nombre}</td>
    </tr>

    );
  }
}

Insert.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  project: React.PropTypes.object,

};
