import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	direction: 'rtl',
	palette: {
		primary: {
			main: '#781F63',
		},
		secondary: {
			main: '#ffa707',
		},
		error: {
			main: '#e53935',
		},
		warning: {
			main: '#455A64',
		},
		info: {
			main: '#607d8b1a',
		},
		success: {
			main: '#00794c',
		},
	},
	typography: {
		fontFamily: 'Rubik',
	},
});

export default theme;
