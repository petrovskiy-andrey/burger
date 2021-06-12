import * as actionTypes from '../actions/action.types';
import deepCopy from '../../variables/deepCopy';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  isBuildingBurger: false,
};

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      const newState = deepCopy(state);
      newState.ingredients[action.ingredient]++;
      newState.totalPrice += INGREDIENT_PRICES[action.ingredient];
      newState.isBuildingBurger = true;
      return newState;
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const newState = deepCopy(state);
      newState.ingredients[action.ingredient]--;
      newState.totalPrice -= INGREDIENT_PRICES[action.ingredient];
      newState.isBuildingBurger = true;
      return newState;
    }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        isBuildingBurger: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default burgerReducer;
