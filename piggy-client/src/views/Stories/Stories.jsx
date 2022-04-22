import InstaStories from 'react-insta-stories'
import { useNavigate } from 'react-router-dom'
import routes from '../../components/Router/Routes'
import { useStories } from './useStories'
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
]

const Stories = () => {
  const navigate = useNavigate()
  const classes = useStyles()
  const { stories } = useStories()
  const closeStories = () => navigate(`child${routes.ChildrenHomePage}`)

  return (
    mockStories &&
    mockStories.length && (
      <div className={classes.root}>
        <InstaStories
          stories={mockStories}
          defaultInterval={3500}
          width={'100%'}
          height={'100%'}
          onAllStoriesEnd={closeStories}
        />
      </div>
    )
  )
}
export default Stories
