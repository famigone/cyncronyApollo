import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div className="lockscreen-wrapper">
    <div className="lockscreen-logo">
      <a href="../../index2.html">c<b>y</b>ncron<b>y</b></a>
    </div>

    <div className="lockscreen-name text-center">c<b>y</b>ncron<b>y</b></div>

    <div className="text-center">
      <Link to={'/sign-in'}>Sign in </Link>or
      <Link to={'/sign-up'}> Register</Link>
    </div>
    <div className="lockscreen-footer text-center">
     
      <b><a href="http://cyncrony.com" className="text-black">Orchestrate your Projects</a></b>
      <br />
      GPLv2
    </div>
  </div>
);

export default Home;
