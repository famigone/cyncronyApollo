import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { Projects } from '/imports/api/projects.js';
import PropTypes from 'prop-types'; // ES6
import { withTracker } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
export default class ProjectFormUpdate extends Component {

  
  handleSubmit(event){
        event.preventDefault();
        event.stopPropagation();
      // Here we do a "direct update" from the client instead of using a method
    const inputValues = {
      codigo: this.refs.codigoInput.value,
      nombre: this.refs.nombreInput.value,      
    }
    Projects.update({_id: this.props.oneProject._id}, {$set: inputValues}, (error, response) => {
      if (error) {
        console.log(error)
      }
      
    })

  }


    constructor(props) {
        super(props);        
        if (!props.isLoading){
        this.state = {      
          codigo: props.oneProject.codigo,
          nombre: props.oneProject.nombre}       
        }
        else{
          this.state = {      
          codigo: '',
          nombre: ''}    
        }  
      }



componentWillReceiveProps(nextProps){
   if (!this.props.isLoading){        
        this.state = {      
          codigo: nextProps.oneProject.codigo,
          nombre: nextProps.oneProject.nombre}       
        } 
}

  render() {

   const { oneProject, isLoading } = this.props;

  if (isLoading) {
    return (
      <div>isLoading == true</div>
    )
  }

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
                                value = {this.state.codigo}                                
                                onChange={(event) => this.setState({codigo: event.target.value})}
                              />
                          </div>
                          <div className="col-xs-6">
                              <input
                                className = "form-control input-sm"
                                type="text"
                                ref="nombreInput"
                                placeholder="Título"
                                value = {this.state.nombre}
                                onChange={(event) => this.setState({nombre: event.target.value})}
                              />
                           </div>
                </div>


        </div>
        <div className="box-footer">
        <button type="submit" onSubmit={this.handleSubmit.bind(this)} className="btn btn-sm btn-primary btn-flat">Guardar</button>
        </div>
        </form>
     </div>
   </div>

    );
  }
 
}

ProjectFormUpdate.propTypes = {
  oneProject: React.PropTypes.object,   
  isLoading: React.PropTypes.bool, 
};

