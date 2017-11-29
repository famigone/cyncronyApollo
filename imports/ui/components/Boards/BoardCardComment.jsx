import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects';
import { Tasks } from '/imports/api/tasks';
import { LastProject } from '/imports/api/lastProject';
import { withTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';

export class BoardCardComment extends Component {
  render() {
  
   return (
        		
 <div className="box-comment">

                <img className="img-circle img-sm" src="/img/user2-160x160.jpg" alt="User Image"/>

                <div className="comment-text">
                      <span className="username">
                        Maria Gonzales
                        <span className="text-muted pull-right">8:03 PM Today</span>
                      </span>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </div>

              </div>
     
      

    );
  }
}

/*Board.propTypes = {
      
  id: React.PropTypes.number, 
  isLoading: React.PropTypes.bool
   
 };*/
export default BoardCardCommentContainer = withTracker(({ params: { comment } }) => {      
            
    //const subb = Meteor.subscribe('boardCards')             
    const suba = Meteor.subscribe('users');
    var isLoading = !(suba.ready());     
    return {      
      user: Meteor.users.findOne(card.createdBy),
      isLoading: isLoading,
      comment: comment      
    };
  })(BoardCardComment);