import React from 'react';

import classes from './Order.css';

function Order({ ingredients, price }) {
  const transformedIngredients = Object.keys(ingredients)
    .filter((ig) => Boolean(ingredients[ig]))
    .map((ig) => (
      <span key={ig} className={classes.Ingredient}>
        {ig} ({ingredients[ig]})
      </span>
    ));

  const transformedPrice = price.toFixed(2);

  return (
    <div className={classes.Order}>
      <p>Ingredients: {transformedIngredients}</p>
      <p>
        Price: <strong>${transformedPrice}</strong>
      </p>
    </div>
  );
}

export default Order;
