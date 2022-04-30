import { makeStyles } from '@mui/styles'

export default makeStyles(() => ({
  root: {
    width: '85%',
    margin: '15px auto 0',
  },
  storyBtn: {
    padding: 0,
    minWidth: 40,
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: 'salmon',
    '&$storyNotSeenBtn': {
      border: '2px solid purple',
    },
  },
  storyNotSeenBtn: {},
}))
