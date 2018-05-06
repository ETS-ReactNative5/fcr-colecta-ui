import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import * as routes from '../../constants/routes';
import {savePersonalData} from '../../api';
import Radio, {RadioGroup} from 'material-ui/Radio';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import * as Validator from '../../utils/Validator';

import 'react-datepicker/dist/react-datepicker.css';
import '../PersonalData/PersonalData.css'

import fbLogo from '../../images/FB-f-Logo__blue_29.png';
import twLogo from '../../images/Twitter_Social_Icon_Rounded_Square_Color.svg';

class PersonalData extends Component {
  constructor(props) {
    super(props)

    this.spanishNames = {
      firstname: 'Nombre',
      lastname: 'Apellido',
      identifier: 'Cédula',
      gender: 'Género',
      birthday: 'Fecha de cumpleaños',
      phone: 'Número de teléfono',
      cellphone: 'Número celular',
      email: 'Correo electrónico',
      email_confirmation: 'Confirmación del correo'
    };

    this.state = {
      firstname: {value: "", required: true, isValid: false, touched: false},
      lastname: {value: "", required: true, isValid: false, touched: false},
      identifier: {value: "", required: true, isValid: false, touched: false, validationMethod: Validator.validIdentifier},
      gender: {value: "", required: true, isValid: false, touched: false},
      birthday: {value: "2000-01-01", required: true, isValid: false, touched: false},
      phone: {value: "", required: false, isValid: true, touched: false, validationMethod: Validator.validPhone},
      cellphone: {value: "", required: true, isValid: false, touched: false, validationMethod: Validator.validCellphone},
      email: {value: props.email, required: true, isValid: true, touched: true, validationMethod: Validator.validEmail},
      email_confirmation: {value: "", required: true, isValid: false, touched: false, validationMethod: Validator.sameValue, validationParams: 'email'}
    }
  }

  componentDidMount = () => {
    if (this.props.email === "") {
      this.props.history.push(routes.EMAIL);
    } else {
      const {
        firstname,
        lastname,
        identifier,
        gender,
        birthday,
        phone,
        cellphone} = this.props.location.state;
      this.setState({
        firstname: {value: firstname || this.state.firstname.value, ...this.state.firstname},
        lastname: {value: lastname || this.state.lastname.value, ...this.state.lastname},
        identifier: {value: identifier || this.state.identifier.value, ...this.state.identifier},
        gender: {value: gender || this.state.gender.value, ...this.state.gender},
        birthday: {value: birthday || this.state.birthday.value, ...this.state.birthday},
        phone: {value: phone || this.state.phone.value, ...this.state.phone},
        cellphone: {value: cellphone || this.state.cellphone.value, ...this.state.cellphone},
      })
    }
  };

  handleInput = (event) => {
    const {name, value} = event.target;
    const hash = this.state[name];
    hash.value = value;
    hash.isValid = this.isValid(name, value);
    this.setState({[name]: hash});
  };

  handleFocus = (event) => {
    const name = event.target.name;
    const hash = this.state[name];
    hash.touched = true;
    hash.isValid = this.isValid(name, event.target.value);
    this.setState({[name]: hash});
  };

  isValid = (name, value) => {
    const {required, validationMethod, validationParams} = this.state[name];
    if (!required) {
      return true;
    }
    let possibleParam = this.state[validationParams];
    if (possibleParam) {
      possibleParam = possibleParam.value;
    }
    return (!required || value !== "") && (!validationMethod || validationMethod.call(this, value, possibleParam));
  };

  handleSubmit = (event) => {
    let state = this.state;
    let fieldsWithErrors = Object.keys(state).filter(f => !state[f].isValid)
    if (fieldsWithErrors.length > 0) {
      alert(`Algunos de los campos tienen información no válida\n${fieldsWithErrors.map(f => this.spanishNames[f]).join('\n')}`);
      return;
    }
    let data = Object.keys(state).reduce((acc, k) => ({...acc, [k]: state[k].value}), {});
    data.is_joining = event.currentTarget.name === 'joinButton';
    savePersonalData(data)
      .then((response) => {
        if (response.success) {
          this.props.onUpdateHistory({
            currentRoute: routes.PERSONAL_DATA,
            user: response.person
          });
        } else {
          alert(`No se pudo guardar la información.\n${response.errors.join('\n')}`)
        }
      });
  };

  render() {
    return (
      <div className="personal-data">
        <form>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={12} md={5} lg={4}>
              <Paper className="box">
              <h3>Datos personales</h3>
                <FormControl className="form-control">
                  <TextField
                    label="Nombre"
                    name="firstname"
                    placeholder="Ingresa tu nombre"
                    onFocus={this.handleFocus}
                    onChange={this.handleInput}
                    value={this.state.firstname.value}
                    error={this.state.firstname.touched && !this.state.firstname.isValid}
                    required={this.state.firstname.required}
                  />
                </FormControl><br/>
                <FormControl className="form-control">
                  <TextField
                    label="Apellido"
                    name="lastname"
                    placeholder="Ingresa tu apellido"
                    onFocus={this.handleFocus}
                    onChange={this.handleInput}
                    value={this.state.lastname.value}
                    error={this.state.lastname.touched && !this.state.lastname.isValid}
                    required={this.state.lastname.required}
                  />
                </FormControl><br/>
                <FormControl className="form-control">
                  <TextField
                    label="Cédula de Identidad"
                    name="identifier"
                    placeholder="Ingresa tu cédula de identidad"
                    onFocus={this.handleFocus}
                    onChange={this.handleInput}
                    value={this.state.identifier.value}
                    error={this.state.identifier.touched && !this.state.identifier.isValid}
                    required={this.state.identifier.required}
                  />
                </FormControl><br/>
                <br/>
                <FormControl className="form-control">
                  <FormLabel component="legend">Género</FormLabel>
                  <RadioGroup
                    name="gender"
                    onChange={this.handleInput}
                    value={this.state.gender.value}
                  >
                    <FormControlLabel value="female" control={<Radio/>} label="Femenino" className="options"/>
                    <FormControlLabel value="male" control={<Radio/>} label="Masculino" className="options"/>
                  </RadioGroup>
                </FormControl><br/>
                <br/>
                <FormControl className="form-control">
                  <TextField
                    label="Fecha de nacimiento"
                    name="birthday"
                    placeholder="Ingresa tu fecha de nacimiento"
                    type="date"
                    onFocus={this.handleFocus}
                    onChange={this.handleInput}
                    value={this.state.birthday.value}
                    error={this.state.birthday.touched && !this.state.birthday.isValid}
                    required={this.state.birthday.required}
                  />
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>  
              <Paper className="box">
                <h3>Información de contacto</h3>
                <FormControl className="form-control">
                  <TextField
                    label="Teléfono Fijo"
                    name="phone"
                    placeholder="Ingresa tu número de teléfono"
                    onFocus={this.handleFocus}
                    onChange={this.handleInput}
                    value={this.state.phone.value}
                    error={this.state.phone.touched && !this.state.phone.isValid}
                    required={this.state.phone.required}
                  />
                </FormControl><br/>
                <FormControl className="form-control">
                  <TextField
                    label="Teléfono Celular"
                    name="cellphone"
                    placeholder="Ingresa tu número celular"
                    onFocus={this.handleFocus}
                    onChange={this.handleInput}
                    value={this.state.cellphone.value}
                    error={this.state.cellphone.touched && !this.state.cellphone.isValid}
                    required={this.state.cellphone.required}
                  />
                </FormControl><br/>
                <br/>
                <FormControl className="form-control">
                  <TextField
                    label="Correo Electrónico"
                    name="email"
                    placeholder="Ingresa tu correo electrónico"
                    type="email"
                    onFocus={this.handleFocus}
                    onChange={this.handleInput}
                    value={this.state.email.value}
                    error={this.state.email.touched && !this.state.email.isValid}
                    required={this.state.email.required}
                  />
                </FormControl><br/>
                <FormControl className="form-control">
                  <TextField
                    label="Confirmación Correo"
                    name="email_confirmation"
                    placeholder="Ingresa nuevamente tu correo electrónico"
                    type="email_confirmation"
                    onFocus={this.handleFocus}
                    onChange={this.handleInput}
                    value={this.state.email_confirmation.value}
                    error={this.state.email_confirmation.touched && !this.state.email_confirmation.isValid}
                    required={this.state.email_confirmation.required}
                  />
                </FormControl>
              </Paper>
              <br/>
              <br/>
              <Grid container justify="flex-end">
                { this.props.settings.join_location !== "true" &&
                <Grid item xs={12}>
                  <Button variant="raised" className="homepage-button" name="leaderButton" onClick={this.handleSubmit}>
                    Guardar
                  </Button>
                </Grid>
                }
                { this.props.settings.join_location === "true" &&
                <Grid item xs={12}>
                  <Button variant="raised" className="homepage-button" name="leaderButton" onClick={this.handleSubmit}>
                    Líder de punto
                  </Button>
                  <Button variant="raised" className="homepage-button" name="joinButton" onClick={this.handleSubmit}>
                    Unirme a un punto
                  </Button>
                </Grid>
                }

              </Grid>
            </Grid>

            <Grid container justify="center" spacing={16}>
              <Grid item xs={12}>
                <p className="social-label">Síguenos:</p>
                <a href="https://www.facebook.com/FCRecuador" target="_blank" rel="noopener noreferrer"><img src={fbLogo} className="social-logo" alt="Facebook"/></a>
                &nbsp;&nbsp;
                <a href="https://twitter.com/juntossomosvida" target="_blank" rel="noopener noreferrer"><img src={twLogo} className="social-logo" alt="Twitter"/></a>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  };

};

export default PersonalData;
