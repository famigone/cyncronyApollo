import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects.js';
import { Tasks } from '/imports/api/tasks.js';
import { BoardCards } from '/imports/api/boardCards';
import { LastProject } from '/imports/api/lastProject';
import LoadingSpinner from '../controls/LoadingSpinner';
import {FilaTask} from './filaTask'
import TaskUserContainer from './TaskUser'
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Popover, Tooltip, OverlayTrigger, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';

export class Permisos extends Component {

 constructor() {
    super();
    //console.log(this.props)    
    this.state = { showModal: false,
    			   tid:null 
    			};
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)


  }


  close() {
    this.setState({ showModal: false });    
  }

  open(tid) {
    this.setState({ showModal: true, tid:tid });
  }


renderModal(){
	if (this.state.showModal){
    const taska= Tasks.findOne(this.state.tid)
    console.log(this.state.tid)
    return(
    <Modal show={this.state.showModal} onHide={this.close}>
       
          <Modal.Header closeButton>
            <Modal.Title>{taska.text}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
         <div className="box-body">                              
                             

          <TaskUserContainer task={taska}/>  

        </div>
        <div className="box-footer">
      
        </div>        
          </Modal.Body>
          <Modal.Footer>
           
            <Button onClick={this.close} className="btn btn-sm btn-primary btn-flat"><i className="fa fa-times" aria-hidden="true"></i></Button>
          </Modal.Footer>
        
        </Modal>
        )
  }}

renderTasks(){
  return this.props.tasks.map((task) => (
    <tr key= {task._id} onClick={() => this.open(task._id)}>
        <td>{task.text}</td>
        <td>{moment(task.start_date).format("DD/MM/YY")}</td>
    </tr>
     ));}

renderTabla(){
	return(
<div>		
<div className="col-md-11">
	<div className="box box-solid">
        <div className="box-header">
          <h3 className="box-title">Tareas</h3>
            <div className="box-tools">                
               <form className="form" onSubmit = {this.handleSearch} >                  
                     <input 
                        type="text" 
                        ref="projectName"
                        className="form-control pull-right" 
                        placeholder="Nombre"
                      />                                       
                </form>                 
            </div>   
        </div>        
      

            <div className="box-body table-responsive">
             <table className="table table-hover table-striped">
               <tbody>
                 <tr>
                   <th>Tarea</th>
                   <th>Fecha Inicio</th>
                 </tr>

                    {this.renderTasks()}

               </tbody>
               </table>
              
             </div>
 <div className="box-footer">
               <div className="text-right">
             
             </div>
</div>
</div>

</div>
</div>
		)
}

  render() {   
      const { isLoading, cards } = this.props;
      if (isLoading) {    
        return (
          <LoadingSpinner/>
        )
      }     
    return (
     <div className="container">
          <div className="row">
            <section className="content-header">
              <h3>
                RESPONSABLES
                <small> Clickea en una tarea y luego asignale responsables </small>
              </h3>
            </section>	
     {this.renderTabla()}
     {this.renderModal()}
    </div>   
    </div>
    );
  }
}

export default PermisosContainer = withTracker(() => {      
    const subl = Meteor.subscribe('lastProject')
    const subp = Meteor.subscribe('projects')    
    const subt = Meteor.subscribe('tasks') 
    pid = LastProject.findOne({userId: Meteor.userId()}).projectId
    project = Projects.findOne(pid)
    tasks = Tasks.find({projectId:pid}).fetch()
    //const cards = BoardCards.find({taskId: Number(id)}, 
    //                {sort: { createdAt: -1 } }).fetch()
    var isLoading = !(subp.ready() && subt.ready() && subl.ready());
    
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:")   }
    return {
    //  taska: taska,            
      isLoading,      
      project: project,      
      tasks: tasks
    };
})(Permisos);