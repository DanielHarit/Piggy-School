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
import { Routes, Route, Navigate,useLocation } from "react-router-dom";
import ParentHomePage from "./ParentHomePage/ParentHomePage";
import ParentSettings from "./ParentSettings/ParentSettings";
import ChildrenQuickView from "./ChildrenQuickView/ChildrenQuickView";
import ChildrenDisplayAll from "../components/ChildrenBoardData/ChildrenDisplayAll";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	root: {
		height: 'calc(100vh - 280px)',
		overflowY: 'auto',
	},
}));

const ParentIndex = () => {
	const classes = useStyles();
  const location = useLocation();  


	const [selectedChildrenId, setSelectedChildrenId] = useState('');
	const [amount, setAmount] = useState(0);
	const [user, setUser] = useState(null);
  const [pageHeadline, setHeadline] = useState("אני רוצה לבדוק את המצב של");
  const [isSettings, setIsSettings] = useState(false);
  const [SelectedFunction, setSelectedFunction] = useState(null);
  const [func, setFunc] = useState(()=>{});
  const [currPage, setCurrPage] = useState(()=>{});

	useEffect(async () => {
		const userMail = JSON.parse(sessionStorage.getItem('profileObj'))['email'];
		const user = await axios.get(`${config.PIGGY_DB_URL}/parent/mail/${userMail}`);
		setUser(user.data);
    
	}, []);
	const navigate = useNavigate();
  
  return (
    <ParentContext.Provider
      value={{ amount, setAmount, selectedChildrenId, setSelectedChildrenId }}
    >
      <HomePage
        title="PIGGY"
      >
        <HomepageHeader username={user?.DisplayName} caption="בוקר טיל" headerType={HOMEPAGE_CONSTANTS.PARENT}/>

        <HomePageFooter
         footerType={HOMEPAGE_CONSTANTS.PARENT}
         onBtnsClick={{
            left: () => {
              navigate( '/parent' + routes.ParentTransfer, {
                state: { settings: user.NotificationsSettings, mail: user.Mail },
              });
            },
            middle: () => {
                navigate('/parent' + routes.ParentHomePage);
              },
              right: () => {
                navigate('/parent' + routes.ParentSettings, {  state: { settings: {AlertSettings : user.NotificationsSettings , DisplayName :user.DisplayName }, mail: user.Mail}});
              },
          }}
        />
        <div className={classes.root}>
          <Routes>
          <Route path={routes.ParentHomePage} element={<ParentHomePage/>} />
            <Route path={routes.ParentTransfer} element={<ParentTransferMoneyPage parentId={user?._id} />} />
            <Route path={routes.ParentSettings} element={<ParentSettings />} />
            <Route path={routes.ChildrenQuickView} element={<ChildrenQuickView />} />
            <Route
              path="*"
              element={<Navigate to={'parent'} />}
            />
          </Routes>
        </div>
      </HomePage>
    </ParentContext.Provider>
  );
};

export default ParentIndex;
