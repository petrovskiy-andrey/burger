const orderForm = {
  name: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your Name',
    },
    value: '',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your E-Mail',
    },
    value: '',
    validation: {
      required: true,
      minLength: 5,
    },
    valid: false,
    touched: false,
  },
  city: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your City',
    },
    value: '',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  street: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your Street',
    },
    value: '',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  deliveryMethod: {
    elementType: 'select',
    elementConfig: {
      options: [
        { value: 'Fastest', displayValue: 'Fastest' },
        { value: 'Cheapest', displayValue: 'Cheapest' },
        { value: 'Happy Medium', displayValue: 'Happy Medium' },
      ],
    },
    value: 'Fastest',
  },
};

export default orderForm;
