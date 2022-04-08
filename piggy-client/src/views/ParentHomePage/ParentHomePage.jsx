import React, { useEffect } from "react";
import HomePage from "../../components/HomePage";
import makeStyles from "@mui/styles/makeStyles";
import HomepageHeader from "../../components/HomePage/HomepageHeader";
import HomePageFooter from "../../components/HomePage/HomePageFooter";
import ParentTransferMoneyPage from "../ParentTransferMoneyPage";
import config from "../../conf.json";
import { useState } from "react";
import axios from "axios";
import ParentContext from '../../ParentContext';
import { HOMEPAGE_CONSTANTS } from "../../constants";
import routes from "../../components/Router/Routes";

const ParentHomePage = () => {
  const [selectedChildrenId, setSelectedChildrenId] = useState('');
  const [amount, setAmount] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(async () =>{
    const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const user = await axios.get(`${config.PIGGY_DB_URL}/parent/mail/${userMail}`); 
    setUserName(user.data.DisplayName)
  },[]);

  return (
    <ParentContext.Provider
      value={{ amount, setAmount, selectedChildrenId, setSelectedChildrenId }}
    >
      <HomePage
        title="PIGGY"
      >
        <HomepageHeader username={userName} caption="בוקר טיל" />
        <HomePageFooter footerType={HOMEPAGE_CONSTANTS.PARENT_FOOTER} />
        <ParentTransferMoneyPage />
      </HomePage>
    </ParentContext.Provider>
  );
};

export default ParentHomePage;
