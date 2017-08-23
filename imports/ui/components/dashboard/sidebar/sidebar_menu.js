import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SideBarMenu = ({ userCount }) => (
  <ul className="sidebar-menu">
    <li className="header">MAIN NAVIGATION</li>

    <li className="active treeview">
      <a href="#">
        <i className="fa fa-dashboard" />
        <span>Dashboard</span> <i className="fa fa-angle-left pull-right" />
      </a>
      <ul className="treeview-menu">
        <li className="active">
          <Link to={'/dashboard'}><i className="fa fa-circle-o" /> Dashboard</Link></li>
        <li className="active">
          <Link to={'/tasks'}><i className="fa fa-circle-o" /> Tasks </Link></li>

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
  userCount: PropTypes.number,
};

export default SideBarMenu;
