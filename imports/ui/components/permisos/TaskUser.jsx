
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TaskUser } from '/imports/api/taskUser.js';
import { withTracker } from 'meteor/react-meteor-data';

export class TaskUsers extends Component {
 render() {

    return (
      <tr>
      <td>{this.props.task.text}</td>
      <td>{this.props.task.text}</td>
    </tr>

    );
  }
}
export default TaskUserContainer = withTracker(({ task  } ) => {            
    const subb  = Meteor.subscribe('taskUser') 
    var isLoading = !(subb.ready());
   
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:")   }
    return {    
      isLoading,            
      task: task,
    };
  })(TaskUsers);
