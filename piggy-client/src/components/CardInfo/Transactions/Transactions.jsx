import { Typography } from '@mui/material'
import { Divider } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor:'#FAFAFA',
    borderRadius: 10,
    marginTop: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}))

const Transactions = ({transactionsList}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
          <List disablePadding> 
            { transactionsList.map(transaction => (
            <>
              <ListItem key={transaction.id}>
                <ListItemText primary={transaction.to} secondary={transaction.date}/>
                <Typography edge="end"> {transaction.amount} ₪ </Typography>
              </ListItem>
              <Divider light/>
            </>
            )) }
         </List>
  </div>
  )
}

Transactions.propTypes = {
  transactionsList:PropTypes.array
}
Transactions.defaultProps = {
  transactionsList:[]
}


export default Transactions
