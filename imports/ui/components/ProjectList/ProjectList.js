import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Project } from '/imports/api/projects.js';
import Project from './Project.jsx';


class ProjectList extends Component {


  renderProjects() {
     return this.props.projects.map((project) => (
       <Project key={project._id} project={project} />
     ));
   }

   render() {
     return (
       <div className="container">
         <header>
           <h3>Proyecto</h3>
         </header>

         <ul>
           {this.renderProjects()}
         </ul>
       </div>
     );
   }

 }

 ProjectList.propTypes = {

   projects: PropTypes.array.isRequired,
 };

 export default createContainer(() => {
   Meteor.subscribe('projects');
   return {
     projects: Projects.find({}).fetch(),
   };
 }, ProjectList);
