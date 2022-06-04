import { Typography } from '@mui/material'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Card, List,Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import LinearProgress, { LinearProgressProps,linearProgressClasses } from '@mui/material/LinearProgress';
import axios from 'axios';
import config from '../../../conf.json';
import { useEffect, useState, useMemo } from "react";

const useStyles = makeStyles((theme) => ({
  root:{
  },
   childText:{
    fontSize:'20px'
   },
   targetText:{
    fontSize:'15px',
    color:theme.primary
   }
 
  }))

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 30,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      backgroundColor: theme.primary,
    },
  }));
  
  const ChildrenStatus = ({child, lastDate}) => {
    const classes = useStyles()
    const [cardData, setCardData] = useState(null);

    const userExpenses = useMemo(()=>cardData?.transactions
    .filter((tran) => (
      new Date(tran.timestamp) >= lastDate
     ))
    .map((transaction) => transaction.amount).reduce((a, b) => a + b, 0),[cardData]);
    
    const percent = useMemo(()=>cardData?.amount && Math.min(userExpenses / cardData?.amount * 100, 100),[userExpenses,cardData]);
   
    useEffect(async () => {
          const userCard = await axios.get(`${config.PAYMENT_SERVICE_URL}/card/${child._id}`);
          setCardData(userCard.data);
    }, []);

    return (
      <div className={classes.root}>
        <Box sx={{display:'flex',justifyContent: 'space-between',width:'100%'}}>
                <Typography className={classes.childText} > {child.UserSettings.DisplayName} </Typography>
                <Typography className={classes.targetText} >  
                ₪ {cardData?.amount + userExpenses} /  
                  {userExpenses}
                </Typography>
              </Box>
              <Box sx={{ width: '100%'}}>
              <BorderLinearProgress 
                variant="determinate" 
            value={percent || 0}
            />
        </Box>
    </div>
    )
  }
  
  ChildrenStatus.propTypes = {
    child:PropTypes.object
  }
  ChildrenStatus.defaultProps = {
    child:{}
  }
  
  
  export default ChildrenStatus
  
