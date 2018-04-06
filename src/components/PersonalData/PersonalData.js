import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import * as routes from '../../constants/routes'
import {savePersonalData} from '../../api'

import 'react-datepicker/dist/react-datepicker.css';

class PersonalData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: {value: "", required: true, isValid: false, touched: false},
      lastname: {value: "", required: true, isValid: false, touched: false},
      identifier: {value: "", required: true, isValid: false, touched: false},
      birthday: {value: "2000-01-01", required: true, isValid: false, touched: false},
      phone: {value: "", required: true, isValid: false, touched: false},
      cellphone: {value: "", required: true, isValid: false, touched: false},
      email: {value: "", required: true, isValid: false, touched: false},
      email_confirmation: {value: "", required: true, isValid: false, touched: false},
    }
  }

  handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    const hash = this.state[name]
    hash.value = value
    hash.isValid = this.isValid(name, value)
    this.setState({[name]: hash})
  }

  handleFocus = (event) => {
    const name = event.target.name
    const hash = this.state[name]
    hash.touched = true
    this.setState({[name]: hash})
  }

  isValid = (name, value) => {
    console.log(name, value, !this.state[name].required || value !== "")
    return !this.state[name].required || value !== ""
  }

  handleSubmit = () => {
    var state = this.state;
    let data = Object.keys(state).reduce((acc, k) => ({...acc, [k]: state[k].value}), {});
    savePersonalData(data)
      .then((response) => {
        if (response.response.data.success) {
          this.props.onUpdateHistory({currentRoute: routes.PERSONAL_DATA, personId: response.response.data.person.id});
        }
      })
  }

  render() {
    return (
      <div className="App">
        <div className="personal-data">
          <header className="App-header">
            <h1 className="App-title">Datos Personales</h1>
          </header>
          <form>
            <Grid container justify="center">
              <Grid item xs={3}>
                <TextField
                  label="Nombre"
                  name="firstname"
                  placeholder="Ingresa tu nombre"
                  onFocus={this.handleFocus}
                  onChange={this.handleInput}
                  value={this.state.firstname.value}
                  error={this.state.firstname.touched && !this.state.firstname.isValid}
                  required={this.state.firstname.required}
                /><br/>
                <TextField
                  label="Apellido"
                  name="lastname"
                  placeholder="Ingresa tu apellido"
                  onFocus={this.handleFocus}
                  onChange={this.handleInput}
                  value={this.state.lastname.value}
                  error={this.state.lastname.touched && !this.state.lastname.isValid}
                  required={this.state.lastname.required}
                /><br/>
                <TextField
                  label="Cédula de Identidad"
                  name="identifier"
                  placeholder="Ingresa tu cédula de identidad"
                  onFocus={this.handleFocus}
                  onChange={this.handleInput}
                  value={this.state.identifier.value}
                  error={this.state.identifier.touched && !this.state.identifier.isValid}
                  required={this.state.identifier.required}
                /><br/>
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
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Teléfono Fijo"
                  name="phone"
                  placeholder="Ingresa tu número de teléfono"
                  onFocus={this.handleFocus}
                  onChange={this.handleInput}
                  value={this.state.phone.value}
                  error={this.state.phone.touched && !this.state.phone.isValid}
                  required={this.state.phone.required}
                /><br/>
                <TextField
                  label="Teléfono Celular"
                  name="cellphone"
                  placeholder="Ingresa tu número celular"
                  onFocus={this.handleFocus}
                  onChange={this.handleInput}
                  value={this.state.cellphone.value}
                  error={this.state.cellphone.touched && !this.state.cellphone.isValid}
                  required={this.state.cellphone.required}
                /><br/>
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
                /><br/>
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
                /><br/>
              </Grid>
            </Grid>
            <Button variant="raised" className="homepage-button" onClick={this.handleSubmit}>
              Guardar
            </Button>
          </form>
        </div>
      </div>
    )
  }

}

export default PersonalData