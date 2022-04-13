import React, { useEffect } from "react";
import routes from "../components/Router/Routes";
import { Routes, Route, Navigate } from "react-router-dom";
import ParentLogin from './ParentLogin';
import ChildLogin from './ChildLogin';
import UserTypeSelect from './UserTypeSelect';


const LoginIndex = () => {
  return (
    <div>
        <Routes>
            <Route path={routes.LoginParent} element={<ParentLogin />} />
			<Route path={routes.LoginChild} element={<ChildLogin />} />
			<Route path={routes.Landing} element={<UserTypeSelect />} />
            <Route path="*" element={<Navigate to={routes.Landing} />} />
        </Routes>
    </div>
  );
};

export default LoginIndex;
