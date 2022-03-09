import React,{ useContext, useState } from 'react';
import { makeStyles } from '@mui/styles'
import { HOMEPAGE_CONSTANTS } from '../../../constants'
import cx from 'classnames'
import { useFooterLinks } from './useFooterLinks'
import PropTypes from 'prop-types'
import { IconButton, Typography, Dialog, DialogTitle } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Home } from '@mui/icons-material'
import axios from 'axios'
import configData from "../../../conf.json";
import ParentContext from '../../../views/ParentHomePage/ParentContext';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#d9d9d9',
    height: 75,
    paddingBottom: theme.spacing(1),
  },
  innerContainer: {
    display: 'flex',
    height: '100%',
  },
  footerLinkWrapper: {
    flexBasis: 'calc(100% / 3)',
    position: 'relative',
    '&$floatingFooterLinkWrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  },
  floatingFooterLinkWrapper: {},
  footerLink: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 0,
    borderRadius: 0,

    '&$floating': {
      position: 'absolute',
      top: '-50%',
      left: '50%',
      width: 75,
      height: 75,
      transform: 'translateX(-50%)',
      borderRadius: 75,
      backgroundColor: '#6A6A6A',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  floating: {},
  icon: {
    width: '100%'
  }

}))

const ActionStatus = Object.freeze({"SUCCESS":'success', "ERROR":'error', "NONE":"none"})

const HomePageFooter = ({ footerType }) => {
  const classes = useStyles();
  const {amount,selectedChildrenId,setAmount} = useContext(ParentContext);
  const [actionStatus, setActionStatus] = useState(ActionStatus.NONE)


  const getFooterLinks = useFooterLinks(footerType)
  const { rightLink, middleLink, leftLink } = getFooterLinks()

  const handleTransferMony = () =>{

    console.log("payed for "+ amount+ " " +selectedChildrenId);
    axios.put(`${configData.PAYMENT_SERVICE_URL}/card/${selectedChildrenId}`, {
      amount : +amount
    }).then((res) =>{
      setActionStatus(ActionStatus.SUCCESS);
      setAmount(0);
    }).catch((err) =>{
      setActionStatus(ActionStatus.ERROR);
      setAmount(0);
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.innerContainer}>
        <div className={classes.footerLinkWrapper}>
          <IconButton className={classes.footerLink} >
            <Home />
            <Typography className={classes.linkLabel}>
              {rightLink.label}
            </Typography>
          </IconButton>
        </div>
        <div
          className={cx(
            classes.footerLinkWrapper,
            classes.floatingFooterLinkWrapper
          )}
        >
          <IconButton className={cx(classes.footerLink, classes.floating)} onClick={handleTransferMony}>
            <Home />
          </IconButton>
          <Typography className={classes.linkLabel}>
            {middleLink.label}
          </Typography>
        </div>
        <div className={classes.footerLinkWrapper}>
          <IconButton className={classes.footerLink}>
            <Home />
            <Typography className={classes.linkLabel}>
              {leftLink.label}
            </Typography>
          </IconButton>
        </div>
      </div>
    
      <Dialog open={actionStatus === ActionStatus.SUCCESS} onClose={()=>setActionStatus(ActionStatus.NONE)}>
        <DialogTitle id="alert-dialog-title">
          <CheckCircleOutlineIcon className={classes.icon} color='success' fontSize='large'/>
          <Typography>ההעברה בוצעה בהצלחה!</Typography>
        </DialogTitle>
      </Dialog>
      <Dialog open={actionStatus === ActionStatus.ERROR} onClose={()=>setActionStatus(ActionStatus.NONE)}>
        <DialogTitle id="alert-dialog-title">
          <ErrorOutlineIcon className={classes.icon} color='error' fontSize='large'/>
          <Typography>ההעברה נכשלה</Typography>
        </DialogTitle>
      </Dialog>
    </div>
  )
}

HomePageFooter.propTypes = {
  footerType: PropTypes.string,
}
HomePageFooter.defaultProps = {
  footerType: HOMEPAGE_CONSTANTS.CHILD_FOOTER,
}

export default HomePageFooter
