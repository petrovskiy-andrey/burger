import React from 'react';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

function ContactData({
  handleOrder,
  orderForm,
  handleInputChange,
  formIsValid,
}) {
  const formElements = [];

  for (const [id, config] of Object.entries(orderForm)) {
    formElements.push(
      <Input
        key={id}
        elementType={config.elementType}
        name={id}
        elementConfig={config.elementConfig}
        value={config.value}
        touched={config.touched}
        valid={config.valid}
        shouldValidate={config.validation}
        handleChange={(event) => handleInputChange(event, id)}
      />
    );
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      <form onSubmit={handleOrder}>
        {formElements}
        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    </div>
  );
}

export default ContactData;
