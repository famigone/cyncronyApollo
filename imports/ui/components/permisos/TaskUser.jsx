
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
    <tr key= {user._id} onClick={() => this.insert(user._id)}>
        <td>{user.username}</td>
    </tr>
     ));}


renderResponsables(){
 // const sub = Meteor.subscribe('users');
  return this.props.responsables.map((resp) => (
    <tr key= {resp._id} onClick={() => this.delete(resp._id)}>
        <td>{resp.username()}</td>
    </tr>
     ));}

insert(userId){
   const serto = {userId : userId, 
                  projectId : this.props.task.projectId,
                  activo: true,                
                      taskId : this.props.task._id}
    Meteor.call('taskUser.insert', serto, (error, response) => {      
            if (error) {console.log(error.reason)}
            //else {console.log("La tarea fue agregada")}    
            }) 

}

delete(taskUserId){
   const serto = {taskUserId : taskUserId, 
                  }
    Meteor.call('taskUser.delete', serto, (error, response) => {      
            if (error) {console.log(error.reason)}
            //else {console.log("borrrroooooo")}    
            }) 

}
 render() {

    return (
    	<div className="row">

        <div className="col-xs-6 text-center">
          <div className="box-body table-responsive">
             <table className="table table-hover">
               <tbody>
                 <tr>
                  <center> <th>Todos los Usuarios</th></center>
                 </tr>

                    {this.renderAllUser()}

               </tbody>
               </table>
              
             </div>
        </div>

        <div className="col-xs-6 text-center">
          <div className="box-body table-responsive">
             <table className="table table-hover">
               <tbody>
                 <tr>
                   <center><th>Responsables de la tarea</th></center>
                 </tr>

                    {this.renderResponsables()}

               </tbody>
               </table>
              
             </div>
        </div>
      </div>
    );
  }
}
export default TaskUserContainer = withTracker(({ task  } ) => {            
    const subb  = Meteor.subscribe('taskUser', task._id) 
     Meteor.subscribe('users');
    var isLoading = !(subb.ready());
   
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:")   }
    return {    
      isLoading,            
      task: task,
      users: Meteor.users.find().fetch(),
      responsables : TaskUser.find().fetch()
    };
  })(TaskUsers);
