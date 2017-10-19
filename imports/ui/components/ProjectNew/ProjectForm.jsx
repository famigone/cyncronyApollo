import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Projects } from '/imports/api/projects.js';


// Task component - represents a single todo item
export default class ProjectForm extends Component {
  handleSubmit(event) {
     event.preventDefault();

     // Find the text field via the React ref
     const codigo = ReactDOM.findDOMNode(this.refs.codigoInput).value.trim();
     const nombre = ReactDOM.findDOMNode(this.refs.nombreInput).value.trim();

     const jecto = {codigo:codigo, nombre:nombre}
     //console.log(Projects.schema.validate(jecto))
/*     Projects.insert({
       codigo,
       nombre,
       //createdAt: new Date(), // current time
     });
*/

 
   Meteor.call('projects.insert', jecto, (error, response) => {
      if (error) {
        console.log(error)
      }
    })



     // Clear form
     ReactDOM.findDOMNode(this.refs.codigoInput).value = '';
     ReactDOM.findDOMNode(this.refs.nombreInput).value = '';
   }

  render() {
    return (
      <div className="col-xs-11">
       <div className="box box-solid">
         <form className="form" onSubmit={this.handleSubmit.bind(this)} >
         <div className="box-body">
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


        </div>
        <div className="box-footer">
        <button type="submit" className="btn btn-sm btn-primary btn-flat">Guardar</button>
        </div>
        </form>
     </div>
   </div>

    );
  }
}
