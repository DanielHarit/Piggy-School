import React from 'react';
import useStyles from './useStyles';
import { Typography,Card,Box,CardContent, CardMedia } from '@mui/material';
import PiggyCoin from '../../assets/img/piggy-coin.svg';
const Avatar = ({price, imageUrl, onPurchase, title, type, purchased, handleClick}) => {
    const classes = useStyles();
    return (
        <Card onClick={handleClick} className={classes.avatarCard} sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
               {title}
            </Typography>
            {!purchased&&<Card className={classes.avatarCoins} sx={{borderRadius: 5,width:55,height:20 }}>
                <Box sx={{ display: 'flex',justifyContent:'space-between',height:'100%',alignItems: 'center', }}>
                    <Typography className={classes.sum}>{price}</Typography>
                    <img className={classes.coinImg} src={PiggyCoin} alt="PiggyCoin" />
                </Box>
            </Card>}
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 70, height:75, marginTop:'2px' }}
          image={imageUrl}
        />
      </Card>
    )
}

export default Avatar;