import { Typography } from '@mui/material'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Card, List,Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'
import LinearProgress, { LinearProgressProps,linearProgressClasses } from '@mui/material/LinearProgress';
import ChildrenStatus from '../../ChildrenBoardData/ChildrenStatus'

const useStyles = makeStyles((theme) => ({
  root:{
  },
  childrenList:{
    // backgroundColor:'gray',
    width:'90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
   }
 
  }))

  const ChildrenBoard = ({childrenList}) => {
    const classes = useStyles()
    return (
      <div className={classes.root}>
        <Card className={classes.childrenList}>
          <List sx={{ width:'80%', marginRight : 'auto',marginLeft: 'auto'}}> 
            { childrenList.map(child => (
            <>
              <ListItem key={child.id} sx={{display:'inline'}}>
                <ChildrenStatus child={child}></ChildrenStatus>
              </ListItem>
            </>
            )) }
          </List>
      </Card>
    </div>
    )
  }
  
  ChildrenBoard.propTypes = {
    childrenList:PropTypes.array
  }
  ChildrenBoard.defaultProps = {
    childrenList:[]
  }
  
  
  export default ChildrenBoard
  