import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Piggy from '../../../assets/img/piggy-hero.svg';
import PropTypes from 'prop-types';
import CurrentCoins from '../../../components/PiggyCoins/CurrentCoins';
import { HOMEPAGE_CONSTANTS } from '../../../constants';
import CurrentLevel from '../../PiggyCoins/CurrentLevel';
import { useContext, useEffect } from 'react';
import CoinsContext from '../../../contexts/coinsContext';
import BackgroundColorContext from '../../../contexts/backgroundColorContext';
import axios from 'axios';
import config from '../../../conf.json';


const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: 150,
		backgroundColor: theme.palette.primary.main,
		borderRadius: '0 0 48px 48px',
	},
	allContent: {
		minHeight: 150,
		padding: theme.spacing(0, 3, 0, 8),
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	piggy: {
		maxWidth: 174,
		display: 'inline-block',
		marginBottom: -29,
		zIndex: '1000',
	},
	titles: {
		marginBottom: 25,
	},
	title: {
		color: '#fff',
		fontSize: '25px',
	},
	boldText: {
		fontWeight: 'bold',
	},
	coins: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingTop: '10px',
		paddingLeft: '10px',
		paddingRight: '10px',
	},
}));


const HomepageHeader = ({ username, caption, headerType, showHelloMsg = true }) => {
	const classes = useStyles();
	const { setBackgroundColor, backgroundColor } = useContext(BackgroundColorContext);
	const { coins, totalCoins } = useContext(CoinsContext);

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('profileObj'));
		const userMail = user['email'];
		axios.get(`${config.PIGGY_DB_URL}/backgroundColor/childrenMail/${userMail}`).then((res) => {
			setBackgroundColor(res.data);
		});
	}, []);

	return (
		<div className={classes.root} style={{backgroundColor: backgroundColor?backgroundColor:"#781F63"}}>
			{headerType === HOMEPAGE_CONSTANTS.CHILD && (
				<div className={classes.coins}>
					<CurrentLevel total={totalCoins}></CurrentLevel>
					<CurrentCoins total={coins}></CurrentCoins>
				</div>
			)}

			<div className={classes.allContent}>
				<div className={classes.titles}>
					{showHelloMsg && (
						<>
							<Typography className={classes.title}>{caption}</Typography>
							<Typography className={classes.title} fontWeight='fontWeightBold'>
								{username}!
							</Typography>
						</>
					)}
				</div>
				<img className={classes.piggy} src={Piggy} alt='Piggy' />
			</div>
		</div>
	);
};

HomepageHeader.propTypes = {
	username: PropTypes.string,
	caption: PropTypes.string,
	coins: PropTypes.number,
	headerType: PropTypes.string,
};
HomepageHeader.defaultProps = {
	username: '',
	caption: '',
	coins: 0,
	headerType: HOMEPAGE_CONSTANTS.CHILD,
};

export default HomepageHeader;
