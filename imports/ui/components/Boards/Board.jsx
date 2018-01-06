import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects';
import { Tasks } from '/imports/api/tasks';
import { BoardCards } from '/imports/api/boardCards';
import { LastProject } from '/imports/api/lastProject';
import { withTracker } from 'meteor/react-meteor-data';
import { BoardHead } from './BoardHead';
import  BoardCardContainer  from './BoardCard';
import  BoardActionsContainer  from './BoardActions';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';
//import Board from 'react-trello'



export class Board extends Component {
 constructor(props) {
    super(props);
  }

renderCards(){

	return this.props.cards.map((card) => (
	<div key={card._id}  style={{margin:5}}>	
       <BoardCardContainer     
       	  key={card._id} 	
          card={card} 
      />
    </div>  
     ));
}

  render() {   
      const { isLoading, cards } = this.props;
      if (isLoading) {    
        return (
          <LoadingSpinner/>
        )
      }     
    return (
    <div>	
    <BoardHead taska={this.props.taska}/>                                         
    		<div>
            <BoardActionsContainer 
                pid={this.props.pid} 
                tid={this.props.id}
            /> 
            </div>            
            <div className="row">                          
                {this.renderCards()}                    
        	</div>
      </div>    
    );
  }
}

/*Board.propTypes = {
      
  id: React.PropTypes.number, 
  isLoading: React.PropTypes.bool
   
 };*/

export default BoardContainer = withTracker(({ params: { id } }) => {      
        
    const subl = Meteor.subscribe('lastProject')
    pid = LastProject.findOne({userId: Meteor.userId()}).projectId
    const subp = Meteor.subscribe('projects')    
    const subt = Meteor.subscribe('tasks') 
    const subb = Meteor.subscribe('boardCards') 
    const taska = Tasks.findOne({id:parseInt(id)});         
    const cards = BoardCards.find({taskId: Number(id)}, 
                    {sort: { createdAt: -1 } }).fetch()
    var isLoading = !(subp.ready() && subt.ready() && subb.ready());
    
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:")   }
    return {
      taska: taska,            
      isLoading,      
      pid: pid,      
      id:id,
      cards: cards
    };
  })(Board);
