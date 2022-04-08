import { React } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../views/LoginPage';
import ParentHomePage from '../../views/ParentHomePage';
import ChildrenIndex from '../../views/ChildrenIndex';
import ParentTransferMoneyPage from '../../views/ParentTransferMoneyPage';
import ChildrenSettings from '../../views/ChildrenSettings/ChildrenSettings';
import routes from './Routes';

const Router = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/parent' element={<ParentHomePage />} />
			<Route path='/parentTransfer' element={<ParentTransferMoneyPage />} />
			<Route path='*' element={<Navigate to={'/login'} />} />
			<Route path={routes.ParentHomePage} element={<ParentHomePage />} />
			<Route path={routes.ChildrenHomePage} element={<ChildrenIndex />} />
			{/* <Route path={routes.ChildSettings} element={<ChildrenSettings />} />
			<Route path={routes.ParentTransfer} element={<ParentTransferMoneyPage />} /> */}
			<Route path='*' element={<Navigate to={routes.ChildrenHomePage} />} />
		</Routes>
	);
};

export default Router;
