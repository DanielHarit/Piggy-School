import { Card, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#FAFAFA',
		borderRadius: 5,
		marginTop: 15,
		marginRight: 'auto',
		marginLeft: 'auto',
		marginBottom: '5px',
	},
}));

const Transactions = ({ transactionsList }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<List disablePadding>
				{transactionsList.map((transaction) => (
					<>
						<ListItem key={transaction.id}>
							<ListItemText
								primary={transaction.description}
								secondary={new Date(transaction.timestamp).toLocaleDateString()}
							/>
							<Typography edge='end'> {transaction.amount}₪ </Typography>
						</ListItem>
						<Divider light />
					</>
				))}
			</List>
		</Card>
	);
};

Transactions.propTypes = {
	transactionsList: PropTypes.array,
};
Transactions.defaultProps = {
	transactionsList: [],
};

export default Transactions;
