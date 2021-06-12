import React from 'react';
import { Link } from 'react-router-dom';

import classes from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

function CheckoutSummary({
  ingredients,
  checkoutCancelled,
  checkoutContinued,
}) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Have a good one!</h1>
      <div className={classes.BurgerFrame}>
        <Burger ingredients={ingredients} />
      </div>
      <Link to="/">
        <Button btnType="Danger" clicked={checkoutCancelled}>
          CANCEL
        </Button>
      </Link>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
}

export default CheckoutSummary;
