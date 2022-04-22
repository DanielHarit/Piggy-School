import useStyles from './useStyles'
import { useMemo } from 'react'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../../components/Router/Routes'

const StoriesBar = () => {
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
        className={classes.storyBtn}
      ></Button>
    </div>
  )
}

export default StoriesBar
