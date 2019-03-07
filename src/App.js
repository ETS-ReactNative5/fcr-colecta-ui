import React, {Component} from 'react';
import EmailForm from './components/EmailForm/'
import PersonalData from './components/PersonalData'
import Friends from './components/Friends'
import ChoosePlace from './components/ChoosePlace'
import ConfirmAccount from './components/ConfirmAccount'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import * as routes from './constants/routes'
import {getSettings} from './api'

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      currentUser: null, // All data about registered user
      friendsCount: 0, // Invited friends count
      settings: {} // App Settings
    }
  }

  componentWillMount= () => {
    getSettings(this.props.currentUser).then(response => {
      this.setState({settings: response});
    });
  }

  updateHistory = (history, data) => {
    if (data.currentRoute === routes.EMAIL) {
      // //Path to close inscriptions
      // if (data.new_user) {
      //   alert('Correo no registrado');
      //   return;
      // }
      // if (data.location) {
      //   alert(`Usuario registrado\nUbicación: ${data.location.name}\n${data.friends_count} personas registradas en la misma ubicación.`);
      // }
      // return;

      if (!data.new_user && (data.is_joining || !data.is_leader) && data.has_location) {
        if (data.confirmed) {
          alert(`Usuario confirmado\nUbicación: ${data.location.name}\n${data.friends_count} personas registradas en la misma ubicación.`);
        } else {
          alert('Todavía no has confirmado tu participación\nPor favor revisa tu correo y sigue las instrucciones');
        }
        return;
      }
      if (!!data.new_user || !data.has_personal_data) {
        this.setState(
          {email: data.email},
          () => history.push(routes.PERSONAL_DATA, data)
        );
        return;
      }
      if (!data.is_joining && this.state.settings.friends > data.friends_count) {
        this.setState(
          {
            email: data.email,
            currentUser: data
          },
          () => history.push(routes.FRIENDS)
        );
        return;
      }
      if (!data.has_location) {
        this.setState(
          {
            email: data.email,
            currentUser: data,
            friendsCount: data.friends_count
          },
          () => history.push(data.is_joining ? routes.JOIN_LOCATION : routes.CHOOSE_PLACE)
        );
        return;
      }
      // For any other case (full data, more than x friends or chosen location)
      // we send the user to friends screen
      this.setState(
        {
          email: data.email,
          currentUser: data
        },
        () => history.push(routes.FRIENDS)
      );
    }
    if (data.currentRoute === routes.PERSONAL_DATA) {
      this.setState(
        {
          currentUser: data.user,
        },
        () => history.push(data.user.is_joining ? routes.JOIN_LOCATION : routes.FRIENDS)
      );
      return;
    }
    if (data.currentRoute === routes.FRIENDS) {
      this.setState(
        {friendsCount: data.friendsCount},
        () => history.push(routes.CHOOSE_PLACE)
      );
    }
    if (data.currentRoute === routes.CHOOSE_PLACE) {
      history.push(routes.LANDING);
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
            <Route
              path={routes.JOIN_LOCATION}
              render={(routeProps) => (
                <ChoosePlace {...routeProps} {...this.state} onUpdateHistory={(data) => this.updateHistory(routeProps.history, data)}/>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
