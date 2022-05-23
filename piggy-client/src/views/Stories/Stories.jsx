import { useCallback, useMemo } from 'react'
import InstaStories from 'react-insta-stories'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import routes from '../../components/Router/Routes'
import { useStories, useStoriesUpdate } from '../../StoriesContext'
import useStyles from './useStyles'
import PiggyCoin from '../../assets/img/piggy-coin.svg'

const Stories = () => {
  const { storyPrefix } = useParams()
  const navigate = useNavigate()
  const classes = useStyles()
  const { stories: allStories } = useStories()
  const storyToDisplay = allStories.find(
    (item) => item.storyPrefix == Number(storyPrefix)
  )
  const { markStorySetAsSeen, toggleSetShowWatchPrizePopup } =
    useStoriesUpdate()

  const handleFinishStorySet = () => {
    if (!storyToDisplay.seen) {
      toggleSetShowWatchPrizePopup(true)
      markStorySetAsSeen(storyPrefix).then(() => {
        navigate(`child${routes.ChildrenHomePage}`)
      })
    } else {
      navigate(`child${routes.ChildrenHomePage}`)
    }
  }

  return (
    <div className={classes.root}>
      <InstaStories
        stories={storyToDisplay.photos}
        defaultInterval={3500}
        width={'100%'}
        height={'100%'}
        onAllStoriesEnd={handleFinishStorySet}
      />
    </div>
  )
}
export default Stories
