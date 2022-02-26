import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Piggy from '../../../assets/img/piggy-hero.svg'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 200,
    backgroundColor: '#9D9D9D',
    borderRadius: '0 0 48px 48px',
    padding: theme.spacing(0, 3, 0, 8),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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

const HomepageHeader = ({ username, caption }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.titles}>
        <Typography className={classes.title}>{caption}</Typography>
        <Typography className={classes.title} fontWeight="fontWeightBold">
          {username}!
        </Typography>
      </div>
      <img className={classes.piggy} src={Piggy} alt="Piggy" />
    </div>
  )
}

HomepageHeader.propTypes = {
  username: PropTypes.string,
  caption: PropTypes.string,
}
HomepageHeader.defaultProps = {
  username: '',
  caption: '',
}

export default HomepageHeader
