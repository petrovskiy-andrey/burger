import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { purchaseBurger } from '../../store/actions';
import axios from '../../config/axios-orders';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';

import orderForm from '../../variables/orderForm';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Checkout extends Component {
  state = {
    orderForm,
    formIsValid: false,
  };

  handleOrder = (event) => {
    event.preventDefault();

    const formData = Object.keys(this.state.orderForm).reduce(
      (acc, key) =>
        Object.assign(acc, { [key]: this.state.orderForm[key].value }),
      {}
    );
    const { deliveryMethod, ...customerData } = formData;

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      userId: this.props.userId,
      customerData,
      deliveryMethod,
    };

    this.props.onBurgerPurchase(order, this.props.token, this.props.history);
  };

  handleCheckoutCancelled = () => {
    this.props.history.goBack();
  };

  handleCheckoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    return isValid;
  };

  handleInputChange = (event, id) => {
    event.preventDefault();

    const updatedOrderForm = { ...this.state.orderForm };
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

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    return (
      <div>
        {!this.props.ingredients && <Redirect to="/" />}
        {this.props.ingredients && (
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.handleCheckoutCancelled}
            checkoutContinued={this.handleCheckoutContinued}
          />
        )}
        {!this.props.loading && (
          <Route
            path={this.props.match.url + '/contact-data'}
            render={() => (
              <ContactData
                handleOrder={this.handleOrder}
                orderForm={this.state.orderForm}
                handleInputChange={this.handleInputChange}
                formIsValid={this.state.formIsValid}
              />
            )}
          />
        )}
        {this.props.loading && <Spinner />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerPurchase: (orderData, token, history) =>
      dispatch(purchaseBurger(orderData, token, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Checkout, axios));
