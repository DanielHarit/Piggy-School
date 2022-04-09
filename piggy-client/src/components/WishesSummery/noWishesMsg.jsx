import { Paper, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#FAFAFA',
		padding: '25px',
	},
	desc: {
		fontSize: '15px',
	},
	btn: {
		textAlign: 'end',
	},
	btnText: {
		fontSize: '15px',
		fontWeight: 'bold',
	},
}));

const NoWishesMsg = ({ goToWishList }) => {
	const classes = useStyles();

	return (
		<Paper className={classes.root}>
			<Typography className={classes.desc}>כתיבת יעדי חיסכון עוזרת לנו להשיג את מה שאנחנו רוצים :) </Typography>
			<div className={classes.btn}>
				<Button className={classes.btnText} onClick={goToWishList}>
					לחצו כאן כדי להתחיל!
				</Button>
			</div>
		</Paper>
	);
};

export default NoWishesMsg;
