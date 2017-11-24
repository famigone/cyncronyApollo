/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import PropTypes from 'prop-types'; // ES6

import Index from '../../ui/components/index';
import Home from '../../ui/components/home';
import SignIn from '../../ui/components/sign_in';
import SignUp from '../../ui/components/sign_up';
import Dashboard from '../../ui/components/dashboard/dashboard';
import Statistics from '../../ui/components/dashboard/views/statistics/statistics';
import { NotFound } from '../../ui/pages/not_found/not_found';
import ListaTarea from '../../ui/components/ListaTarea/ListaTarea';
import ProjectList from '../../ui/components/ProjectList/ProjectList';
import ProjectNew from '../../ui/components/ProjectNew/ProjectNew';
import ProjectInsert from '../../ui/components/ProjectNew/ProjectInsert';
import App from '../../ui/components/Gantt/App';
import Board from '../../ui/components/Boards/Board';


export const requireAuth = (nextState, replace) => {
  // No user is authenticated redirect ro index
  if (Meteor.user() === null) {
    replace({
      pathname: '/',
    });
  }
};



export const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Index}>
      <IndexRoute name="home" component={Home} />
      <Route path="sign-in" name="signIn" component={SignIn} />
      <Route path="sign-up" name="signUp" component={SignUp} />
      <Route path="dashboard" name="dashboard" component={Dashboard} onEnter={requireAuth}>
        <Route path="projects" name="projects" component={App} />
        <Route path="projectnew" name="projectnew" component={ProjectNew} />
        <Route path="projectinsert" name="projectinsert" component={ProjectInsert} />
        <Route path="tasks" name="tasks" component={ListaTarea} />
        <Route path="boards/:id" name="boards" component={Board} />

      </Route>
    </Route>
    <Route path="*" name="not-found" component={NotFound} />
  </Router>
);
