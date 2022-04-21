import React, { useEffect } from "react";
import routes from "../components/Router/Routes";
import { Routes, Route, Navigate } from "react-router-dom";
import ParentLogin from "./ParentLogin";
import ChildLogin from "./ChildLogin";
import UserTypeSelect from "./UserTypeSelect";
import ChidlrenIndex from "./ChildrenIndex";
import ParentIndex from "./ParentIndex";

const LoginIndex = ({setBackGroungColor}) => {
  return (
    <div>
      <Routes>
        <Route path={"/parent/*"} element={<ParentIndex />} />
        <Route path={"/child/*"} element={<ChidlrenIndex />} />
        <Route path={routes.LoginParent} element={<ParentLogin />} />
        <Route path={routes.LoginChild} element={<ChildLogin />} />
        <Route path={routes.Landing} element={<UserTypeSelect setBackGroungColor={setBackGroungColor}/>} />
        <Route path="*" element={<Navigate to={routes.Landing} />} />
      </Routes>
    </div>
  );
};

export default LoginIndex;
