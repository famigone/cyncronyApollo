import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div className="lockscreen-wrapper">
    <div className="lockscreen-logo">
      <a href="../../index2.html"><b>Reactib</b>PM</a>
    </div>

    <div className="lockscreen-name text-center"><b>ReactibPM</b></div>

    <div className="text-center">
      <Link to={'/sign-in'}>Sign in </Link>or
      <Link to={'/sign-up'}> Register</Link>
    </div>
    <div className="lockscreen-footer text-center">
      Copyright © 2014-2015&nbsp;
      <b><a href="http://reactib.com" className="text-black">React with us</a></b>
      <br />
      All rights reserved
    </div>
  </div>
);

export default Home;
