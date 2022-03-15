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

const CardDetails = ({ details,placeholder,amount }) => {
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
                פרטי האשראי מחכים במייל :)
              </Typography>

               {/* <Typography className={classes.Details}>
                פרטי כרטיס:
              </Typography>
              <Typography className={classes.Details} sx={{textAlign:'left'}}>
                { details.cardNumber ? details.cardNumber : placeholder.number  }
              </Typography>
               <Typography className={classes.Details}>
                { details.expirationMonth ? details.expirationMonth : placeholder.expirationMonth } / 
                { details.expirationYear ? details.expirationYear : placeholder.expirationYear}
              </Typography> 
                  { <Typography className={classes.Details}>
                    { details.cvc ? details.cvc : placeholder.cvc }
                  </Typography>    */}
                 {/* { <CardActions>
                  <Fab variant="extended" size="medium" sx={{marginLeft: 'auto'}}>להצגת הפרטים</Fab>
                </CardActions>  */}
                
          </Card>
          </div>
  )
}

CardDetails.propTypes = {
  details:PropTypes.object,
  placeholder: PropTypes.object,
  amount: PropTypes.number,
}
CardDetails.defaultProps = {
    amount : 0,
    details : {
      cardNumber: "•••• •••• •••• ••••",
      expirationMonth: "••",
      expirationYear: "••",
      cvc: "•••",
    },
    placeholder : {
      number: "•••• •••• •••• ••••",
      expirationMonth: "••",
      expirationYear: "••",
      cvc: "•••",
  },
}

export default CardDetails
