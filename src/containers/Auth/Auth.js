import React, { Component } from 'react';
import classes from './Auth.css';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { auth, setAuthRedirectPath } from '../../store/actions';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.isBuildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    return isValid;
  };

  // noinspection DuplicatedCode
  handleInputChange = (event, id) => {
    event.preventDefault();

    const updatedOrderForm = { ...this.state.controls };
    const updatedFormElement = { ...updatedOrderForm[id] };
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;
    updatedOrderForm[id] = updatedFormElement;

    let formIsValid = true;

    for (const config of Object.values(updatedOrderForm)) {
      if (config.validation && !config.valid) {
        formIsValid = false;
      }
    }

    this.setState({ controls: updatedOrderForm, formIsValid: formIsValid });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  handleSwitchAuthMode = () => {
    this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
  };

  render() {
    const form = [];
    for (const [id, config] of Object.entries(this.state.controls)) {
      form.push(
        <Input
          key={id}
          elementType={config.elementType}
          name={id}
          elementConfig={config.elementConfig}
          value={config.value}
          touched={config.touched}
          valid={config.valid}
          shouldValidate={config.validation}
          handleChange={(event) => this.handleInputChange(event, id)}
        />
      );
    }

    return (
      <React.Fragment>
        {!this.props.loading && !this.props.isAuth && (
          <div className={classes.Auth}>
            {this.props.error && <p>{this.props.error.message}</p>}

            <form onSubmit={this.handleSubmit}>
              {form}
              <Button btnType="Success" disabled={!this.state.formIsValid}>
                SUBMIT
              </Button>
            </form>
            <Button clicked={this.handleSwitchAuthMode} btnType="Danger">
              SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
          </div>
        )}

        {this.props.loading && <Spinner />}
        {this.props.isAuth && <Redirect to={this.props.authRedirectPath} />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: Boolean(state.auth.token),
    authRedirectPath: state.auth.authRedirectPath,
    isBuildingBurger: state.burgerBuilder.isBuildingBurger,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
