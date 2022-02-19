import * as React from 'react';
import HomePage from '../../components/HomePage';

const ChildHomePage = () => {
	return <HomePage title='היי ילד' btnText='לתצוגת הורה' btnLink='/parent' />;
};

export default ChildHomePage;
