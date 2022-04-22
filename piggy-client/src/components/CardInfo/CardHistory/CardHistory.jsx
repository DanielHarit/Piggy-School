import { Skeleton, Typography } from '@mui/material';
import { Card,Box } from '@mui/material'
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
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
	   }
	  
}));

const CardHistory = ({ card, userBudget, isLoadingUserData }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{/* <Typography>החודש הוצאתי..</Typography> */}

			{isLoadingUserData ? (
				<>
					<Skeleton variant='rectangular' width={'100%'} height={52} className={classes.skelaton} />
					<Skeleton variant='rectangular' width={'100%'} height={120} className={classes.skelaton} />
				</>
			) : (
				<>
					<Card className={classes.total}>
						<Typography component='span' fontSize='22px'>{`${userBudget}₪ / `}</Typography>
						<Typography component='span' fontSize='35px'>
							{`${card?.transactions.map((transaction) => transaction.amount).reduce((a, b) => a + b, 0)}₪`}
						</Typography>
					</Card>

					<Transactions transactionsList={card?.transactions}></Transactions>
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
