import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Wish from '../Wish';
import drownPic from '../../assets/img/drownExample.jpg';
import { useState } from 'react';
import NoWishesMsg from './noWishesMsg';

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
}));

const WishesSummery = () => {
	const classes = useStyles();
	const [showWishes, setShowWishes] = useState(true);

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography>היעדים שלי</Typography>
				{showWishes && <Button variant='text'>הצג עוד...</Button>}
			</div>
			{showWishes ? (
				<>
					<Wish name='רחפן' pic={drownPic} amount={1200} currAmount={800} />
					<Wish name='רחפן' pic={drownPic} amount={800} currAmount={800} priority={2} />
				</>
			) : (
				<NoWishesMsg />
			)}
		</div>
	);
};

export default WishesSummery;
