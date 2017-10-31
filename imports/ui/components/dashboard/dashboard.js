/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import React, { Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import { withTracker } from 'meteor/react-meteor-data';
import { createContainer } from 'meteor/react-meteor-data';

import SideBar from './sidebar/sidebar';
import AppHeader from '../app/app_header';
import AppFooter from '../app/app_footer';
import StatisticView from './views/statistics/statistics';

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

  render() {

    const { currentUser } = this.props;

    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };

    return (

      <div className="wrapper">
        <AppHeader user={currentUser} />
        <SideBar user={this.props.currentUser} users={this.props.users} />

        <div className="content-wrapper" style={contentMinHeight} >
            {this.getContentView()}
        </div>

        <AppFooter />

        <div className="control-sidebar-bg"></div>

        <Alert stack={{limit: 3}} />  
      </div>

    );
  }
}

Dashboard.propTypes = {
  children: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  users: React.PropTypes.arrayOf(PropTypes.object),
};

export default createContainer(() => {
  /**
   * Add subscription here
   */
  Meteor.subscribe('users');

  return {
    currentUser: Meteor.user(),
    users: Meteor.users.find().fetch(),
  };
}, Dashboard);
