import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '/imports/api/tasks.js';
import Task from './Task.jsx';


class ListaTarea extends Component {


  renderTasks() {
     return this.props.tasks.map((task) => (
       <Task key={task._id} task={task} />
     ));
   }

   render() {
     return (
       <div className="container">
         <header>
           <h1>Todo List</h1>
         </header>

         <ul>
           {this.renderTasks()}
         </ul>
       </div>
     );
   }
 }

 ListaTarea.propTypes = {

   tasks: PropTypes.array.isRequired,
 };

 export default createContainer(() => {
   Meteor.subscribe('tasks');
   return {
     tasks: Tasks.find({}).fetch(),
   };
 }, ListaTarea);
