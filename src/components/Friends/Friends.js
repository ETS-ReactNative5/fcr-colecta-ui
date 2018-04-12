import React from 'react'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import Table, {TableBody, TableCell, TableHead, TableRow, TableFooter} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {saveFriends, emailLookup} from '../../api'
import * as routes from "../../constants/routes";


class Friends extends React.Component {
  constructor(props) {
    super(props)
    this.defaultValues =
      this.state = {
        firstname: {value: '', touched: false, isValid: false, required: true},
        lastname: {value: '', touched: false, isValid: false, required: true},
        email: {value: '', touched: false, isValid: false, required: true},
        cellphone: {value: '', touched: false, isValid: false, required: true},
        friends: []
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
    return !this.state[name].required || value !== ""
  }

  addFriend = () => {
    emailLookup(this.state.email.value).then(response => {
      if (response.new_user) {
        this.setState({
          friends: [...this.state.friends, {
            firstname: this.state.firstname.value,
            lastname: this.state.lastname.value,
            email: this.state.email.value,
            cellphone: this.state.cellphone.value
          }]
        })
      } else {
        alert('Ya existe un voluntario con ese correo.')
      }
      this.resetValues();
    })
  }

  deleteFriend = (idFriend) => {
    let friends = this.state.friends
    friends.splice(idFriend, 1);
    this.setState({friends: friends});
  }

  handleSubmit = () => {
    saveFriends({friends: this.state.friends})
      .then((response) => {
        this.props.onUpdateHistory({currentRoute: routes.FRIENDS, ...response});
      })
  }

  resetValues = () => {
    this.setState({
      firstname: {value: '', touched: false, isValid: false, required: true},
      lastname: {value: '', touched: false, isValid: false, required: true},
      email: {value: '', touched: false, isValid: false, required: true},
      cellphone: {value: '', touched: false, isValid: false, required: true}
    })
  }

  render() {
    return (
      <div className="friends">
        <header className="App-header">
          <h1 className="App-title">Inscribe a tus amigos</h1>
        </header>
        <Typography>
          Invita a tus amigos a participar en la colecta.
        </Typography>
        <Typography>
          Recuerda que tienes que invitar al menos a 5 amigos para reservar un punto y luego entre todos completar un
          grupo de 10.
        </Typography>
        <Grid container>
          <Grid item>
            <form>
              <FormControl className="form-control">
                <TextField
                  label="Nombre"
                  name="firstname"
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
                  onFocus={this.handleFocus}
                  onChange={this.handleInput}
                  value={this.state.lastname.value}
                  error={this.state.lastname.touched && !this.state.lastname.isValid}
                  required={this.state.lastname.required}
                />
              </FormControl><br/>
              <FormControl className="form-control">
                <TextField
                  label="Correo"
                  name="email"
                  onFocus={this.handleFocus}
                  onChange={this.handleInput}
                  value={this.state.email.value}
                  error={this.state.email.touched && !this.state.email.isValid}
                  required={this.state.email.required}
                />
              </FormControl><br/>
              <FormControl className="form-control">
                <TextField
                  label="Celular"
                  name="cellphone"
                  onFocus={this.handleFocus}
                  onChange={this.handleInput}
                  value={this.state.cellphone.value}
                  error={this.state.cellphone.touched && !this.state.cellphone.isValid}
                  required={this.state.cellphone.required}
                />
              </FormControl><br/>
              <Button variant="raised" className="homepage-button" onClick={this.addFriend}>
                Agregar amigo
              </Button>
            </form>
          </Grid>
        </Grid>
        {this.state.friends.length > 0 &&
        <Table>
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.friends.map((friend, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{friend.firstname}</TableCell>
                  <TableCell>{friend.lastname}</TableCell>
                  <TableCell>{friend.email}</TableCell>
                  <TableCell>{friend.cellphone}</TableCell>
                  <TableCell>
                    <IconButton aria-label="Delete" onClick={() => this.deleteFriend(idx)}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                {
                  this.state.friends.length >= 5 &&
                  <Button variant="raised" onClick={this.handleSubmit}>
                    Guardar
                  </Button>
                }
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        }
      </div>
    )
  }
}

export default Friends;