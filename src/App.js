import React, {Component} from 'react';
import EmailForm from './components/EmailForm/'
import PersonalData from './components/PersonalData'
import Friends from './components/Friends'
import ChoosePlace from './components/ChoosePlace'
import ConfirmAccount from './components/ConfirmAccount'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import * as routes from './constants/routes'

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      currentUser: null,
      friendsCount: 0
    }
  }

  updateHistory = (history, data) => {
    if (data.currentRoute === routes.EMAIL) {
      if (!data.isRegistered) {
        this.setState(
          {email: data.email},
          () => history.push(routes.PERSONAL_DATA)
        );
      }
    }
    if (data.currentRoute === routes.PERSONAL_DATA) {
      this.setState(
        {currentUser: data.user},
        () => history.push(routes.FRIENDS)
      );
    }
    if (data.currentRoute === routes.FRIENDS) {
      this.setState(
        {friendsCount: data.friendsCount},
        () => history.push(routes.CHOOSE_PLACE)
      );
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
                <EmailForm {...routeProps} {...this.state} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
            <Route
              path={routes.PERSONAL_DATA}
              render={(routeProps) => (
                <PersonalData {...routeProps} {...this.state} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
            <Route
              path={routes.FRIENDS}
              render={(routeProps) => (
                <Friends {...routeProps} {...this.state} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
            <Route
              path={routes.CHOOSE_PLACE}
              render={(routeProps) => (
                <ChoosePlace {...routeProps} {...this.state} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
            <Route
              path={routes.CONFIRM_ACCOUNT}
              render={(routeProps) => (
                <ConfirmAccount {...routeProps} {...this.state} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
