import useStyles from './useStyles'
import cx from 'classnames'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../../components/Router/Routes'
import { useStories } from '../../StoriesContext'

const StoriesBar = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const goToStories = (storyPrefix) => {
    navigate(`/child${routes.Stories}/${storyPrefix}`)
  }
  const { stories: allStories } = useStories()

  const renderStoriesBar = (allStories) => {
    return allStories.map((story) => {
      return (
        <Button
          key={story.storyPrefix}
          color="inherit"
          onClick={() => goToStories(story.storyPrefix)}
          className={cx(classes.storyBtn, {
            [classes.storyNotSeenBtn]: !story.seen,
          })}
        ></Button>
      )
    })
  }
  return <div className={classes.root}>{renderStoriesBar(allStories)}</div>
}

export default StoriesBar
