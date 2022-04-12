import { React } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ParentHomePage from '../../views/ParentHomePage';
import ChildHomePage from '../../views/ChildHomePage';
import ParentTransferMoneyPage from '../../views/ParentTransferMoneyPage';
import UserTypeSelect from '../../views/UserTypeSelect';
import ParentLogin from '../../views/ParentLogin';
import ChildLogin from '../../views/ChildLogin';

const Router = () => {
	return (
		<Routes>
			<Route path='/landing' element={<UserTypeSelect />} />
			<Route path='/login/parent' element={<ParentLogin />} />
			<Route path='/login/child' element={<ChildLogin />} />
			<Route path='/parent' element={<ParentHomePage />} />
			<Route path='/child' element={<ChildHomePage />} />
			<Route path='/parentTransfer' element={<ParentTransferMoneyPage />} />
			<Route path='*' element={<Navigate to={'/landing'} />} />
		</Routes>
	);
};

export default Router;
