import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Projects } from '/imports/api/projects';
import { Tasks } from '/imports/api/tasks';
import { LastProject } from '/imports/api/lastProject';
import { withTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../controls/LoadingSpinner';
import Alert from 'react-s-alert';

export class BoardHead extends Component {
  render() {
   const progress = parseInt(this.props.taska.progress * 100)  
   return (
        		
   <div className="info-box bg-aqua">
            <span className="info-box-icon"><i className="fa fa-circle-o" /></span>

            <div className="info-box-content">
              <span className="info-box-text">{this.props.taska.text}</span>
              <span className="info-box-number"> {"Inicio: " + this.props.taska.start_date }</span>

              <div className="progress">
                <div className="progress-bar" style={{width: progress+"%"}}></div>
              </div>
              <span className="progress-description">
                    40% Increase in 30 Days
                  </span>
            </div>

          </div>

      
      

    );
  }
}

/*Board.propTypes = {
      
  id: React.PropTypes.number, 
  isLoading: React.PropTypes.bool
   
 };*/
