import { makeStyles } from '@mui/styles'

export default makeStyles(
  (theme) => ({
    root: {},
    detailsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    amounts: {},
    labelContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
    label: {
      fontSize: 20,
    },
    iconButton: {
      marginLeft: theme.spacing(1),
    },
    icon: {
      fontSize: 18,
    },
    formControl: {
      maxWidth: 100,
    },
    progress: {
      height: 30,
      boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.1)',
      borderRadius: 8,
      position: 'relative',
      overflow: 'hidden',
      '&$overBudget::before': {
        backgroundColor: '#FFA4A4',
      },
      '&::before': {
        borderRadius: 8,
        content: '""',
        position: 'absolute',
        left: 0,
        backgroundColor: '#A4FFCB',
        width: ({ percentage }) => `${percentage}%`,
        height: '100%',
        animation: '$load 0.8s ease forwards',
      },
    },
    overBudget: {},
    ['@keyframes load']: {
      from: {
        clipPath: ' inset(0 100% 0 0)',
      },
      to: {
        clipPath: ' inset(0 0 0 0)',
      },
    },
  }),
  { name: 'BudgetBar' }
)
