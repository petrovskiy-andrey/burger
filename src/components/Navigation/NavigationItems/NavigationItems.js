import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ({ isAuth }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {isAuth && <NavigationItem link="/orders">Orders</NavigationItem>}
    {isAuth && <NavigationItem link="/logout">Logout</NavigationItem>}
    {!isAuth && <NavigationItem link="/auth">Authenticate</NavigationItem>}
  </ul>
);

export default NavigationItems;
