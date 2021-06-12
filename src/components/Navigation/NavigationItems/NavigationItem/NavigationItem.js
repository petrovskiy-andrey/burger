import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const NavigationItem = ({ children, link }) => (
  <li className={classes.NavigationItem}>
    <NavLink to={link} exact activeClassName={classes.active}>
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
