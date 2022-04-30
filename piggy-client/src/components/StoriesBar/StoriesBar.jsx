import useStyles from './useStyles'
import cx from 'classnames'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../../components/Router/Routes'

const StoriesBar = ({ isAllStoriesSeen }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const goToStories = () => {
    navigate(`/child${routes.Stories}`)
  }

  return (
    <div className={classes.root}>
      <Button
        color="inherit"
        onClick={goToStories}
        className={cx(classes.storyBtn, {
          [classes.storyNotSeenBtn]: !isAllStoriesSeen,
        })}
      ></Button>
    </div>
  )
}

export default StoriesBar
