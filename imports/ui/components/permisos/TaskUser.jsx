
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TaskUser } from '/imports/api/taskUser.js';
import { withTracker } from 'meteor/react-meteor-data';

export class TaskUsers extends Component {

renderAllUser(){
  return this.props.users.map((user) => (
    <tr key= {user._id} onClick={() => this.open(task._id)}>
        <td>{user.username}</td>
    </tr>
     ));}

 render() {

    return (
    	<div className="row">
                  <div className="col-xs-6 text-center">
<div className="box-body table-responsive">
             <table className="table table-hover">
               <tbody>
                 <tr>
                   <th>Usuario</th>
                 </tr>

                    {this.renderAllUser()}

               </tbody>
               </table>
              
             </div>
</div></div>
    );
  }
}
export default TaskUserContainer = withTracker(({ task  } ) => {            
    const subb  = Meteor.subscribe('taskUser') 
     Meteor.subscribe('users');
    var isLoading = !(subb.ready());
   
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:")   }
    return {    
      isLoading,            
      task: task,
      users: Meteor.users.find().fetch(),
    };
  })(TaskUsers);
