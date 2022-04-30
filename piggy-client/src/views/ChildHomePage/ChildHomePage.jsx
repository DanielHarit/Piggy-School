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
	const stories = useStories()

	const isAllStoriesSeen = React.useMemo(() => {
    return stories && stories.length
      ? stories.every((story) => story.seen)
      : false
  }, [stories])

	useEffect(async () => {
		const userMail = JSON.parse(sessionStorage.getItem('profileObj'))['email'];
		const user = await axios.get(`${config.PIGGY_DB_URL}/children/mail/${userMail}`);
		setUserName(user.data.UserSettings.DisplayName);
		const userWishes = {};
		user.data.WishList.forEach((wish) => (userWishes[wish.priority] = wish));
		setWishes(userWishes);
		const userTotalBudget = Object.values(user.data.Budget).reduce((sum, categoryAmount) => sum + categoryAmount, 0);
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

	return (
		<div className={classes.root}>
      		<StoriesBar isAllStoriesSeen={isAllStoriesSeen} />
			<CardDetails amount={cardData?.amount} details={cardData?.cardDetails} />
			<WishesSummery wishes={wishes} currAmount={amountLeftInCard} isLoadingUserData={isLoadingUserData} />
			<div className={classes.title}>
				<Typography>השבוע הוצאתי</Typography>
				<CardHistory card={cardData} userBudget={userBudget} isLoadingUserData={isLoadingUserData} daysNum={7}/>
			</div>
		</div>
	);
};

export default ChildHomePage;
