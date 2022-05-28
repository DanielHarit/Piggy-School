import { Button, Skeleton, Typography } from '@mui/material';
import { Card,Box } from '@mui/material'
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../Router/Routes';
import Transactions from '../Transactions';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: 70,
		marginTop: 10,
		borderRadius: 10,
		width: '85%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	total: {
		textAlign: 'center',
		backgroundColor: '#FAFAFA',
	},
	skelaton: {
		borderRadius: '5px',
		marginBottom: '15px',
	},
	z:{
		display:'inline-flex',
		direction:'ltr',
		alignItems:'center'
	   },
	   drawdown:{
		fontSize :'35px',
	   },
	   amount:{
		fontSize :'20px',
	},
	summaryTitles:{
		display:'flex',
		justifyContent:'space-between',
		maxHeight: '24px',
	}
	  
}));

const CardHistory = ({ card, userBudget, isLoadingUserData, daysNum}) => {
	const classes = useStyles();

	const today = new Date();
	const lastDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-daysNum);

	const navigate = useNavigate();

	const goToBudget = () => navigate('/child' + routes.Budget)

	return (
		<div className={classes.root}>

			{isLoadingUserData ? (
				<>
					<Skeleton variant='rectangular' width={'100%'} height={52} className={classes.skelaton} />
					<Skeleton variant='rectangular' width={'100%'} height={120} className={classes.skelaton} />
				</>
			) : (
				<>
				<div className={classes.summaryTitles}>
					<Typography>השבוע הוצאתי</Typography>
					<Button variant='text' onClick={goToBudget}>
						הצג עוד...
					</Button>
				</div>
					<Card className={classes.total}>
						<Typography component='span' fontSize='22px'>{`${userBudget}₪ / `}</Typography>
						<Typography component='span' fontSize='35px'>
							{`${card?.transactions
							.filter((tran) => (
								new Date(tran.timestamp) >= lastDate
						   ))
							.map((transaction) => transaction.amount).reduce((a, b) => a + b, 0)}₪`}
						</Typography>
					</Card>

					<Transactions transactionsList={card?.transactions} lastDate = {lastDate}></Transactions>
				</>
			)}
		</div>
	);
};

CardHistory.propTypes = {
	card: PropTypes.object,
};
CardHistory.defaultProps = {
	card: { amount: 0, transactions: [] },
};

export default CardHistory;
