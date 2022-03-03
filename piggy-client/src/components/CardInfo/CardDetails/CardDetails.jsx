import { Typography } from '@mui/material'
import { Card } from '@mui/material'
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
  Height:140,
  color:'white',
 },
 amount:{
   fontSize:'25px',
   marginTop:15,
   marginRight:15,
 },
 Details:{
   marginRight:15,
   fontSize:'25px',
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
                  <Typography className={classes.Details}>
                    { cvc ? cvc : placeholder.cvc }
                  </Typography>  
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
