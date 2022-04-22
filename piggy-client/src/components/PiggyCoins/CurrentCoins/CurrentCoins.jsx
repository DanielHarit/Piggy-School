import React,{ useContext, useState } from 'react';
import { makeStyles } from '@mui/styles'
import { Typography,Card,Box } from '@mui/material'
import PiggyCoin from '../../../assets/img/piggy-coin.svg'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    ellipse: {
        backgroundColor: 'gray',
    },
    coinImg:{
        display: 'flex',
        height:35
    },
    sum: {
        color:'gold',
        fontWeight:'bold',
        fontSize:'22px',
        width:'100%',
        textAlign:'center',
    }
  }))

  const CurrentCoins = ({ total }) => {
    const classes = useStyles();
  
    return (
        <div className={classes.root}>
            <Card className={classes.ellipse} sx={{borderRadius: 5,minWidth:90,height:38 }}>
            <Box sx={{ display: 'flex',justifyContent:'space-between',height:'100%',alignItems: 'center', }}>
                <Typography className={classes.sum}>{total}</Typography>
                <img className={classes.coinImg} src={PiggyCoin} alt="PiggyCoin" />
            </Box>
            </Card>
        </div>
    )
  }
  
  CurrentCoins.propTypes = {
      total : PropTypes.number,
  }
  CurrentCoins.defaultProps = {
    total : 0,
  }
  
  export default CurrentCoins
  