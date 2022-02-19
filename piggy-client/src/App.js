import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

// Create rtl cache
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
	return (
		<BrowserRouter>
			<CacheProvider value={cacheRtl}>
				<ThemeProvider theme={theme}>
					<Router />
				</ThemeProvider>
			</CacheProvider>
		</BrowserRouter>
	);
}

export default App;
