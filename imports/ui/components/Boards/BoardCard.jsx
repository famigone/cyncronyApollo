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
  
   return (
        		
 <div className="row">
        <div className="col-md-3">

          <div className="box box-widget">
            <div className="box-header with-border">
              <div className="user-block">
                <img className="img-circle" src="/img/user2-160x160.jpg" alt="User Image"/>
                <span className="username"><a href="#">Jonathan Burke Jr.</a></span>
                <span className="description">Shared publicly - 7:30 PM Today</span>
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
              <img className="img-responsive pad" src="../dist/img/photo2.png" alt="Photo"/>

              <p>I took this photo this morning. What do you guys think?</p>
              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-share"></i> Share</button>
              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-thumbs-o-up"></i> Like</button>
              <span className="pull-right text-muted">127 likes - 3 comments</span>
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

        

      </div>
     
      

    );
  }
}

/*Board.propTypes = {
      
  id: React.PropTypes.number, 
  isLoading: React.PropTypes.bool
   
 };*/
