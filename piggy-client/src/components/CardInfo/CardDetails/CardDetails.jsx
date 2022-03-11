import { Card,CardActions,Fab,Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { textAlign } from '@mui/system'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
 root:{
   marginTop:15,
   width:'85%',
   marginRight:'auto',
   marginLeft:'auto',
 },
 total:{
  borderRadius: 15,
  backgroundColor:'purple',
  color:'white',
  padding:'25px',
 },
 amount:{
   fontSize:'25px',
   fontWeight:'bold',
 },
 Details:{
   fontSize:'15px',
 },
 buttonShow: {
   borderRadius:'10px',
   marginRight: 'auto',
 }
}))

const CardDetails = ({ id,expiry,cvc,placeholder,amount }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
       <Typography>הכרטיס שלי</Typography>
         <Card className={classes.total}>
              <Typography className={classes.Details}>
                חסכתי:
              </Typography>
              <Typography className={classes.amount}>
                { amount } ₪
              </Typography>
              <Typography className={classes.Details}>
                מספר כרטיס:
              </Typography>
              <Typography className={classes.Details} sx={{textAlign:'left'}}>
                { id ? id : placeholder.id  }
              </Typography>
               <Typography className={classes.Details}>
                { expiry ?  expiry : placeholder.expiry }
              </Typography> 
                  { <Typography className={classes.Details}>
                    { cvc ? cvc : placeholder.cvc }
                  </Typography>   }
                 {/* { <CardActions>
                  <Fab variant="extended" size="medium" sx={{marginLeft: 'auto'}}>להצגת הפרטים</Fab>
                </CardActions>  */}
                
          </Card>
          </div>
  )
}

CardDetails.propTypes = {
  amount:PropTypes.number,
  id: PropTypes.string,
  expiry: PropTypes.string,
  cvc: PropTypes.string,
  placeholder: PropTypes.object,
}
CardDetails.defaultProps = {
  amount : 0,
    placeholder: {
    id: "•••• •••• •••• ••••",
    expiry: "••/••",
    cvc: "•••",
  },
}

export default CardDetails
