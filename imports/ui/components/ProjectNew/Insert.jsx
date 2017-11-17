import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects.js';
import Alert from 'react-s-alert';
import { LastProject } from '/imports/api/lastProject.js';
import { withTracker } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
 class Insert extends Component {
  constructor({ initialChecked }) {
    super();
    this.state = { id: "" }
  }

 setLastProject(pk){
     const { isLoading, project } = this.props;
  // veo si existe
  if (!isLoading){    
    let existe = LastProject.findOne({userId: Meteor.userId()})
  
    //console.log(existe)
    if ((existe)){
       //si ya existe update
      //console.log("va a actualizar")
      const ultimo = {newProjectId : pk}
                      //userId : Meteor.userId(),                 
                      //taskId : null
      Meteor.call('lastProject.updateLast', ultimo, (error, response) => {                
      if (error) {console.log(error.reason)}
            //else {console.log("todo un exito el update le puso:"+ultimo.projectId)}    
            })              
    }else{
     // console.log("va a insertar")
      const ultimo = {projectId : pk,                 
                      taskId : null}
      Meteor.call('lastProject.insert', ultimo, (error, response) => {      
            if (error) {console.log(error.reason)}
            //else {console.log("La tarea fue agregada")}    
            })              
  }  

  }
  

  

 }

notifyLastProject(pja){
  // alertamos que se seteó un nuevo proyecto
    Alert.info("Projecto Actual: <b>"
              + pja.codigo
              + '</b>', {
            position: 'bottom-right',
            effect: 'scale',
            //onShow: function () {//console.log('aye!')},
            beep: false,
            timeout: 3000,
            offset: 0
        });
}

 onClick(newState) {
    
    this.setState({ id: newState }); // we update our state
    this.props.callbackParent(newState); // we notify our parent    
    const pja = Projects.findOne(newState)
    Session.set( "projectActual", pja.codigo )
    Session.set( "projectActualId", pja.id )
    this.setLastProject(newState);
    this.notifyLastProject(pja);
    
    
  }

  render() {
    return (
      <tr onClick={() => this.onClick(this.props.project._id)}>
      <td>{this.props.project.codigo}</td>
      <td>{this.props.project.nombre}</td>
    </tr>

    );
  }
}

Insert.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  project: React.PropTypes.object,
  isLoading: React.PropTypes.bool,
};

export default InsertContainer = withTracker(({project}) => {      
    const sub = Meteor.subscribe('lastProject');            
    var isLoading = !sub.ready();    
    return {
        project,
        isLoading,
    };      
})(Insert);

  