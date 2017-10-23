import React, { Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects.js';
import Insert from './Insert.jsx';
import ProjectForm from './ProjectForm.jsx';
import ProjectFormUpdate from './ProjectFormUpdate.jsx';
import ProjectFormUpdateContainer from './ProjectFormUpdateContainer.jsx';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6

class ProjectInsert extends Component {

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

  renderProjects() {
     return this.props.projects.map((project) => (
       <Insert 
          key={project._id} 
          project={project} 
          callbackParent={(newState) => this.onChildChanged(newState) }
      />
     ));
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
    <div className="col-md-11">
<div className="box box-solid">
        <div className="box-header">

      

            <div className="box-body table-responsive no-padding">
             <table className="table table-hover">
               <tbody>
                 <tr>
                   <th>Código</th>
                   <th>Proyecto</th>
                 </tr>

                    {this.renderProjects()}

               </tbody>
               </table>
             </div>
</div>
</div>

</div>

  )
}
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

 export default createContainer(() => {
   Meteor.subscribe('projects');
   return {
     projects: Projects.find({}, { limit: 10, sort: { createdAt: -1 } }).fetch(),
   };
 }, ProjectInsert);
