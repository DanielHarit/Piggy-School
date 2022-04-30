import { makeStyles } from '@mui/styles'

export default makeStyles(() => ({
  root: {
    width: '85%',
    margin: '25px auto 0',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  storyBtn: {
    padding: 0,
    minWidth: 50,
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: 'salmon',
    marginLeft: 10
  },
  storyNotSeenBtn: {
    border: '2px solid purple'
  },
  storyNotSeenBtn: {},
}))
