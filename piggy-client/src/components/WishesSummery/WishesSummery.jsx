import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Wish from '../Wish';
import NoWishesMsg from './noWishesMsg';
import { useNavigate } from 'react-router-dom';
import routes from '../Router/Routes';
import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 15,
		width: '85%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		maxHeight: '24px',
	},
	skelaton: {
		width: '100%',
		borderRadius: '5px',
		height: '108.5px',
	},
}));

const WishesSummery = ({ wishes, currAmount, isLoadingUserData }) => {
	const classes = useStyles();
	const navigate = useNavigate();

	const goToWishList = () =>
		navigate('/child' + routes.ChildWishList, {
			state: { wishes, currAmount },
		});

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography>היעדים שלי</Typography>
				{Object.keys(wishes).length > 0 && (
					<Button variant='text' onClick={goToWishList}>
						הצג עוד...
					</Button>
				)}
			</div>
			{isLoadingUserData ? (
				<Skeleton variant='rectangular' className={classes.skelaton} />
			) : Object.keys(wishes).length > 0 ? (
				<Wish name={wishes[1].name} pic={wishes[1].pic} cost={wishes[1].cost} currAmount={currAmount} />
			) : (
				<NoWishesMsg goToWishList={goToWishList} />
			)}
		</div>
	);
};

export default WishesSummery;
