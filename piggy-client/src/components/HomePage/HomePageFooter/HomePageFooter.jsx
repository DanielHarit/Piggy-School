import React,{ useContext, useState } from 'react';
import { makeStyles } from '@mui/styles'
import { HOMEPAGE_CONSTANTS } from '../../../constants'
import cx from 'classnames'
import { useFooterLinks } from './useFooterLinks'
import PropTypes from 'prop-types'
import { IconButton, Typography} from '@mui/material'


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


const HomePageFooter = ({ footerType , onBtnsClick={ left:()=>{}, right:()=>{}, middle:()=>{}}}) => {
  const classes = useStyles();
  

  const getFooterLinks = useFooterLinks(footerType)
  const { rightLink, middleLink, leftLink } = getFooterLinks();

  return (
    <div className={classes.root}>
      <div className={classes.innerContainer}>
        <div className={classes.footerLinkWrapper}>
          <IconButton className={classes.footerLink} onClick={onBtnsClick.right} >
          { rightLink.icon }
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
          <IconButton className={cx(classes.footerLink, classes.floating)} onClick={onBtnsClick.middle}>
            { middleLink.icon }
          </IconButton>
          <Typography className={classes.linkLabel}>
            {middleLink.label}
          </Typography>
        </div>
        <div className={classes.footerLinkWrapper}>
          <IconButton className={classes.footerLink} onClick={onBtnsClick.left}>
           {leftLink.icon}
            <Typography className={classes.linkLabel}>
              {leftLink.label}
            </Typography>
            </IconButton>
        </div>
      </div>

    </div>
  )
}

HomePageFooter.propTypes = {
  footerType: PropTypes.string,
}
HomePageFooter.defaultProps = {
  footerType: HOMEPAGE_CONSTANTS.CHILD,
}

export default HomePageFooter
