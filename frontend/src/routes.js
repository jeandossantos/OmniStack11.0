import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './components/logon/index';
import Register from './components/register/index';
import Profile from './components/profile/index';
import IncidentNew from './components/incident/index';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incident/new" component={IncidentNew} />
            </Switch>
        </BrowserRouter>
    )
}
