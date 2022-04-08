import React, { useState , useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import ParentHomePage from './views/ParentHomePage';
import ChildIndex from './views/ChildrenIndex';
import axios from 'axios';
import config from './conf.json';
import makeStyles from '@mui/styles/makeStyles';

// Create rtl cache
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
	prepend:true
});

const useStyles = makeStyles(() => ({
	CircularProgress : {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		height: '100vh'
	}
}));

function App() {

	const classes = useStyles();

	const [isChildren, setIsChildren] = useState(true);
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		axios
		  .get(`${config.PIGGY_DB_URL}/user/type/62171cef74e8cac9530dcaac`)
		  .then(({data}) => {
			  data === "Parent" && setIsChildren(false)
			  setIsLoading(false)
			});
	  }, []);

	return (
		<BrowserRouter>
			<CacheProvider value={cacheRtl}>
				<ThemeProvider theme={theme}>
					<CssBaseline/>
					{isLoading ? <div className={classes.CircularProgress}><CircularProgress /></div> : isChildren ?<ChildIndex />  : <ParentHomePage />}
				</ThemeProvider>
			</CacheProvider>
		</BrowserRouter>
	);
}

export default App;
