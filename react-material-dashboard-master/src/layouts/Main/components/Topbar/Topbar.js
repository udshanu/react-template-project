import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { connect } from 'react-redux'
import { signOut } from '../../../../store/actions/authActions'
import { Redirect } from 'react-router-dom';
import authServices from '../../../../store/services/authServices';
import { AUTH_ACTION_TYPES } from '../../../../store/actions/actionTypes/authActionTypes';
import { AuthContext } from 'context/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const authContexts = useContext(AuthContext)

  console.log('props in topbar ', props);

  const classes = useStyles();

  const [notifications] = useState([]);

  const handleSignOut = () =>{
    authServices.auth().signOut().then((response) => {
      console.log('Logout Response: ', response);

      localStorage.removeItem('token');
      authContexts.countDispatch({type: AUTH_ACTION_TYPES.SIGNOUT_SUCCESS});
      
  }).catch((err) => {
    console.log('LogOut Error: ', err);
    authContexts.countDispatch({type: AUTH_ACTION_TYPES.SIGNOUT_ERROR, err});
})
  }

console.log('Logout authContexts.countState.token ', authContexts.countState.token)
  if (!authContexts.countState.token) return <Redirect to='/sign-in' />

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            // onClick={signOut}
            onClick={handleSignOut}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};


export default Topbar;
