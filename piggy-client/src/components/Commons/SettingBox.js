import { Typography } from '@mui/material'
import React  from 'react'
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
const useStyles = makeStyles((theme) => ({
	container: { 
        display: "flex",
        flexDirection: 'column',
        backgroundColor: "#F5F5F5",
        flexGrow: '1',
        margin: '4px 15px',
        borderRadius: '10px',
        padding: '12px 10px',
        justifyContent: 'center'
	},
    body: { 
        flexGrow: "2",
        display: "flex",
        alignItems: 'center',
	},
    title:{
        flexGrow: "1",
        display: 'flex',
        alignItems: 'center',
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
