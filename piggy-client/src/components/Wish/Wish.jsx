import { Paper, Typography, Avatar, Grid, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import drownPic from '../../assets/img/drownExample.jpg';

const useStyles = makeStyles((theme) => ({
	total: {
		padding: '15px',
		backgroundColor: '#FAFAFA',
	},
	name: {
		fontSize: '15px',
		fontWeight: 'bold',
	},
	centered: {
		textAlign: 'center',
	},
	progressWrapper: {
		flexDirection: 'column',
		display: 'flex',
		justifyContent: 'center',
		height: '56px',
		marginRight: '10px',
	},
	progressBar: {
		height: '10px',
		borderRadius: '5px',
	},
	currAmount: {
		fontSize: '15px',
	},
	amount: {
		fontSize: '15px',
		fontWeight: 'bold',
	},
	amountWrapper: {
		textAlign: 'end',
	},
	desc: {
		fontSize: '15px',
		marginRight: '10px',
	},
}));

const Wish = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.total}>
			<Grid container>
				<Grid item xs={3} className={classes.centered}>
					<Avatar src={drownPic} sx={{ width: 56, height: 56, margin: 'auto' }} />
					<Typography className={classes.name}>רחפן</Typography>
				</Grid>
				<Grid item xs={9}>
					<div className={classes.progressWrapper}>
						<Grid container>
							<Grid item xs={6}>
								<Typography className={classes.currAmount}>700₪</Typography>
							</Grid>
							<Grid item xs={6} className={classes.amountWrapper}>
								<Typography className={classes.amount}>1000₪</Typography>
							</Grid>
							<Grid item xs={12}>
								<LinearProgress className={classes.progressBar} variant='determinate' value={70} />
							</Grid>
						</Grid>
					</div>
					<Typography className={classes.desc}>עוד 300₪ וסיימנו!</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Wish;
