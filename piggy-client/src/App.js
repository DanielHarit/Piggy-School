import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ParentContext from './ParentContext'

// Create rtl cache
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
	prepend:true
});

function App() {
	const [selectedChildrenId, setSelectedChildrenId] = useState('');
  	const [amount, setAmount] = useState(0);

	return (
		<ParentContext.Provider value={{amount,setAmount,selectedChildrenId,setSelectedChildrenId}}>
		<BrowserRouter>
			<CacheProvider value={cacheRtl}>
				<ThemeProvider theme={theme}>
					<Router />
				</ThemeProvider>
			</CacheProvider>
		</BrowserRouter>
		</ParentContext.Provider>

	);
}

export default App;
