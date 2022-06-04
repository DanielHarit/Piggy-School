import { Card, Typography, Box, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 15,
		width: '85%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	total: {
		borderRadius: 15,
		backgroundColor: 'purple',
		color: 'white',
		padding: '25px',
	},
	amount: {
		fontSize: '20px',
		fontWeight: 'bold',
		marginRight: '5px',
		marginBottom: '-1px',
	},
	row: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	Details: {
		fontSize: '15px',
	},
	buttonShow: {
		borderRadius: '10px',
		marginRight: 'auto',
	},
	skelaton: {
		borderRadius: '15px',
		backgroundColor: 'purple',
	},
}));

const CardDetails = ({ amount, budget, spendings, isLoadingUserData }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography>הכרטיס שלי</Typography>
			{isLoadingUserData ? (
				<Skeleton variant='rectangular' width={'100%'} height={137} className={classes.skelaton} />
			) : (
				<Card className={classes.total}>
					<Box className={classes.row}>
						<Typography className={classes.Details}>כמה יש לי באשראי?</Typography>
						<Typography className={classes.amount}>₪{amount}</Typography>
					</Box>
					<Box className={classes.row}>
						<Typography className={classes.Details}>מה התקציב השבוע שהגדרתי?</Typography>
						<Typography className={classes.amount}>₪{budget}</Typography>
					</Box>
					<Box className={classes.row}>
						<Typography className={classes.Details}>כמה הוצאתי השבוע?</Typography>
						<Typography className={classes.amount}>₪{spendings}</Typography>
					</Box>
					{/* <Typography className={classes.Details}>פרטי האשראי מחכים במייל :)</Typography> */}

					{/* <Typography className={classes.Details}>
                פרטי כרטיס:
              </Typography>
              <Typography className={classes.Details} sx={{textAlign:'left'}}>
                { details.cardNumber ? details.cardNumber : placeholder.number  }
              </Typography>
               <Typography className={classes.Details}>
                { details.expirationMonth ? details.expirationMonth : placeholder.expirationMonth } / 
                { details.expirationYear ? details.expirationYear : placeholder.expirationYear}
              </Typography> 
                  { <Typography className={classes.Details}>
                    { details.cvc ? details.cvc : placeholder.cvc }
                  </Typography>    */}
					{/* { <CardActions>
                  <Fab variant="extended" size="medium" sx={{marginLeft: 'auto'}}>להצגת הפרטים</Fab>
                </CardActions>  */}
				</Card>
			)}
		</div>
	);
};

// CardDetails.propTypes = {
// 	details: PropTypes.object,
// 	placeholder: PropTypes.object,
// 	amount: PropTypes.number,
// };
// CardDetails.defaultProps = {
// 	amount: 0,
// 	details: {
// 		cardNumber: '•••• •••• •••• ••••',
// 		expirationMonth: '••',
// 		expirationYear: '••',
// 		cvc: '•••',
// 	},
// 	placeholder: {
// 		number: '•••• •••• •••• ••••',
// 		expirationMonth: '••',
// 		expirationYear: '••',
// 		cvc: '•••',
// 	},
// };

export default CardDetails;
