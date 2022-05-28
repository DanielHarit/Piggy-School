import * as React from 'react';
import { Typography, Button } from '@mui/material';
import config from '../../conf.json';
import CardDetails from '../../components/CardInfo/CardDetails';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

import CardHistory from '../../components/CardInfo/CardHistory';
import WishesSummery from '../../components/WishesSummery';
import StoriesBar from '../../components/StoriesBar';
import { useStories } from '../../StoriesContext';
import Confetti from 'react-confetti';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
	//     root:{
	//     },
	title: {
		// justifyContent: 'space-between',
		// maxHeight: '24px',
	},
}));

const ChildHomePage = () => {
	const classes = useStyles();
	const [cardData, setCardData] = useState(null);
	const [userName, setUserName] = useState('');
	const [userBudget, setUserBudget] = useState(0);
	const [wishes, setWishes] = useState({});
	const [amountLeftInCard, setAmountLeftInCard] = useState(0);
	const [isLoadingUserData, setIsLoadingUserData] = useState(true);
	const stories = useStories();
	const [confettiNum, setConfettiNum] = useState(0);
	const { state } = useLocation();

	useEffect(async () => {
		const userMail = JSON.parse(sessionStorage.getItem('profileObj'))['email'];
		const user = await axios.get(`${config.PIGGY_DB_URL}/children/mail/${userMail}`);
		setUserName(user.data.UserSettings.DisplayName);
		const userWishes = {};
		user.data.WishList.forEach((wish) => (userWishes[wish.priority] = wish));
		setWishes(userWishes);
		const userTotalBudget = Object.values(user.data.Budget).reduce((sum, categoryAmount) => sum + +categoryAmount, 0);
		setUserBudget(userTotalBudget);
		try {
			const userCard = await axios.get(`${config.PAYMENT_SERVICE_URL}/card/${user.data._id}`);
			setCardData(userCard.data);
			setAmountLeftInCard(userCard.data.amount - userTotalBudget >= 0 ? userCard.data.amount - userTotalBudget : 0);
		} catch (err) {
			setCardData({
				transactions: [],
			});
		} finally {
			setIsLoadingUserData(false);
		}
	}, []);

	useEffect(() => {
		if (state?.swalObj) {
			Swal.fire(state.swalObj);
			setConfettiNum(200);
			setTimeout(() => setConfettiNum(0), 3000);
		}
	}, [state]);

	return (
		<div className={classes.root}>
			<Confetti numberOfPieces={confettiNum} />
			<StoriesBar />
			<CardDetails amount={cardData?.amount} details={cardData?.cardDetails} />
			<WishesSummery wishes={wishes} currAmount={amountLeftInCard} isLoadingUserData={isLoadingUserData} />
			<div className={classes.title}>
				<CardHistory card={cardData} userBudget={userBudget} isLoadingUserData={isLoadingUserData} daysNum={7} />
			</div>
		</div>
	);
};

export default ChildHomePage;
