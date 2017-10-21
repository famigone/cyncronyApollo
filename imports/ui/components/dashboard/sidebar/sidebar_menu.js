import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

const SideBarMenu = ({ userCount }) => (
  <ul className="sidebar-menu">
    <li className="header">MAIN NAVIGATION</li>

    <li className="active treeview">
      <a href="#">
        <i className="fa fa-dashboard" />
        <span>Proyectos</span> <i className="fa fa-angle-left pull-right" />
      </a>
      <ul className="treeview-menu">
        <li className="active">
          <Link to={'/dashboard/statistics'}><i className="fa fa-circle-o" /> Dashboard</Link></li>
        <li className="active">
          <Link to={'/dashboard/projects'}><i className="fa fa-circle-o" />Mis Proyectos </Link></li>
        <li className="active">
          <Link to={'/dashboard/projectnew'}><i className="fa fa-circle-o" />Nuevo </Link></li>
            <li className="active">
              <Link to={'/dashboard/projectinsert'}><i className="fa fa-circle-o" />Insert </Link></li>

        <li className="active">
          <Link to={'/dashboard/tasks'}><i className="fa fa-circle-o" /> Tareas </Link></li>

      </ul>
    </li>
    <li>
      <Link to={'#'} >
        <i className="fa fa-users" /> <span> Users </span>
        <small className="label pull-right bg-blue" > {userCount} </small>
      </Link>
    </li>
  </ul>
);

SideBarMenu.propTypes = {
  userCount: React.PropTypes.number,
};

export default SideBarMenu;
