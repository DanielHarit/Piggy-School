import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Logout from '../Auth/Logout';

const useStyles = makeStyles((theme) => ({
	titles: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
	},
	mainTitle: {
		paddingTop: '2px',
	},
	pageContent: {
		maxWidth: '600px',
		margin: 'auto',
		// padding: theme.spacing(3),
	},
}));

const HomePage = ({ title, btnText, btnLink, children }) => {
	const navigate = useNavigate();
	const classes = useStyles();

	const goToLink = () => navigate(btnLink);

	return (
		<Box>
			{/* <AppBar position='static'>
				<Toolbar>
					<div className={classes.titles}>
						<Typography variant='h6' component='div' className={classes.mainTitle}>
							{title}
						</Typography>
						<Logout />
						<Button color='inherit' onClick={goToLink}>
							{btnText}
						</Button>
					</div>
				</Toolbar>
			</AppBar> */}
			<div className={classes.pageContent}>{children}</div>
		</Box>
	);
};

export default HomePage;
