import { Paper, Typography, Avatar, Grid, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#FAFAFA',
		marginBottom: '10px',
	},
	inner: {
		padding: '15px 0px 15px 15px',
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
	cost: {
		fontSize: '15px',
		fontWeight: 'bold',
	},
	amountWrapper: {
		textAlign: 'end',
	},
	desc: {
		fontSize: '15px',
		marginRight: '10px',
		color: '#9e9e9e',
	},
	priority: {
		flexDirection: 'column',
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#cba9c3',
		borderRadius: '0 5px 5px 0',
		height: '100%',
	},
	priorityNum: {
		fontSize: '25px',
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
	},
}));

const Wish = ({ name, pic, cost, currAmount, priority }) => {
	const classes = useStyles();

	const [progress, setProgress] = useState(0);

	useEffect(() => {
		setProgress(currAmount > cost ? 100 : (currAmount * 100) / cost);
	}, [cost, currAmount]);

	return (
		<Paper className={classes.root}>
			<Grid container>
				{priority && (
					<Grid item xs={2}>
						<div className={classes.priority}>
							<Typography className={classes.priorityNum}>{priority}</Typography>
						</div>
					</Grid>
				)}
				<Grid item xs={priority ? 10 : 12}>
					<Grid container className={classes.inner}>
						<Grid item xs={3} className={classes.centered}>
							<Avatar src={pic} sx={{ width: 56, height: 56, margin: 'auto' }} />
							<Typography className={classes.name}>{name}</Typography>
						</Grid>
						<Grid item xs={9}>
							<div className={classes.progressWrapper}>
								<Grid container>
									<Grid item xs={6}>
										{progress < 100 && <Typography className={classes.currAmount}>{currAmount}???</Typography>}
									</Grid>
									<Grid item xs={6} className={classes.amountWrapper}>
										<Typography className={classes.cost}>{cost}???</Typography>
									</Grid>
									<Grid item xs={12}>
										<LinearProgress className={classes.progressBar} variant='determinate' value={progress} />
									</Grid>
								</Grid>
							</div>
							<Typography className={classes.desc}>{progress < 100 ? `?????? ${cost - currAmount}??? ??????????????!` : '???? ?????? ???? ????!'}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Wish;
