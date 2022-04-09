import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import routes from '../../components/Router/Routes';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 15,
		width: '85%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	explain: {
		margin: '20px 0px',
	},
	addBtn: {
		fontSize: '16px',
	},
}));

const ChildAddWish = () => {
	const classes = useStyles();
	const { state } = useLocation();
	const navigate = useNavigate();

	const goToWishList = () => navigate(routes.ChildWishList, { state });

	return (
		<div className={classes.root}>
			<IconButton color='primary' component='span' onClick={goToWishList}>
				<ArrowForwardIosIcon />
			</IconButton>
			<Typography variant='h6'>הוספת יעד</Typography>
			<Button className={classes.addBtn} variant='contained' fullWidth startIcon={<SaveIcon />} onClick={goToWishList}>
				שמור יעד
			</Button>
		</div>
	);
};

export default ChildAddWish;
