import React, { Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects.js';
import Insert from './Insert.jsx';
import ProjectForm from './ProjectForm.jsx';
import ProjectFormUpdate from './ProjectFormUpdate.jsx';
import ProjectFormUpdateContainer from './ProjectFormUpdateContainer.jsx';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6
import TableProject from './TableProject.jsx';
//import TableProject from '../../containers/TableProject.js';

export default class ProjectInsert extends Component {

 constructor(props) {
    super(props);
    this.state = {      
      pid: "",
   
    };
  }

  onChildChanged(newState){
    this.setState({
      pid:newState
    });    
  }

  
   renderForm() {
     return (
       <ProjectForm/>
       )
   }

renderUpdate(pid) {
     return (

       <ProjectFormUpdateContainer key1={pid}/>
       )
   }



renderTabla(){
  return(
    <TableProject callbackParent={(newState) => this.onChildChanged(newState) }/>
  )}
   render() {
     return (
       <div className="container">
          <div className="row">
            <section className="content-header">
              <h3>
                PROYECTO
                <small> Ingrese los datos del nuevo proyecto</small>
              </h3>
            </section>
                 {this.renderForm()}
                 {this.renderUpdate(this.state.pid)}
                 {this.renderTabla()} 
                 
         </div>
      </div>
     );
   }

 }

 ProjectInsert.propTypes = {

   projects: React.PropTypes.array,
   
 };

 /*export default createContainer(() => {
   Meteor.subscribe('projects');
   return {
     projects: Projects.find({}, { limit: 10, sort: { createdAt: -1 } }).fetch(),
   };
 }, ProjectInsert);
*/