import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Piggy from '../../../assets/img/piggy-hero.svg'
import PropTypes from 'prop-types'
import CurrentCoins from '../../../components/PiggyCoins/CurrentCoins'
import { HOMEPAGE_CONSTANTS } from '../../../constants'

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: 200,
    backgroundColor: '#9D9D9D',
    borderRadius: '0 0 48px 48px',
  },
  allContent:{
    minHeight: 180,
    padding: theme.spacing(0, 3, 0, 8),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  coins:{
    display: 'flex',
    justifyContent:'end',
    paddingTop:'10px',
    paddingLeft:'10px'
  },
  piggy: {
    maxWidth: 174,
    display: 'inline-block',
    marginBottom: -29,
  },
  titles: {
    marginBottom: 25,
  },
  title: {
    color: '#fff',
    fontSize: '25px',
  },
  boldText: {
    fontWeight: 'bold',
  },
}))

const HomepageHeader = ({ username, caption,headerType }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
     
      { headerType === HOMEPAGE_CONSTANTS.CHILD &&
        <div className={classes.coins}>
           <CurrentCoins></CurrentCoins>
        </div>
       }

      <div className={classes.allContent}>
        <div className={classes.titles}>
        
          <Typography className={classes.title}>{caption}</Typography>
          <Typography className={classes.title} fontWeight="fontWeightBold">
            {username}!
          </Typography>
        </div>

        <img className={classes.piggy} src={Piggy} alt="Piggy" />
      </div>
     
    </div>
  )
}

HomepageHeader.propTypes = {
  username: PropTypes.string,
  caption: PropTypes.string,
  headerType: PropTypes.string,
}
HomepageHeader.defaultProps = {
  username: '',
  caption: '',
  headerType: HOMEPAGE_CONSTANTS.CHILD,
}

export default HomepageHeader
