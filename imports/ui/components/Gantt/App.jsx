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
import { LastProject } from '/imports/api/lastProject';
import { Projects } from '/imports/api/projects';


let datal = {
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
    {id: 1, source: 1, target: 2, type: '1'}
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoom: 'Days',

      //messages: [],
      //pid: Session.get("projectActual")
    };

    this.handleZoomChange = this.handleZoomChange.bind(this);
    this.logTaskUpdate = this.logTaskUpdate.bind(this);
    this.logTaskDelete = this.logTaskDelete.bind(this);
    this.logLinkUpdate = this.logLinkUpdate.bind(this);

    

  }
  
  

  insertTask(taska){
  //console.log(taska)
          Meteor.call('tasks.insert', taska, (error, response) => {                 
          if (error) {console.log(error)}                    
          else{Alert.info("La tarea fue agregada!", {
            position: 'bottom-right',
            effect: 'scale',
            //onShow: function () {//console.log('aye!')},
            beep: false,
            timeout: 3000,
            offset: 0
        });}
          })          
        }
          
  

  updateTask(taska){

    console.log("id "+taska.id)

//    console.log("PIN "+taska.projectId)
    Meteor.call('tasks.update', taska, (error, response) => {                          
           if (error) {console.log(error)}          
           else {
            Alert.info("La tarea fue modificada!", {
            position: 'bottom',
            effect: 'scale',
            //onShow: function () {//console.log('aye!')},
            beep: false,
            timeout: 3000,
            offset: 0
        }); 
           } 
          })
            
  }

  
logTaskDelete (id, mode){
      taska = {
        id:id,
        projectId : this.props.pid
      }
      Meteor.call('tasks.delete', taska, (error, response) => {                          
           if (error) {console.log(error)}          
           else {
            Alert.info("La tarea fue eliminada!", {
            position: 'bottom',
            effect: 'scale',
            //onShow: function () {//console.log('aye!')},
            beep: false,
            timeout: 3000,
            offset: 0
        }); 
           } 
          })
}

/*componentWillUnmount(){
  console.log("desmontoooooooo")
  this.props.tasks = null
}*/

  logTaskUpdate(id, mode, task) {
    const taska = {      
      text:task.text, 
      start_date:task.start_date ,
      duration:Number(task.duration) ,
      progress:Number(task.progress) || 0, //si es nulo le clava un cero!
      parent:Number(task.parent) ,
      //id:Number(task.id) ,
      projectId: this.props.pid, 
      activo: task.activo||true, 
      id: task.id, 

    }
    //if (!this.props.isLoading) console.log(this.props.pid)
    //console.log(Session.get("projectActual"))
    var alerta= ''; 
    switch(mode) { 
        case 'inserted': { 
          this.insertTask(taska)
          break; 
        } 
        case 'updated': {          
          this.updateTask(taska)
          break;  
        }  
        case 'deleted': {
        
        break;  
        }        
    }

    

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
  
  configurarGantt(){
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
             // console.log(id)
              browserHistory.push('/dashboard/projectinsert')
              //gantt.updateTask(id)
              gantt.hideLightbox();


              //this.props.history.push('/some/path')
              //gantt.getTask(id).progress = 1;
              //gantt.updateTask(id);
              //gantt.hideLightbox();
          }
      });
  }


  render() {
     const { isLoading,  } = this.props;
      if (isLoading) {    
        return (
          <LoadingSpinner/>
        )
      }  
    //console.log(this.props.tasks)
    this.configurarGantt()    
    //console.log("Pid: "+this.props.pid)    
    //console.log(this.props.tasks)    
  
// objeto con dos propiedades de tipo arreglo de objetos (una para task otra para links) 
    let data = {data: this.props.tasks, 
               links: [{id: 1, source: 1, target: 2, type: '1'}]
                }
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
            //onTaskDeleted={this.logTaskDelete}
            onLinkUpdated={this.logLinkUpdate}
          />
        </div>
         {/*<MessageArea messages={this.state.messages}/> */}
      </div>
    );
  }
}

export default AppContainer = withTracker(() => {      
    
    const subl = Meteor.subscribe('lastProject')
    const subp = Meteor.subscribe('projects')    
    const suba = Meteor.subscribe('tasks', LastProject.findOne({userId: Meteor.userId()}).projectId)
    pid = LastProject.findOne({userId: Meteor.userId()}).projectId
    var isLoading = !(subl.ready() && subp.ready() && suba.ready());            
    //if (!isLoading) {console.log("Recalculando con " + Session.get("projectActual"))}//LastProject.findOne({userId: Meteor.userId()}).codigo)}    
    return {
      tasks: Tasks.find({projectId:pid}).fetch(),
      isLoading,      
      pid: pid,
      
    };
  })(App);
