import React, { Component, Fragment } from 'react';
import axios from '../../config/axios-orders';
import { connect } from 'react-redux';
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  setAuthRedirectPath,
} from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onIngredientsInitialized();
  }

  updatePurchaseState = (ingredients) =>
    Object.values(ingredients).reduce((sum, el) => sum + el, 0) > 0;

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => this.props.history.push('/checkout');

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {this.props.ingredients && (
            <OrderSummary
              ingredients={this.props.ingredients}
              price={this.props.totalPrice}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
            />
          )}
        </Modal>
        {this.props.ingredients && (
          <Fragment>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.ingredients)}
              ordered={this.purchaseHandler}
              price={this.props.totalPrice}
              isAuth={this.props.isAuth}
            />
          </Fragment>
        )}
        {this.props.error && <p>Ingredients can't be loaded</p>}
        {!this.props.ingredients && <Spinner />}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: Boolean(state.auth.token),
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredient) => dispatch(addIngredient(ingredient)),
    onIngredientRemoved: (ingredient) => dispatch(removeIngredient(ingredient)),
    onIngredientsInitialized: () => dispatch(initIngredients()),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
