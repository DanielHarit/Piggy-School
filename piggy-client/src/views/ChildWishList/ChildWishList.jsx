import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Wish from '../../components/Wish';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
	wishesContainer: {
		marginBottom: '10px',
	},
}));

const ChildWishList = () => {
	const classes = useStyles();
	const { state } = useLocation();
	const navigate = useNavigate();

	const goToAddWish = () => navigate(routes.ChildAddWish, { state });

	const [wishes, setWishes] = useState({});

	useEffect(() => {
		const wishes = { ...state.wishes };
		let leftAmount = state.currAmount;
		for (let index = 0; index < Object.keys(wishes).length; index++) {
			wishes[index + 1].priority = index + 1;
			wishes[index + 1].currAmount = leftAmount;
			leftAmount = leftAmount === 0 ? 0 : leftAmount - wishes[index + 1].cost > 0 ? leftAmount - wishes[index + 1].cost : 0;
		}
		setWishes(wishes);
	}, [state]);

	return (
		<div className={classes.root}>
			<Typography variant='h6'>היעדים שלי</Typography>
			{Object.keys(wishes).length === 0 && <Typography className={classes.explain}>כתיבת יעדי חיסכון עוזרת לנו להשיג את מה שאנחנו רוצים :) זה המקום להתחיל!</Typography>}
			<div className={classes.wishesContainer}>
				{Object.values(wishes).map((wish) => (
					<Wish key={wish.id} name={wish.name} pic={wish.pic} cost={wish.cost} currAmount={wish.currAmount} priority={wish.priority} />
				))}
			</div>
			<Button className={classes.addBtn} variant='contained' fullWidth startIcon={<AddIcon />} onClick={goToAddWish}>
				הוספת יעד
			</Button>
		</div>
	);
};

export default ChildWishList;
