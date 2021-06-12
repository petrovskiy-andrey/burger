import * as actionTypes from './action.types';
import axios from '../../config/axios-orders';

const purchaseBurgerSuccess = () => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
});

const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData, token, history) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then((res) => dispatch(purchaseBurgerSuccess()))
      .catch((err) => dispatch(purchaseBurgerFail(err)))
      .finally(history.push('/'));
  };
};

const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

const fetchOrdersFail = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());

    axios
      .get(`/orders.json?auth=${token}`)
      .then((res) => {
        const fetchedOrders = Object.keys(res.data)
          .map((key) => ({
            ...res.data[key],
            id: key,
          }))
          .filter((order) => order.userId === userId);

        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => dispatch(fetchOrdersFail(err)));
  };
};
