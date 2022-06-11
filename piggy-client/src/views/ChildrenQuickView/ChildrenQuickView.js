import { useLocation } from 'react-router-dom';
import ChildrenDisplayAll from '../../components/ChildrenBoardData/ChildrenDisplayAll';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../conf.json';
import CardHistory from '../../components/CardInfo/CardHistory';
import routes from '../../components/Router/Routes';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import WishesSummery from '../../components/WishesSummery';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Wish from '../../components/Wish';
import Skeleton from '@mui/material/Skeleton';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 15,
		// width: '85%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	title: {
		marginTop: 15,
		width: '85%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	explain: {
		margin: '20px 0px',
	},
	wishesContainer: {
		marginBottom: '10px',
	},
	wishes: {
		width: '85%',
		margin: 'auto',
	},
	skelaton: {
		width: '85%',
		margin: 'auto',
		borderRadius: '5px',
		height: '120px',
	},
}));

const ChildrenQuickView = () => {
	const classes = useStyles();

	const [cardData, setCardData] = useState(null);
	const [userBudget, setUserBudget] = useState(0);
	const [amountLeftInCard, setAmountLeftInCard] = useState(0);
	const [isLoadingUserData, setIsLoadingUserData] = useState(true);
	const [userId, setUserId] = useState('');
	const [childName, setChildName] = useState('');
	const [wishes, setWishes] = useState();
	const [isShowMoreWishes, setIsShowMoreWishes] = useState(true);
	// const [selectedChildrenId, setSelectedChildrenId] = useState();

	const navigate = useNavigate();

	const {
		state: { selectedChildrenId },
	} = useLocation();

	useState(async () => {
		try {
			const userMail = JSON.parse(sessionStorage.getItem('profileObj'))['email'];
			const user = await axios.get(`${config.PIGGY_DB_URL}/parent/mail/${userMail}`);
			setUserId(user.data._id);

			const child = await axios.get(`${config.PIGGY_DB_URL}/Children/${selectedChildrenId}`);

			setChildName(child.data.UserSettings.DisplayName);

			//  setUserName({selectedChildrenId});
			const userTotalBudget = Object.values(child.data.Budget).reduce((sum, categoryAmount) => sum + categoryAmount, 0);
			setUserBudget(userTotalBudget);

			const userCard = await axios.get(`${config.PAYMENT_SERVICE_URL}/card/${selectedChildrenId}`);
			setCardData(userCard.data);

			let leftInCard = userCard.data.amount - userTotalBudget >= 0 ? userCard.data.amount - userTotalBudget : 0;
			setAmountLeftInCard(leftInCard);

			const userWishes = {};
			child.data.WishList.sort((a, b) => a.priority - b.priority).forEach((wish) => {
				const currAmount = leftInCard;
				leftInCard = leftInCard - wish.cost < 0 ? 0 : leftInCard - wish.cost;
				return (userWishes[wish.priority] = { ...wish, currAmount });
			});
			setWishes(userWishes);
		} catch (err) {
			setCardData({
				transactions: [],
			});
			setWishes({});
		} finally {
			setIsLoadingUserData(false);
		}
	}, []);

	return (
		<div className={classes.root}>
			<IconButton onClick={() => navigate(-1)} color='primary' edge='start'>
				<ArrowForwardIosIcon />
			</IconButton>

			<Typography fontSize='20px' className={classes.title}>
				המצב של {childName}
			</Typography>

			<div className={classes.title}>
				<Typography> יעדים </Typography>
			</div>

			{wishes ? (
				<div className={classes.wishes}>
					{Object.values(wishes).length === 0 && (
						<Typography className={classes.explain}>
							כתיבת יעדי חיסכון עוזרת לנו להשיג את מה שאנחנו רוצים :) ל{childName} אין עדיין יעדים...
						</Typography>
					)}
					{isShowMoreWishes && wishes[1] ? (
						<div className={classes.wishesContainer}>
							<Wish
								key={wishes[1].id}
								name={wishes[1].name}
								pic={wishes[1].pic}
								cost={wishes[1].cost}
								currAmount={wishes[1].currAmount}
								priority={wishes[1].priority}
							/>
						</div>
					) : (
						<div className={classes.wishesContainer}>
							{Object.values(wishes).map((wish, i) => (
								<Wish
									key={wish.id}
									name={wish.name}
									pic={wish.pic}
									cost={wish.cost}
									currAmount={wish.currAmount}
									priority={wish.priority}
								/>
							))}
						</div>
					)}
					{Object.keys(wishes).length > 1 && (
						<Button variant='text' onClick={() => setIsShowMoreWishes((prev) => !prev)}>
							{isShowMoreWishes ? 'הצג עוד...' : 'הצג פחות...'}
						</Button>
					)}
				</div>
			) : (
				<Skeleton variant='rectangular' className={classes.skelaton} />
			)}

			<CardHistory
				card={cardData}
				userBudget={userBudget}
				isLoadingUserData={isLoadingUserData}
				daysNum={7}
				selectedChildrenId={selectedChildrenId}></CardHistory>
		</div>
	);
};

export default ChildrenQuickView;
