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
import { ReactDOM } from 'react-dom';


class App extends Component {
  constructor(props) {    
    super(props);      
    if (!this.props.isLoding){
    this.state = {
      currentZoom: 'Days',
      messages: [],      
    };}    
    this.handleZoomChange = this.handleZoomChange.bind(this);
    this.logTaskUpdate = this.logTaskUpdate.bind(this);
    this.logTaskDelete = this.logTaskDelete.bind(this);
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
//    console.log("id "+taska._id)
//    console.log("id "+taska.id)
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
      id:Number(task.id) ,
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
      
  
// objeto con dos propiedades de tipo arreglo de objetos (una para task otra para links) 
    console.log("Pid:"+this.props.pid)  
    console.log("Sesion: "+Session.get("projectActualId"))
    console.log("State Tasks: "+this.state.tasks)
    console.log("Props Tasks: "+this.props.tasks)
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
            onTaskDeleted={this.logTaskDelete}
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
    const suba = Meteor.subscribe('tasks')
    var isLoading = !(subl.ready() && subp.ready() && suba.ready());            
    const pid = LastProject.findOne({userId: Meteor.userId()}).projectId
    return {
      tasks: Tasks.find({projectId:pid}).fetch(),      
      //propsTasks: Tasks.find({projectId:"cbMhMrswLDhKCgeyv"}).fetch(),      
      isLoading,
      //
      pid: Session.get("projectActualId"),
      
    };
  })(App);
