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
import Analisis from '../../ui/components/analisis/Analisis';
import ProjectNew from '../../ui/components/ProjectNew/ProjectNew';
import ProjectInsert from '../../ui/components/ProjectNew/ProjectInsert';
import App from '../../ui/components/Gantt/App';
import TaskBoard from '../../ui/components/Boards/Board';
import FileUploadComponent from '../../ui/components/Boards/FileUpload';
import PermisosContainer from '../../ui/components/permisos/permisos';
import UsuariosContainer from '../../ui/components/usuarios/Usuarios';

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
        <Route path="analisis" name="analisis" component={Analisis} />
        <Route path="board/:id" name="boards" component={TaskBoard} />
        <Route path="file" name="file" component={FileUploadComponentContainer} />
        <Route path="permisos" name="permisos" component={PermisosContainer} />
        <Route path="usuarios" name="usuarios" component={UsuariosContainer} />
      </Route>        
    </Route>
    <Route path="*" name="not-found" component={NotFound} />
  </Router>
);
