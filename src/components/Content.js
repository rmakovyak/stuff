import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './Content.css';

import Inbox from './Inbox';
import Today from './Today';
import Upcoming from './Upcoming';

function Routes() {
    return (
        <Switch>
            <Route
                exact
                path="/inbox"
                component={Inbox} />
            <Route
                exact path="/today"
                component={Today} />
            <Route
                exact
                path="/upcoming"
                component={Upcoming} />
            <Redirect from="/" exact to="/inbox" />
            <Route component={Inbox} />
        </Switch>
    );
}

export default Routes;