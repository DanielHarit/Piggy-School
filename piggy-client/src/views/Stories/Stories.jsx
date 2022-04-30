import { useCallback, useMemo } from 'react'
import InstaStories from 'react-insta-stories'
import { useNavigate } from 'react-router-dom'
import routes from '../../components/Router/Routes'
import { useStories, useStoriesUpdate } from '../../StoriesContext'
import useStyles from './useStyles'

const mockStories = [
  {
    url: 'https://i.postimg.cc/RVYndNBW/story1-1.png',
  },
  {
    url: 'https://i.postimg.cc/d1dKbNkM/story1-2.png',
  },
  {
    url: 'https://i.postimg.cc/RVYndNBW/story1-1.png',
  },
  {
    url: 'https://i.postimg.cc/d1dKbNkM/story1-2.png',
  },
  {
    url: 'https://i.postimg.cc/d1dKbNkM/story1-2.png',
  },
  {
    url: 'https://i.postimg.cc/d1dKbNkM/story1-2.png',
  },
]

const Stories = () => {
  const navigate = useNavigate()
  const classes = useStyles()
  const stories = useStories()
  const { markStoryAsSeen, markStorySetAsSeen } = useStoriesUpdate()
  const handleCloseStories = () => navigate(`child${routes.ChildrenHomePage}`)

  const handleFinishStorySet = useCallback(() => {
    markStorySetAsSeen().then(() => {
      handleCloseStories()
    })
  }, [markStorySetAsSeen])

  const handleStoryStart = useCallback(
    (storyIndex) => {
      markStoryAsSeen(storyIndex)
    },
    [markStoryAsSeen]
  )

  const storiesForDisplay = useMemo(() => {
    return stories && !!stories.length
      ? stories.map((story) => {
          return { url: story.imageUrl }
        })
      : []
  }, [stories])

  return (
    mockStories &&
    mockStories.length && (
      <div className={classes.root}>
        <InstaStories
          stories={mockStories}
          defaultInterval={3500}
          width={'100%'}
          height={'100%'}
          onStoryStart={handleStoryStart}
          onAllStoriesEnd={handleFinishStorySet}
        />
      </div>
    )
  )
}
export default Stories
