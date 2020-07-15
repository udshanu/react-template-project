import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  // input: {
  //   display: 'none',
  // }
}));

const SelectedFile = '';

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState(
    {
      SelectedFile: 'roshan'
    }
  );

  const handleChange = event => {
    setValues({
      ...values,
      SelectedFile: event.target.files[0]
    });

    console.log('Values: ', values.SelectedFile);
    console.log('File: ', event.target.files[0]);
    console.log('File Name: ', event.target.files[0].name);
  };

  const fileUploadHandler = () => {
    //handleChange();

console.log('Called handleChange');
    const fd = new FormData();
    fd.append('image', values.SelectedFile)
    console.log('Value Selected File: ',values.SelectedFile);
    //Axios.post();
  }

  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/avatars/avatar_11.png'
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              John Doe
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.city}, {user.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({user.timezone})
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        {/* <Button variant="contained" color="primary" component="span">
          Upload
        </Button> */}
      
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          component="span"
          onClick={fileUploadHandler}
        >
          Upload picture
        </Button>
        </label>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
