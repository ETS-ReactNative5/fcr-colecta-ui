import React, {Component} from 'react';
import EmailForm from './components/EmailForm/'
import PersonalData from './components/PersonalData'
import Friends from './components/Friends'
import ChoosePlace from './components/ChoosePlace'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import * as routes from './constants/routes'

import './App.css';

class App extends Component {

  updateHistory = (history, data) => {
    if (data.currentRoute === routes.EMAIL) {
      if (!data.isRegistered) {
        history.push(routes.PERSONAL_DATA);
        return;
      }
    }
    if (data.currentRoute === routes.PERSONAL_DATA) {
      history.push(routes.FRIENDS);
    }
    if (data.currentRoute === routes.FRIENDS) {
      history.push(routes.CHOOSE_PLACE);
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Redirect
              exact from={routes.LANDING}
              to={routes.EMAIL}
            />
            <Route
              path={routes.EMAIL}
              render={(routeProps) => (
                <EmailForm {...routeProps} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
            <Route
              path={routes.PERSONAL_DATA}
              render={(routeProps) => (
                <PersonalData {...routeProps} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
            <Route
              path={routes.FRIENDS}
              render={(routeProps) => (
                <Friends {...routeProps} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
            <Route
              path={routes.CHOOSE_PLACE}
              render={(routeProps) => (
                <ChoosePlace {...routeProps} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
