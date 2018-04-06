import React from 'react'
import {emailLookup} from '../../api'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import * as routes from '../../constants/routes'

class EmailForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      isRegistered: false
    }
  }

  handleSubmit = () => {
    if (this.state.email !== "") {
      emailLookup(this.state.email)
        .then((response) => {
          this.props.onUpdateHistory({currentRoute: routes.EMAIL, isRegistered: !!response.response.new_user});
        })
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <div className="EmailLookup">
          <header className="App-header">
            <h1 className="App-title">¡Inscríbete ya! o ¡Invita más amigos!</h1>
          </header>
          <div>
            <form>
              <TextField
                id="email"
                label="Email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                className="homepage-text-field"
                value={this.state.email}
                required={true}
                onChange={this.handleInput}
                type="email"
              />
              <Button variant="raised" className="homepage-button" onClick={this.handleSubmit}>
                Ingresar
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailForm;