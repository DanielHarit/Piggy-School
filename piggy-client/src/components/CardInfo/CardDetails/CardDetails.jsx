import { Card,CardActions,Fab,Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
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
 },
 amount:{
   fontSize:'25px',
   fontWeight:'bold',
   marginTop:15,
   marginRight:15,
 },
 Details:{
   marginRight:15,
   fontSize:'25px',
 },
 buttonShow: {
   borderRadius:'10px',
   marginRight: 'auto',
 }
}))

const CardDetails = ({ number,expiry,cvc,placeholder,total }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
         <Card className={classes.total}>
              <Typography className={classes.amount}>
               { total } ₪
              </Typography>
              <Typography className={classes.Details}>
                { number ? number : placeholder.number  }
              </Typography>
               <Typography className={classes.Details}>
                { expiry ?  expiry : placeholder.expiry }
              </Typography>
                  {/* <Typography className={classes.Details}>
                    { cvc ? cvc : placeholder.cvc }
                  </Typography>   */}
                <CardActions disableSpacing>
                  {/* <Button variant="contained" className={classes.buttonShow}>להצגת הפרטים</Button> */}
                  <Fab disableSpacing variant="extended" size="medium" sx={{marginLeft: 'auto'}}>להצגת הפרטים</Fab>
                </CardActions>
          </Card>
          </div>
  )
}

CardDetails.propTypes = {
  total:PropTypes.number,
  number: PropTypes.string,
  expiry: PropTypes.string,
  cvc: PropTypes.string,
  placeholder: PropTypes.object,
}
CardDetails.defaultProps = {
  placeholder: {
    number: "•••• •••• •••• ••••",
    expiry: "••/••",
    cvc: "•••",
  },
}

export default CardDetails
