import { useCallback, useMemo, useState } from 'react'
import useStyles from './useStyles'
import cx from 'classnames'
import {
  FormControl,
  IconButton,
  Input,
  TextField,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { budgetTranslationMap } from '../../../../constants/budget-constants'

export const BudgetBar = ({
  moneySpent,
  budget,
  className,
  handleBudgetChange,
  handleSaveBudget,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const percentage = useMemo(() => {
    return Math.round((moneySpent / budget.amount) * 100)
  }, [moneySpent, budget])

  const handleChange = useCallback(
    (ev) => {
      if (isNaN(+ev.target.value)) {
        ev.preventDefault()
        return
      }
      handleBudgetChange(ev)
    },
    [handleBudgetChange]
  )

  const classes = useStyles({ percentage })
  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.detailsContainer}>
        <Typography className={classes.label}>
          {budgetTranslationMap[budget.category] || 'קטגוריה חדשה'}
        </Typography>
        {!isEditing ? (
          <div className={classes.labelContainer}>
            <IconButton
              className={classes.iconButton}
              onClick={() => setIsEditing(true)}
            >
              <EditIcon className={classes.icon} />
            </IconButton>
            <Typography className={classes.label}>
              {`${budget.amount} / ${moneySpent} ₪`}
            </Typography>
          </div>
        ) : (
          <div className={classes.labelContainer}>
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                setIsEditing(false)
                handleSaveBudget()
              }}
            >
              <CheckIcon className={classes.icon} />
            </IconButton>
            <FormControl variant="standard" className={classes.formControl}>
              <Input
                autoFocus
                name={budget.category}
                value={budget.amount}
                variant="standard"
                onChange={handleChange}
              />
            </FormControl>
          </div>
        )}
      </div>
      <div
        className={cx(classes.progress, {
          [classes.overBudget]: percentage >= 100,
        })}
      ></div>
    </div>
  )
}
