import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useStyles from './useStyles';
import config from '../../conf.json';
import axios from 'axios';
import { BudgetBar } from './components/BudgetBar';
import { Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const BudgetView = () => {
	const classes = useStyles();
	const { state } = useLocation();
	const [user, setUser] = useState(null);
	const [card, setCard] = useState(null);
	const navigate = useNavigate();

	const fetchUser = useCallback(() => {
		let userMail = JSON.parse(sessionStorage.getItem('profileObj'))['email'];

		if (state?.selectedChildrenId) {
			axios.get(`${config.PIGGY_DB_URL}/Children/${state.selectedChildrenId}`).then((res) => {
				setUser(res.data);
			});
		} else {
			axios
				.get(`${config.PIGGY_DB_URL}/children/mail/${userMail}`)
				.then((res) => {
					setUser(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const fetchCard = useCallback(() => {
		axios
			.get(`${config.PAYMENT_SERVICE_URL}/card/${user._id}`)
			.then((res) => {
				setCard(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user]);

	const handleSaveBudget = useCallback(() => {
		axios
			.put(`${config.PIGGY_DB_URL}/children/Budget/${user._id}`, {
				newBudget: user.Budget,
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user]);

	const transactionsMap = useMemo(() => {
		if (!card) {
			return null;
		}
		const now = new Date();
		const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
		card.transactions = card.transactions.filter((d) => {
			let currTranTime = new Date(d.timestamp);
			if (currTranTime.getTime() >= lastWeek.getTime()) {
				return d;
			}
		});
		return card.transactions.reduce((acc, t) => {
			if (!acc[t.type]) {
				acc[t.type] = t.amount;
			} else {
				acc[t.type] += t.amount;
			}
			return acc;
		}, {});
	}, [card]);

	const budgets = useMemo(() => {
		if (!user || !user.Budget) {
			return null;
		}
		return Object.keys(user.Budget).map((category) => ({
			category,
			amount: user.Budget[category],
		}));
	}, [user]);

	const totalBudget = useMemo(() => {
		if (!user || !user.Budget) {
			return null;
		}
		return Object.keys(user.Budget).reduce((acc, category) => (acc += +user.Budget[category]), 0);
	});

	const handleBudgetChange = useCallback((ev) => {
		setUser((prevUser) => {
			return {
				...prevUser,
				Budget: { ...prevUser.Budget, [ev.target.name]: ev.target.value },
			};
		});
	}, []);

	useEffect(() => {
		fetchUser();
	}, []);

	useEffect(() => {
		if (user) {
			fetchCard();
		}
	}, [fetchCard, user]);

	return (
		<>
			{state?.selectedChildrenId && (
				<IconButton className={classes.back} onClick={() => navigate(-1)} color='primary' edge='start'>
					<ArrowForwardIosIcon />
				</IconButton>
			)}
			<div className={classes.root}>
				{!budgets || !transactionsMap ? (
					'טוען את התקציב...'
				) : (
					<>
						<div className={classes.titlesContainer}>
							{state?.selectedChildrenId ? (
								<Typography className={classes.title}>התקציב השבועי של {user.UserSettings.DisplayName}</Typography>
							) : (
								<Typography className={classes.title}>התקציב השבועי שלי</Typography>
							)}
							<Typography className={classes.totalBudget}>{`${totalBudget || 0} ₪`}</Typography>
						</div>
						{budgets.map((b) => {
							return (
								<BudgetBar
									handleBudgetChange={handleBudgetChange}
									moneySpent={transactionsMap[b.category] || 0}
									budget={b}
									className={classes.budgetBar}
									handleSaveBudget={handleSaveBudget}
								/>
							);
						})}
					</>
				)}
			</div>
		</>
	);
};
