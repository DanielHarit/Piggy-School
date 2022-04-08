import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Wish from '../Wish';

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
		fontSize: '25px',
		fontWeight: 'bold',
	},
	Details: {
		fontSize: '15px',
	},
	buttonShow: {
		borderRadius: '10px',
		marginRight: 'auto',
	},
}));

const WishesSummery = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography>היעדים שלי</Typography>
			<Wish />
		</div>
	);
};

export default WishesSummery;
