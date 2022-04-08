import { Typography } from '@mui/material'
import React  from 'react'
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
const useStyles = makeStyles((theme) => ({
	container: { 
        display: "flex",
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: '1px 15px',
        borderRadius: '10px',
        padding: '12px 10px'
	},
    body: { 
        display: "flex",
	},
    title:{
        paddingBottom: '6px'
    }
}));

const SettingBox = ({title,children, className}) => {

const classes = useStyles();

  return (
      <div className={classes.container}>
          <div className={classes.title}>
             <Typography variant='h6'>{title}</Typography>
          </div>
          <div className={clsx(classes.body,className)}>
              {children}
          </div>
      </div>
  )
}

export default SettingBox;
