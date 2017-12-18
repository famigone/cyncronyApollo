import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router';


const SideBarMenu = ({ userCount, projectActual }) => (
  <ul className="sidebar-menu">
    <li className="header"><center>PROYECTO: <span className="label label-primary">{projectActual}</span></center></li>    
    <li className="active treeview">
      <a href="#">
        <i className="fa fa-fire" />
        <span>Proyectos</span> <i className="fa fa-angle-left pull-right" />
      </a>
      <ul className="treeview-menu">
      <li className="active">
              <Link to={'/dashboard/projectinsert'}><i className="fa fa-flag text-orange" />Mis Proyectos </Link></li>

        <li className="active">
          <Link to={'/dashboard/projects'}><i className="fa fa-tasks text-blue" />Gantt </Link></li>
        <li className="active">
          <Link to={'/dashboard/permisos'}><i className="fa fa-circle-o text-red" />Responsables </Link></li>
            
        <li className="active">
          <Link to={'/dashboard/tasks'}><i className="fa fa-pie-chart text-purple" /> Analisis </Link></li>

      </ul>
    </li>
    <li>
      <Link to={'#'} >
        <i className="fa fa-users" /> <span> Usuarios </span>
        <small className="label pull-right bg-blue" > {userCount} </small>
      </Link>
    </li>
  </ul>
);

SideBarMenu.propTypes = {
  userCount: React.PropTypes.number,
  projectActual: React.PropTypes.string
};

export default SideBarMenu;   
