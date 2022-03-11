import { Typography } from '@mui/material'
import { Card } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import Transactions from '../Transactions'

const useStyles = makeStyles((theme) => ({
 root:{
   minHeight: 70,
   marginTop: 10,
   borderRadius: 10,
   width: '85%',
   marginRight: 'auto',
   marginLeft: 'auto',
 },
 total:{
  textAlign: 'center',
  backgroundColor: '#FAFAFA',
 }
}))


const CardHistory = ({ card }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      
    <Typography>החודש הוצאתי..</Typography>

    <Card className={classes.total}>
      <Typography fontSize="35px" >
        { card?.transactions.map(transaction => transaction.amount).reduce((a,b) => a + b, 0 )} ₪
      </Typography>
     </Card>

     <Transactions transactionsList={card?.transactions} ></Transactions>

    </div>
  )
}

CardHistory.propTypes = {
  card: PropTypes.object
}
CardHistory.defaultProps = {
  card: { amount : 0 , transactions : [] }
}

export default CardHistory
