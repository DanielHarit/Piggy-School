import React from 'react';
import useStyles from './useStyles';
import { Typography,Card,Box } from '@mui/material'
import PiggyCoin from '../../assets/img/piggy-coin.svg'
const BackgroundColor = ({price, color, purchased, handleClick}) => {
    const classes = useStyles();        
    return (
        <div style={{backgroundColor: color}} className={classes.storeItem} onClick={handleClick}>
                {!purchased && <Card className={classes.ellipse} sx={{borderRadius: 5,width:55,height:20 }}>
                    <Box sx={{ display: 'flex',justifyContent:'space-between',height:'100%',alignItems: 'center', }}>
                        <Typography className={classes.sum}>{price}</Typography>
                        <img className={classes.coinImg} src={PiggyCoin} alt="PiggyCoin" />
                    </Box>
                </Card>}
        </div>
        )
}

export default BackgroundColor;