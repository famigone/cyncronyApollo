import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects.js';
import Project from './Project.jsx';
import ReactDOM from 'react-dom';

class ProjectNew extends Component {
  handleSubmit(event) {
     event.preventDefault();

     // Find the text field via the React ref
     const codigo = ReactDOM.findDOMNode(this.refs.codigoInput).value.trim();
     const nombre = ReactDOM.findDOMNode(this.refs.nombreInput).value.trim();

     Projects.insert({
       codigo,
       nombre,
       createdAt: new Date(), // current time
     });

     // Clear form
     ReactDOM.findDOMNode(this.refs.codigoInput).value = '';
     ReactDOM.findDOMNode(this.refs.textInput).value = '';
   }

  renderProjects() {
     return this.props.projects.map((project) => (
       <Project key={project._id} project={project} />
     ));
   }

   renderForm() {
     return (

      <div className="col-xs-11">
       <div className="box box-solid">
         <div className="box-body">
              <form className="form" onSubmit={this.handleSubmit.bind(this)} >
                  <div className="row">
                          <div className="col-xs-2">
                              <input
                                className = "form-control input-sm"
                                type="text"
                                ref="codigoInput"
                                placeholder="Código del Proyecto"
                              />
                          </div>
                          <div className="col-xs-6">
                              <input
                                className = "form-control input-sm"
                                type="text"
                                ref="nombreInput"
                                placeholder="Título"
                              />
                           </div>
                </div>
              </form>
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

 ProjectNew.propTypes = {

   projects: PropTypes.array.isRequired,
 };

 export default createContainer(() => {
   Meteor.subscribe('projects');
   return {
     projects: Projects.find({}).fetch(),
   };
 }, ProjectNew);
