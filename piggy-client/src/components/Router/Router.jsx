import { React } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ParentHomePage from '../../views/ParentHomePage';
import ChildHomePage from '../../views/ChildHomePage';
import ParentTransferMoneyPage from '../../views/ParentTransferMoneyPage';

const Router = () => {
	return (
		<Routes>
			<Route path='/parent' element={<ParentHomePage />} />
			<Route path='/child' element={<ChildHomePage />} />
			<Route path='/parentTransfer' element={<ParentTransferMoneyPage />} />
			<Route path='*' element={<Navigate to={'/parent'} />} />
		</Routes>
	);
};

export default Router;
