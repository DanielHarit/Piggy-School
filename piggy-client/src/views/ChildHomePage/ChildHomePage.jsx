import * as React from 'react';
import HomePage from '../../components/HomePage';
import HomepageHeader from '../../components/HomePage/HomepageHeader'
import HomePageFooter from '../../components/HomePage/HomePageFooter'
import CardAmount from '../../components/CardInfo/CardAmount'
import CardDetails from '../../components/CardInfo/CardDetails'
import { useEffect,useState } from 'react';
import axios from 'axios';

const card = {
    cashAmount: 40,
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
        }
    ]
  }
  
const ChildHomePage = () => {

    const [cardData,setCardData] = useState(null);

    useEffect(()=>{
        axios.get('/card/123').then((response)=>{

            setCardData(response)
        })
    },[] )

	return(
		<HomePage title='היי דנה' btnText='לתצוגת הורה' btnLink='/parent'>
		<HomepageHeader username="דנה" caption="בוקר אש" />

		<CardDetails total={cardData.cashAmount}></CardDetails>

		<CardAmount card={cardData}></CardAmount>
		
		<HomePageFooter />
		</HomePage>
	)
}

export default ChildHomePage;
