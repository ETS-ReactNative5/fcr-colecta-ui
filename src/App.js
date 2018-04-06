import React, {Component} from 'react';
import EmailForm from './components/EmailForm/'
import PersonalData from './components/PersonalData'
import ChoosePlace from './components/ChoosePlace'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
      history.push(routes.CHOOSE_PLACE)
    }
  }

  render() {
    return (

      <Router>
        <Switch>
          <Route
            exact path={routes.LANDING}
            render={(routeProps) => (
              <EmailForm {...routeProps} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
            )}
          />
          <Route
            path={routes.EMAIL}
            component={EmailForm}
            onUpdateHistory={this.updateHistory}/> }
          />
          <Route
            exact path={routes.PERSONAL_DATA}
            render={(routeProps) => (
              <PersonalData {...routeProps} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
            )}
          />
          <Route
            exact path={routes.CHOOSE_PLACE}
            render={(routeProps) => (
              <ChoosePlace {...routeProps} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
