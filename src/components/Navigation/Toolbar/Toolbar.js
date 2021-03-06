import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = ({ isAuth, drawerToggleClicked }) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={isAuth} />
    </nav>
  </header>
);

export default Toolbar;
