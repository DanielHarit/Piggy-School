import React, { useEffect } from 'react'
import HomePage from '../../components/HomePage'
import makeStyles from '@mui/styles/makeStyles'
import HomepageHeader from '../../components/HomePage/HomepageHeader'
import HomePageFooter from '../../components/HomePage/HomePageFooter'
import ParentTransferMoneyPage from '../ParentTransferMoneyPage'
import ParentContext from './ParentContext'
import config from '../../conf.json'
import { useState } from 'react'
import axios from 'axios'


const ParentHomePage = () => {

  const [selectedChildrenId, setSelectedChildrenId] = useState('');
  const [amount, setAmount] = useState(0);
  
  const [userName,setUserName] =useState('')
  useEffect(() =>{
    axios.get(`${config.PIGGY_DB_URL}/parent/62171cef74e8cac9530dcdsdacbw`).then(res =>setUserName(res.data.DisplayName
      ))
  },[])

  return (
    <ParentContext.Provider value={{amount,setAmount,selectedChildrenId,setSelectedChildrenId}}>
      <HomePage title="היי הורה" btnText="לתצוגת ילד" btnLink="/child">
        <HomepageHeader username={userName} caption="בוקר טיל" />
        <HomePageFooter />
        <ParentTransferMoneyPage/>
      </HomePage>
    </ParentContext.Provider>
  )
}

export default ParentHomePage
