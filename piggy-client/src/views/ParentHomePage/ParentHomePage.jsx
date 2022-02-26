import React from 'react'
import HomePage from '../../components/HomePage'
import makeStyles from '@mui/styles/makeStyles'
import HomepageHeader from '../../components/HomePage/HomepageHeader'
import HomePageFooter from '../../components/HomePage/HomePageFooter'

const useStyles = makeStyles((theme) => ({
  text: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(2),
  },
}))

const ParentHomePage = () => {
  const classes = useStyles()

  return (
    <HomePage title="היי הורה" btnText="לתצוגת ילד" btnLink="/child">
      <HomepageHeader username="אייל" caption="בוקר טיל" />
      <HomePageFooter />
    </HomePage>
  )
}

export default ParentHomePage
