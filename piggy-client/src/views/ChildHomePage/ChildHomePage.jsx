import * as React from 'react';
import HomePage from '../../components/HomePage';
import HomepageHeader from '../../components/HomePage/HomepageHeader'
import HomePageFooter from '../../components/HomePage/HomePageFooter'
import CardAmount from '../../components/CardInfo/CardHistory'
import CardDetails from '../../components/CardInfo/CardDetails'
import { useEffect,useState } from 'react';
import { makeStyles } from '@mui/styles'
import axios from 'axios';
import configData from "../../conf.json";
import CardHistory from '../../components/CardInfo/CardHistory';

const useStyles = makeStyles((theme) => ({
    root:{
    },
   }))

const card = {
    amount: 40,
    transactions: [
        {
            "id": '123',
            "amount": 100,
            "to": "מקדונלדס",
            "category": "food",
            "date":'10.03.2022',
        },
        {
            "id": '124',
            "amount": 160,
            "to": "ריבר",
            "category": "food",
            "date":'10.03.2022',
        },
        {
            "id": '124',
            "amount": 160,
            "to": "Dominos",
            "category": "food",
            "date":'10.03.2022',
        },
        {
            "id": '124',
            "amount": 160,
            "to": "Dominos",
            "category": "food",
            "date":'10.03.2022',
        },
    ]
  }
  
const ChildHomePage = () => {
    const classes = useStyles()
    const [cardData,setCardData,] = useState(null);
    const [userName,setUserName] =useState('')
    useEffect(()=>{
            axios.get(`${configData.PIGGY_DB_URL}/children/62171cef74e8cac9530dcaac`).then((res) =>{
                setUserName(res.data.UserSettings.DisplayName);
            })
            axios.get(`${configData.PAYMENT_SERVICE_URL}/card/62171cef74e8cac9530dcaac`).then((res) =>{
                setCardData(res.data);
              }).catch((err) =>{
                setCardData(card);
              })

    },[] )

	return(
        <div className={classes.root}>
            <HomePage title='PIGGY' btnText='לתצוגת הורה' btnLink='/parent'>
            <HomepageHeader username={userName} caption="בוקר אש" />

            <CardDetails amount={cardData?.amount} ></CardDetails>
            <CardHistory card={cardData}></CardHistory>
          

            <HomePageFooter />
            </HomePage>
      </div>
        
	)
}

export default ChildHomePage;
