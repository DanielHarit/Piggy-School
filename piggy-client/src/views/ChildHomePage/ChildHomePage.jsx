import * as React from 'react';
import HomePage from '../../components/HomePage';
import HomepageHeader from '../../components/HomePage/HomepageHeader'
import HomePageFooter from '../../components/HomePage/HomePageFooter'
import CardAmount from '../../components/CardInfo/CardHistory'
import CardDetails from '../../components/CardInfo/CardDetails'
import { useEffect,useState } from 'react';
import { makeStyles } from '@mui/styles'
import axios from 'axios';
import config from "../../conf.json";
import CardHistory from '../../components/CardInfo/CardHistory';

const useStyles = makeStyles((theme) => ({
//     root:{
//     },
   }))
  
const ChildHomePage = () => {
    const classes = useStyles()
    const [cardData,setCardData,] = useState(null);
    const [userName,setUserName] =useState('')
    useEffect(async () => {
        const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
        const user = await axios.get(`${config.PIGGY_DB_URL}/children/mail/${userMail}`); 
        setUserName(user.data.UserSettings.DisplayName);

            // axios.get(`${config.PIGGY_DB_URL}/children/62171cef74e8cac9530dcaac`).then((res) =>{
            //     setUserName(res.data.UserSettings.DisplayName);
            // })
            axios.get(`${config.PAYMENT_SERVICE_URL}/card/${user.data.CardId}`).then((res) =>{
                setCardData(res.data);
              }).catch((err) =>{
              })

    },[] )

	return(
        <div className={classes.root}>
            <HomePage title='PIGGY' btnText='לתצוגת הורה' btnLink='/parent'>
            <HomepageHeader username={userName} caption="בוקר אש" />

            <CardDetails amount={cardData?.amount} details={cardData?.cardDetails} ></CardDetails>
            <CardHistory card={cardData}></CardHistory>
          

            <HomePageFooter />
            </HomePage>
      </div>
        
	)
}

export default ChildHomePage;
