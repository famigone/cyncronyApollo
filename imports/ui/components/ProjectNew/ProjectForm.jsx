import React, { Component } from 'react'; import PropTypes from 'prop-types';
// ES6 import { withTracker } from 'meteor/react-meteor-data'; 
import ReactDOM from 'react-dom'; import { Projects } from '/imports/api/projects.js'; 
import CallOutMessage from '../warnings/callout_message';

// Task component - represents a single todo item
export default class ProjectForm extends Component {
  constructor(){
    super();
    this.state = {            
      errorHay:false          ,
      errorMsg:"",      
      okHay:false
    };
  }
  handleSubmit(event) {
     event.preventDefault();


     const codigo = ReactDOM.findDOMNode(this.refs.codigoInput).value.trim();
     const nombre = ReactDOM.findDOMNode(this.refs.nombreInput).value.trim();

     const jecto = {codigo:codigo, nombre:nombre}
 
      Meteor.call('projects.insert', jecto, (error, response) => {
      if (error) {   
        console.log(error)   
        this.setState({errorMsg : error.reason, errorHay:true, okHay:false})        
      }
      else {
        this.setState({okHay:true, errorHay:false})
      }
    })
     // Clear form     
     ReactDOM.findDOMNode(this.refs.codigoInput).value = '';
     ReactDOM.findDOMNode(this.refs.nombreInput).value = '';
   }



  mostrarExito(){  
  let message = ""
  if (this.state.errorHay)  {
      message = <CallOutMessage description={this.state.errorMsg} color="callout callout-danger"/>;
    }
  if (this.state.okHay)   {
    message = <CallOutMessage description="El project fue agregado exitosamente!" color="callout callout-success"/>;  
  }
    return  message;
  }


  render() {
    return (
      <div className="col-xs-11">
       <div className="box box-solid">
        {this.mostrarExito()}
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
        <button type="submit" className="btn btn-sm btn-primary btn-flat"><i className="fa fa-check" aria-hidden="true"></i></button>
        </div>
        </form>
     </div>
   </div>

    );
  }
}
