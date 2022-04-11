import React, { useEffect } from "react";
import HomePage from "../components/HomePage";
import makeStyles from "@mui/styles/makeStyles";
import HomepageHeader from "../components/HomePage/HomepageHeader";
import HomePageFooter from "../components/HomePage/HomePageFooter";
import ParentTransferMoneyPage from "./ParentTransferMoneyPage";
import config from "../conf.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import ParentContext from '../ParentContext';
import { HOMEPAGE_CONSTANTS } from "../constants";
import routes from "../components/Router/Routes";
import { Routes, Route, Navigate } from "react-router-dom";
import ParentHomePage from "./ParentHomePage/ParentHomePage";


const ParentIndex = () => {
  const [selectedChildrenId, setSelectedChildrenId] = useState('');
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(async () =>{
    // const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const userMail = "shlomi@gmail.com";
    const user = await axios.get(`${config.PIGGY_DB_URL}/parent/mail/${userMail}`); 
    setUser(user.data)
  },[]);
  const navigate = useNavigate();

  return (
    <ParentContext.Provider
      value={{ amount, setAmount, selectedChildrenId, setSelectedChildrenId }}
    >
      <HomePage
        title="PIGGY"
      >
        <HomepageHeader username={user?.DisplayName} caption="בוקר טיל" />
        <HomePageFooter
         footerType={HOMEPAGE_CONSTANTS.PARENT_FOOTER}
         onBtnsClick={{
            left: () => {
              navigate(routes.ParentTransfer, {
                state: { settings: user.UserSettings, mail: user.Mail },
              });
            },
            middle: () => {
                navigate(routes.ParentHomePage);
              },
          }}
        />
        <div>
          <Routes>
          <Route path={routes.ParentHomePage} element={<ParentHomePage/>} />
            <Route path={routes.ParentTransfer} element={<ParentTransferMoneyPage parentId={user?._id} />} />
            <Route
              path="*"
              element={<Navigate to={routes.ParentHomePage} />}
            />
          </Routes>
        </div>
      </HomePage>
    </ParentContext.Provider>
  );
};

export default ParentIndex;
