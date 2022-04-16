import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Avatar, IconButton } from '@mui/material';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100px",
    justifyContent: "center",
  },
  childrenDisplay: {
    borderRadius: "50%",
    height: "60px",
    width: "60px",
  },
  selected: {
    border: "1px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.primary.main,
    textAlign: "center",
  },
}));

const ChildrenDisplay = ({ name, onClick, selected, pic }) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<IconButton onClick={onClick}>
				<Avatar
					src={pic}
					className={clsx({
						[classes.childrenDisplay]: true,
						[classes.selected]: selected,
					})}></Avatar>
			</IconButton>
			<Typography variant='h6' component='div' className={classes.text}>
				{name}
			</Typography>
		</div>
	);
};

export default ChildrenDisplay;
