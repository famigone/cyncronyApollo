import React, { Component } from 'react';
import Gantt from './Gantt';
import Toolbar from './Toolbar';
import MessageArea from './MessageArea';
import { Tasks } from '../../../api/tasks.js'
import './App1.css';
import Alert from 'react-s-alert';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../controls/LoadingSpinner';


let data = {
  data: [
    {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
    {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 4, progress: 0.4},
    {id: 3, text: 'Task #1', start_date: '19-04-2017', duration: 6, progress: 0.6},
    {id: 4, text: 'Task #2', start_date: '21-04-2017', duration: 7, progress: 0.4},
    {id: 5, text: 'Task #1', start_date: '25-04-2017', duration: 2, progress: 0.6},
    {id: 6, text: 'Task #2', start_date: '28-04-2017', duration: 9, progress: 0.4},
    {id: 7, text: 'Task #1', start_date: '31-04-2017', duration: 3, progress: 0.6},
    {id: 8, text: 'Task #2', start_date: '01-05-2017', duration: 5, progress: 0.4},
  ],
  links: [
    {id: 1, source: 1, target: 2, type: '0'}
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoom: 'Days',
      messages: []
    };

    this.handleZoomChange = this.handleZoomChange.bind(this);
    this.logTaskUpdate = this.logTaskUpdate.bind(this);
    this.logLinkUpdate = this.logLinkUpdate.bind(this);
  }
  
  addMessage(message) {
    var messages = this.state.messages.slice();
    var prevKey = messages.length ? messages[0].key: 0;

    messages.unshift({key: prevKey + 1, message});
    if(messages.length > 40){
      messages.pop();
    }
    this.setState({messages});
  }




  logTaskUpdate(id, mode, task) {

    let text = task && task.text ? ` (${task.text})`: '';
    //let message = `Task ${mode}: ${id} ${text}`;
    //this.addMessage(message);
    let message = 
      ' Duración: '+ task.duration
    + ' Nombre: '  + task.text 
    + ' Inicio: '  + task.start_date 
    + ' Id: '      + task.id 
    + ' Avance: '  + task.progress 
    + ' Padre: '   + task.parent 
    + ' Modo: '    + mode  //inserted updated deleted


    //this.addMessage(message);

    const taska = {      
      nombre:task.text, 
      inicio:task.start_date ,
      duracion:Number(task.duration) ,
      avance:Number(task.progress) ,
      parentId:Number(task.parent) ,
      orden:Number(task.id) 
    }
    var alerta= ''; 
    switch(mode) { 
        case 'inserted': { 
          Meteor.call('tasks.insert', taska, (error, response) => {      
           alerta = "La tarea se agregó correactamente" 
          /*if (error) {this.addMessage(error.reason)
            console.log(error)}
          else {this.addMessage("La Tarea se agregado correctamente")}  */
          if (error) {alerta= error.reason}
          else {alerta = "La tarea fue agregada"}    
          })          
          Alert.info("La tarea fue agregada!", {
            position: 'bottom-right',
            effect: 'scale',
            //onShow: function () {//console.log('aye!')},
            beep: false,
            timeout: 3000,
            offset: 0
        });
        break; 
        } 
        case 'updated': {          
          Meteor.call('tasks.insert', taska, (error, response) => {                
          if (error) {alerta= error.reason}
          else {alerta = "La tarea fue modificada"}    
          })
            Alert.info("La tarea fue modificada!", {
            position: 'bottom',
            effect: 'scale',
            //onShow: function () {//console.log('aye!')},
            beep: false,
            timeout: 3000,
            offset: 0
        });
        break;  
        }  
        case 'deleted': {
          Meteor.call('tasks.insert', taska, (error, response) => {      
          if (error) {alerta= error.reason}
          else {alerta = "La tarea se fue eliminada"}    
          })
          Alert.info("La tarea fue eliminada!", {
            position: 'bottom-right',
            effect: 'scale',
            //onShow: function () {//console.log('aye!')},
            beep: false,
            timeout: 3000,
            offset: 0
        });
        break;  
        }        
    }

     

  
/*if (Tasks.insert({task})) {
    this.addMessage("pinchooooooo")
    console.log("pinchooooooo")
  }
else {
  this.addMessage("insertazo")
}  
*/

 }
  logLinkUpdate(id, mode, link) {
    let message = `Link ${mode}: ${id}`;
    if (link) {
      message += ` ( source: ${link.source}, target: ${link.target} )`;
    }
    this.addMessage(message)
  }

  handleZoomChange(zoom) {
    this.setState({
      currentZoom: zoom
    });
  }  
  
  botonVer(){

  }


  render() {
     const { isLoading } = this.props;
      if (isLoading) {    
        return (
          <LoadingSpinner/>
        )
      }  
    gantt.config.buttons_left=["dhx_save_btn","dhx_cancel_btn","dhx_delete_btn"];    
    gantt.config.buttons_right = ["complete_button","go_task_btn"];
    gantt.locale.labels["go_task_btn"] = 'VER';
    gantt.locale.labels["complete_button"] = "COMPLETAR";
    gantt.attachEvent("onLightboxButton", function(button_id, node, e){
       if(button_id == "complete_button"){
              var id = gantt.getState().lightbox;
              gantt.getTask(id).progress = 1;
              gantt.updateTask(id);
              gantt.hideLightbox();
        }

          if(button_id == "go_task_btn"){
              var id = gantt.getState().lightbox;
              console.log(id)
              browserHistory.push('/dashboard/projectinsert')
              //gantt.updateTask(id)
              gantt.hideLightbox();


              //this.props.history.push('/some/path')
              //gantt.getTask(id).progress = 1;
              //gantt.updateTask(id);
              //gantt.hideLightbox();
          }
      });

    return (

      <div>
        <Toolbar
            zoom={this.state.currentZoom}
            onZoomChange={this.handleZoomChange}
        />
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={this.state.currentZoom}
            onTaskUpdated={this.logTaskUpdate}
            onLinkUpdated={this.logLinkUpdate}
          />
        </div>
         {/*<MessageArea messages={this.state.messages}/> */}
      </div>
    );
  }
}

export default AppContainer = withTracker(() => {      
   const suba = Meteor.subscribe('tasks');
   var isLoading = !suba.ready();
   return {
     tasks: Tasks.find({}, {           
           sort: { orden: -1 } }).fetch(),
     isLoading,
   };
  })(App);
