import React, { Fragment } from 'react';
import { Redirect, Route, Switch, Router } from 'react-router';
import Items from '../pages/Items';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import ControlBar from '../components/ControlBar';

export default () => (
  <Fragment>
    <ControlBar /> {/* @TODO display only when the path is not /welcome */}
    <Switch>
      {/**
       * @TODO add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
      <Route exact path="/items" component={Items} />
      <Route exact path="/welcome" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/:userid" component={Profile} />
      <Route exact path="/share" component={Share} />
      <Redirect to="/items" />
    </Switch>
  </Fragment>
);
