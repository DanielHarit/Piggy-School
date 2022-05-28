import { makeStyles } from '@mui/styles'

export default makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(4, 6, 2),
    },
    titlesContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    totalBudget: {
      fontSize: 30,
    },
    budgetBar: {
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  }),
  { name: 'BudgetView' }
)
