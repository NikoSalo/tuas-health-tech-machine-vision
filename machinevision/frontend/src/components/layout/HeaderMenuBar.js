import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { authTokenState } from '../../store';
import { handleLogout } from '../../utils/auth';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HeaderMenuBar = ({ userState }) => {
  const classes = useStyles();
  const setAuthTokenState = useSetRecoilState(authTokenState);

  const onLogoutClick = () => {
    handleLogout(userState.token)
      .then(() => {
        localStorage.removeItem('token');
        setAuthTokenState({
          token: null,
        });
      })
      .catch((err) => {
        // TODO: Add error handling
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Link
            component={RouterLink}
            to='/'
            color='inherit'
            underline='none'
            variant='h6'
            className={classes.title}
          >
            Health Tech Lab - Machine Vision
          </Link>
          {userState.isAuthenticated && (
            <>
              <Typography>{userState.user.username}</Typography>
              <Button onClick={onLogoutClick} color='inherit'>
                Log out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderMenuBar;
