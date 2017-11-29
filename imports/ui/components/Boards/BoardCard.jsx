import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects';
import { Tasks } from '/imports/api/tasks';
import { LastProject } from '/imports/api/lastProject';
import { withTracker } from 'meteor/react-meteor-data';
import { BoardCardComment } from './BoardCardComment';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';

export class BoardCard extends Component {
  render() {
  console.log(this.props.user)  
  const { isLoading } = this.props;
      if (isLoading) {    
        return (
          <LoadingSpinner/>
        )
      }   

   return (        		
 
         <div className="col-md-4 col-sm-6 col-xs-12">

          <div className="box box-widget">
            <div className="box-header with-border">
              <div className="user-block">
                <img className="img-circle" src="/img/user2-160x160.jpg" alt="User Image"/>
                <span className="username"><a href="#">{this.props.card.title}</a></span>
                <span className="description">{this.props.card.createdBy}{this.props.user} - 7:30 PM Today</span>
              </div>

              <div className="box-tools">
                <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="Mark as read">
                  <i className="fa fa-circle-o"></i></button>
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
              </div>

            </div>

            <div className="box-body">
             {/*  <img className="img-responsive pad" src="../dist/img/photo2.png" alt="Photo"/> */}

              <p>{this.props.card.description}</p>
              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-share"></i> Share</button>
              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-thumbs-o-up"></i> Like</button>
              <span className="pull-right text-muted">lalalal - 3 comments</span>
            </div>

            <div className="box-footer box-comments">
              <BoardCardComment/>
              <BoardCardComment/>

              

            </div>

            <div className="box-footer">
              <form action="#" method="post">
                <img className="img-responsive img-circle img-sm" src="/img/user2-160x160.jpg" alt="Alt Text"/>

                <div className="img-push">
                  <input type="text" className="form-control input-sm" placeholder="Press enter to post comment"/>
                </div>
              </form>
            </div>

          </div>

        </div>

        

  
     
      

    );
  }
}

/*BoardCard.propTypes = {
      
  card: React.PropTypes.object, 
   
 };
*/
export default BoardCardContainer = withTracker(({ params: { card } }) => {      
            
    const subb = Meteor.subscribe('boardCards')         
    const suba = Meteor.subscribe('users');
    var isLoading = !(suba.ready() && subb.ready());     
    //if (!isLoading) {console.log("EL ID ESSSSSSSSSSSS:"+ Tasks.findOne(id).text)   }
    return {      
      user: Meteor.users.findOne(card.createdBy),
      isLoading: isLoading,
      card: card
    };
  })(BoardCard);