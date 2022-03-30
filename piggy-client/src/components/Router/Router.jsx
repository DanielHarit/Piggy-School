import { React } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../views/LoginPage';
import ParentHomePage from '../../views/ParentHomePage';
import ChildHomePage from '../../views/ChildHomePage';
import ParentTransferMoneyPage from '../../views/ParentTransferMoneyPage';

const Router = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/parent' element={<ParentHomePage />} />
			<Route path='/child' element={<ChildHomePage />} />
			<Route path='/parentTransfer' element={<ParentTransferMoneyPage />} />
			<Route path='*' element={<Navigate to={'/login'} />} />
		</Routes>
	);
};

export default Router;
