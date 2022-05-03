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
import { Skeleton } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root:{
    width:'90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop:'10px'
  },
  childrenList:{
    borderRadius: 15,
   },
   skelaton: {
		borderRadius: '5px',
		marginBottom: '15px',
	},
 
  }))

  const ChildrenBoard = ({childrenList,isChildrenLoading,daysNum}) => {
    const classes = useStyles()

    const today = new Date();
    const lastDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-daysNum);

    return (
      <div className={classes.root}>
            {isChildrenLoading ? (
				<>
					<Skeleton variant='rectangular' width={'100%'} height={300} className={classes.skelaton} />
				</>
			) : (
        <Card className={classes.childrenList}>
          <List sx={{ width:'80%', marginRight : 'auto',marginLeft: 'auto'}}> 
            { childrenList.map(child => (
            <>
              <ListItem key={child.id} sx={{display:'inline'}}>
                <ChildrenStatus child={child} lastDate={lastDate}></ChildrenStatus>
              </ListItem>
            </>
            )) }
          </List>
  
      </Card>
     )} 
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
  
