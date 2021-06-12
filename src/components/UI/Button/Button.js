import React from 'react';

import classes from './Button.css';

const Button = ({ children, btnType, clicked, disabled }) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
