import React, {Component} from 'react';
import {getActivePlaces, getCities, getSchedules, reserveLocation} from '../../api';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import * as routes from '../../constants/routes'

import PlacesMap from './PlacesMap';
import PlacesList from './PlacesList';

export default class ChoosePlace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      currentCityId: "",
      currentCity: {},
      places: [],
      currentPlace: {},
      currentScheduleId: "",
      schedules: [],
      allPlacesChosen: false
    };
  }

  componentDidMount = () => {
    if (this.props.friendsCount < 5) {
      this.props.history.push(routes.FRIENDS);
      return;
    }
    this.loadCities();
    this.loadSchedules();
  };

  loadCities = () => {
    getCities()
      .then((response) => {
        this.setState({cities: response});
      });
  };

  showCities = () => {
    return this.state.cities.map((city) => {
      return <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>;
    });
  };

  updatePlaces = (event) => {
    this.setState({
      places: [],
      currentPlace: {},
      allPlacesChosen: false
    });

    let cityId = "";
    let scheduleId = "";
    if (event.target.name === 'city') {
      cityId = event.target.value;
      scheduleId = this.state.currentScheduleId;
      let city = this.state.cities.filter(city => city.id === cityId)[0];
      this.setState({currentCity: city, currentCityId: cityId});
    }
    if (event.target.name === 'schedule') {
      cityId = this.state.currentCityId;
      scheduleId = event.target.value;
      let schedule = this.state.schedules.filter(schedule => schedule.id === scheduleId)[0];
      this.setState({currentSchedule: schedule, currentScheduleId: scheduleId});
    }
    if (cityId !== "" && scheduleId !== "") {
      getActivePlaces({cityId: cityId, scheduleId: scheduleId})
        .then((response) => {
          this.setState({places: response, allPlacesChosen: response.length === 0});
        });
    }
  };

  loadSchedules = () => {
    getSchedules()
      .then((response) => {
        this.setState({schedules: response});
      });
  };

  showSchedules = () => {
    return this.state.schedules.map((schedule) => {
      return <MenuItem key={schedule.id} value={schedule.id}>{schedule.day} - {schedule.time}</MenuItem>;
    });
  };

  updateSelectedPlace = (place) => {
    this.setState({currentPlace: place});
    // We use old school js (a.k.a vanilla) to scroll to bottom of page
    window.scrollTo(0, document.body.scrollHeight);
  };

  handleSubmit = () => {
    reserveLocation({
      placeId: this.state.currentPlace.id,
      scheduleId: this.state.currentScheduleId,
      personId: this.props.currentUser.id
    }).then(response => {
      if (response.success) {
        alert('Muchas gracias por participar.\nTe hemos enviado un correo de confirmación, por favor sigue las instrucciones para confirmar tu participación');
        this.props.onUpdateHistory({currentRoute: routes.CHOOSE_PLACE, ...response});
      } else {
        alert(`Por favor verifica la información y vuelve a intentar\n${response.errors.join('\n')}`);
      }
    });
  };

  render() {
    return (
      <div className="choose-place">
        <header className="App-header">
          <h1 className="App-title">Escoja el lugar</h1>
        </header>
        <Grid container justify="center">
          <Grid item xs={12}>
            <FormControl className="form-control">
              <InputLabel htmlFor="city-selector">Ciudad</InputLabel>
              <Select
                name="city"
                value={this.state.currentCityId}
                onChange={this.updatePlaces}
                inputProps={{id: 'city-selector'}}
              >
                {this.showCities()}
              </Select>
              <FormHelperText>Selecciona la ciudad</FormHelperText>
            </FormControl>
            <FormControl className="form-control">
              <InputLabel htmlFor="schedule-selector">Horario</InputLabel>
              <Select
                name="schedule"
                value={this.state.currentScheduleId}
                onChange={this.updatePlaces}
                inputProps={{id: 'schedule-selector'}}
              >
                {this.showSchedules()}
              </Select>
              <FormHelperText>Selecciona el horario</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        {
          this.state.currentCity.id != null && this.state.currentScheduleId !== "" && !this.state.allPlacesChosen &&
          <Grid container justify="center">
            <Grid item xs={12} md={5}>
              <PlacesMap
                coordinates={{
                  lat: this.state.currentCity.latitude,
                  lng: this.state.currentCity.longitude
                }}
                places={this.state.places}
                currentPlace={this.state.currentPlace}
                onPlaceSelected={this.updateSelectedPlace}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PlacesList
                places={this.state.places}
                currentPlace={this.state.currentPlace}
                onPlaceSelected={this.updateSelectedPlace}
              />
            </Grid>
          </Grid>
        }
        {this.state.allPlacesChosen && "No hay puntos disponibles en la ciudad y horario seleccionados"}
        {
          this.state.currentPlace.id &&
          <Grid container justify="center">
            <Card className="choosen-place">
              <CardContent>
                <Typography variant="headline" component="h2">Datos de tu participación</Typography>
                <Typography component="dl">
                  <dt>Ciudad:</dt>
                  <dd>{this.state.currentCity.name}</dd>
                  <dt>Fecha:</dt>
                  <dd>{this.state.currentSchedule.day}</dd>
                  <dt>Horario:</dt>
                  <dd>{this.state.currentSchedule.time}</dd>
                  <dt>Lugar:</dt>
                  <dd>{this.state.currentPlace.name}</dd>
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={this.handleSubmit}>
                  Guardar Registro
                </Button>
              </CardActions>
            </Card>
          </Grid>
        }
      </div>
    )
  }
}
