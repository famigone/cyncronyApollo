/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import React, { Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import { withTracker } from 'meteor/react-meteor-data';
import { createContainer } from 'meteor/react-meteor-data';
import { LastProject } from '/imports/api/lastProject';
import { Projects } from '/imports/api/projects';
import { Link } from 'react-router';

import SideBar from './sidebar/sidebar';
import AppHeader from '../app/app_header';
import AppFooter from '../app/app_footer';
import StatisticView from './views/statistics/statistics';
import LoadingSpinner from '../controls/LoadingSpinner';

//alerts
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

class Dashboard extends Component {
  getContentView() {
      return this.props.children;
  }

  shouldComponentUpdate(){
    //console.log(this.props.isLoading)  
     if (!this.props.isLoading){      
      const pl  = LastProject.findOne({userId: Meteor.userId()})      
        if (pl){
          //const subp = Meteor.subscribe('projects')          
          const one  = Projects.findOne(pl.projectId)
          if (one) {
            Session.set("lastProject", one.codigo)
            //console.log(Session.get("lastProject")) 
          }
        }
      }
      return true;
  }
  render() {
    //this.preparar()
    const { currentUser } = this.props;
    const { isLoading } = this.props;
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };
    

  if (isLoading) {    
    return (
      <LoadingSpinner/>
    )
  }   
  
  
  const codigo = Projects.findOne(this.props.projectActual.projectId).codigo 
  //seteo para todo el entorno el id del projecto actual
  Session.set("lastProjectId", LastProject.findOne({userId: Meteor.userId()}).id)   
  
    return (

      <div className="wrapper">
        <AppHeader user={currentUser} />

        <SideBar user={this.props.currentUser} users={this.props.users} projectActual={codigo}/>

        <div className="content-wrapper" style={contentMinHeight} >
            {this.getContentView()}
        </div>

        <AppFooter />

        <div className="control-sidebar-bg"></div>

        <Alert stack={{limit: 3}} html={true} />  
      </div>

    );
  }
}

Dashboard.propTypes = {
  children: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  users: React.PropTypes.arrayOf(PropTypes.object),
  //projectActual: React.PropTypes.string,
  isLoading: React.PropTypes.bool
};



export default dashboardContainer = withTracker(() => {      
    Meteor.subscribe('users');
    const subl = Meteor.subscribe('lastProject');
    const subp = Meteor.subscribe('projects')
    var isLoading = !(subl.ready() && subp.ready());            
    
    
       return {
        currentUser: Meteor.user(),
        users: Meteor.users.find().fetch(),
        //projectActual: Session.get("projectActual"),
        projectActual: LastProject.findOne({userId: Meteor.userId()}),

        isLoading: isLoading

    }; 
})(Dashboard);