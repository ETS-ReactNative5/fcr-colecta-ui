import React from 'react';
import {emailLookup} from '../../api';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import * as routes from '../../constants/routes';
import * as Validator from '../../utils/Validator';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleSubmit = () => {
    if (this.state.email !== "" && Validator.validEmail(this.state.email)) {
      emailLookup(this.state.email)
        .then((response) => {
          this.props.onUpdateHistory({currentRoute: routes.EMAIL, ...response, email: this.state.email});
        })
    } else {
      alert('El correo no tiene un formato válido');
    }
  };

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    return (
      <div className="EmailLookup">
        <header className="App-header">
          <h1 className="App-title">¡Inscríbete ya! o ¡Invita más amigos!</h1>
        </header>
        <div>
          <form>
            <FormControl className="form-control">
              <TextField
                id="email"
                label="Email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                value={this.state.email}
                required={true}
                onChange={this.handleInput}
                type="email"
              />
            </FormControl>
            <Button variant="raised" className="homepage-button" onClick={this.handleSubmit}>
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    );
  };
}

export default EmailForm;