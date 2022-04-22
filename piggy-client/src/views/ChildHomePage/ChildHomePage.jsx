import * as React from "react";
import HomePage from "../../components/HomePage";
import HomepageHeader from "../../components/HomePage/HomepageHeader";
import HomePageFooter from "../../components/HomePage/HomePageFooter";
import CardAmount from "../../components/CardInfo/CardHistory";
import config from '../../conf.json'
import CardDetails from "../../components/CardInfo/CardDetails";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box,Link,Typography } from '@mui/material'

import axios from "axios";
import configData from "../../conf.json";
import ChildrenSettings from "../ChildrenSettings/ChildrenSettings";
import Router from "../../components/Router";
import CardHistory from "../../components/CardInfo/CardHistory";
import routes from "../../components/Router/Routes";

const useStyles = makeStyles((theme) => ({
  //     root:{
  //     },
  titles:{
    marginTop:'15px',
    marginRight:'25px',
}
}));

const ChildHomePage = () => {
  const classes = useStyles();
  const [cardData, setCardData] = useState(null);
  useEffect(async () => {
    //const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const userMail = 'mika@gmail.com';
        console.log(userMail);
        const user = await axios.get(`${config.PIGGY_DB_URL}/children/mail/${userMail}`); 
        console.log(user.data);

        const userCard = await axios.get(`${config.PAYMENT_SERVICE_URL}/card/${user.data._id}`);
        setCardData(userCard.data);
  }, []);

  return (
    <div className={classes.root}>

      {/* <CardDetails
        amount={cardData?.amount}
        details={cardData?.cardDetails}
      ></CardDetails> */}

       <Typography className={classes.titles}>לחסוך זה לא story</Typography>
            
       <Typography className={classes.titles}>היעדים שלי</Typography>

       <Box sx={{display:'flex',justifyContent: 'space-between',width:'90%'}}>
        <Typography className={classes.titles}>השבוע הוצאתי..</Typography>
        <Link className={classes.titles} href="#">לפירוט המלא</Link>
      </Box>
      <CardHistory card={cardData}></CardHistory>
    </div>
  );
};

export default ChildHomePage;
