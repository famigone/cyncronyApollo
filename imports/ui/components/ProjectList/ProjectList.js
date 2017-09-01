import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects.js';
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
           <h3>Tus Proyectos</h3>
         </header>
         <div className="row">
                 <div className="col-md-11">
         <div className="box box-solid">
                     <div className="box-header">


                         <div className="box-body no-padding">
                            <table className="table">
                              <tr>
                                <th>Código</th>
                                <th>Proyecto</th>
                              </tr>

                                 {this.renderProjects()}


                            </table>
                          </div>
          </div>
         </div>

       </div>
       </div>
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
