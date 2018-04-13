import React from 'react';
import { validateAccount } from "../../api";
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid'
import { Link } from "react-router-dom";
import * as routes from '../../constants/routes';

class ConfirmAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      processing: true
    };
  }

  componentDidMount = () => {
    validateAccount({token: this.props.match.params.token})
      .then(response => {
        this.setState({
          processing: false,
          isValid: !!response.success
        })
    })
  };

  render() {
    const {processing, isValid} = this.state;
    return (
      <div className="confirm-account">
        <Grid container justify="center">
          <Grid item xs={3}>
        <Card>
          <CardContent>
            <Typography variant="headline" component="h3">
              Confirmación de registro
            </Typography>
            <Typography component="p">
              {processing && "Validando..."}
              {!processing && isValid && "Registro confirmado"}
              {!processing && !isValid && "No se pudo confirmar el registro"}
            </Typography>
          </CardContent>
          <CardActions>
            {
              !processing &&
              <Link to={routes.LANDING}>Inicio</Link>
            }
          </CardActions>
        </Card>
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default withStyles({})(ConfirmAccount);