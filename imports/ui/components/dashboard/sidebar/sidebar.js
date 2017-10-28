import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { withTracker } from 'meteor/react-meteor-data';

import SideBarUserPanel from './sidebar_user_panel';
import SideBarSearchPanel from './sidebar_search_panel';
import SideBarMenu from './sidebar_menu';

export default class SideBar extends Component {
  userDisplayName() {
    const currentUser = this.props.user;
    let name = 'Fedex';

    if (currentUser) {
      name = currentUser.emails[0].address;
    }

    return name;
  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <SideBarUserPanel userName={this.userDisplayName()} />
          <SideBarSearchPanel />
          <SideBarMenu userCount={this.props.users.length} />
        </section>
      </aside>
    );
  }
}

SideBar.propTypes = {
  user: React.PropTypes.object,
  users: React.PropTypes.array,
};
