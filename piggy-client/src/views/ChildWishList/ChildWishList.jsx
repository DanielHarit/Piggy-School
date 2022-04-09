import * as React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	//     root:{
	//     },
}));

const ChildWishList = () => {
	const classes = useStyles();

	return <div className={classes.root}>wish list</div>;
};

export default ChildWishList;
