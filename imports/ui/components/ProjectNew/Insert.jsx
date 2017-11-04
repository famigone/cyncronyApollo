import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects.js';
import Alert from 'react-s-alert';

// Task component - represents a single todo item
export default class Insert extends Component {
  constructor({ initialChecked }) {
    super();
    this.state = { id: "" }
  }

 onClick(newState) {
    
    this.setState({ id: newState }); // we update our state
    this.props.callbackParent(newState); // we notify our parent    
    const pja = Projects.findOne(newState)
    Session.set( "projectActual", pja.codigo )

    Alert.info("Projecto Actual: <b>"
              + pja.codigo
              + '</b>', {
            position: 'bottom-right',
            effect: 'scale',
            //onShow: function () {//console.log('aye!')},
            beep: false,
            timeout: 3000,
            offset: 0
        });
    
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
