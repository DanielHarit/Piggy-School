import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import ParentIndex from './views/ParentIndex';
import ChildIndex from './views/ChildrenIndex';
import LoginIndex from './views/LoginIndex';
import axios from 'axios';
import config from './conf.json';
import { createTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { StoriesContextProvider } from './StoriesContext';
import { CoinsContextProvider } from './contexts/coinsContext';
import BackgroundColorContext, { BackgroundColorContextProvider } from './contexts/backgroundColorContext';


// Create rtl cache
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
	prepend: true,
});

const useStyles = makeStyles(() => ({
	CircularProgress: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
	},
}));

function App() {
	const { setBackgroundColor } = React.useContext(BackgroundColorContext);
	const classes = useStyles();
	const [isChildren, setIsChildren] = useState(true);
	const [isLanding, setIsLanding] = useState(true);

	useEffect(async () => {
		const user = JSON.parse(sessionStorage.getItem('profileObj'));
		if (user) {
			const userMail = user['email'];
			const userObject = await axios.get(`${config.PIGGY_DB_URL}/identity/${userMail}`);
			setIsLanding(false);

			if (userObject['data']['type'] === 'parent') setIsChildren(false);
			if (userObject['data']['type'] === 'child') {
				setIsChildren(true);
			}
		} else {
			setIsLanding(true);
			setIsChildren(true);
		}
	}, []);

	return (
		<BrowserRouter>
			<CacheProvider value={cacheRtl}>
				<ThemeProvider theme={theme}>
					<ThemeProvider
						theme={(theme) =>
							createTheme({
								...theme,
								palette: {
									...theme.palette,
								},
							})
						}>
						<CoinsContextProvider>
							<BackgroundColorContextProvider>
								<StoriesContextProvider>
									<CssBaseline />
									<LoginIndex />
								</StoriesContextProvider>
							</BackgroundColorContextProvider>
						</CoinsContextProvider>
					</ThemeProvider>
				</ThemeProvider>
			</CacheProvider>
		</BrowserRouter>
	);
}

export default App;
