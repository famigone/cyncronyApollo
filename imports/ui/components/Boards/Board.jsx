import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects';
import { Tasks } from '/imports/api/tasks';
import { LastProject } from '/imports/api/lastProject';
import { withTracker } from 'meteor/react-meteor-data';
import { BoardHead } from './BoardHead';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';
import Board from 'react-trello'



export class TaskBoard extends Component {



  render() {
  	const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
	    {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}
  	  const { isLoading,  } = this.props;
      if (isLoading) {    
        return (
          <LoadingSpinner/>
        )
      }    	
     //console.log(this.props.taska) 
    return (
      //this.cabecera()	
      <div>
      	<BoardHead taska={this.props.taska}/>		
      	<Board data={data} />
      </div>
      
    

    );
  }
}

/*Board.propTypes = {
      
  id: React.PropTypes.number, 
  isLoading: React.PropTypes.bool
   
 };*/

export default TaskBoardContainer = withTracker(({ params: { id } }) => {      
        
    const subl = Meteor.subscribe('lastProject')
    pid = LastProject.findOne({userId: Meteor.userId()}).projectId
    const subp = Meteor.subscribe('projects')    
    //const subt = Meteor.subscribe('tasks', pid)    
    const subt = Meteor.subscribe('tasks') 
    //const aidiso = Number(id) 
    const taska = Tasks.findOne({id:parseInt(id)});     
    var isLoading = !(subp.ready() && subt.ready()); 
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:"+ Tasks.findOne(id).text)   }
    return {
      taska: taska,            
      isLoading,      
      pid: pid,      
      id:id
    };
  })(TaskBoard);
