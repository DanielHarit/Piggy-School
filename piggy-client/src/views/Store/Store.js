import React, { useEffect, useState }  from 'react';
import { Card,Typography } from '@mui/material';
import Avatar from './Avatar';
import useStyles from './useStyles';
import BackgroundColor from './BackgroundColor';
import axios from 'axios';
import config from '../../conf.json';
import Swal from 'sweetalert2';
import BackgroundColorContext from '../../contexts/backgroundColorContext';
import CoinsContext from '../../contexts/coinsContext';

const Store = () => {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const { setBackgroundColor } = React.useContext(BackgroundColorContext);
  const { setCoins, coins } = React.useContext(CoinsContext);


  const loadUserDetailes = () => {
    const userMail = JSON.parse(sessionStorage.getItem('profileObj'))['email']
    axios.get(
        `${config.PIGGY_DB_URL}/children/mail/${userMail}`
    ).then((result)=>setUser(result.data))
  }

  const handleColorPurchase = (itemId, color) => {
    axios.post(`${config.PIGGY_DB_URL}/purchase/backgroundColor`, {childrenMail: user.Mail, itemId: itemId})
    .then(() => {
      setBackgroundColor(color);
      Swal.fire({
        title: `הרקע הוחלף בהצלחה`,
        width: "80%",
        confirmButtonColor: "#781f63",
        confirmButtonText: "המשך",
      }).then(() => loadUserDetailes());
    })
  }

  const handleAvatarPurchase = (itemId) => {
    axios.post(`${config.PIGGY_DB_URL}/purchase/avatar`, {childrenMail: user.Mail, itemId: itemId})
    .then(() => {
      Swal.fire({
        title: `האוואטר הוחלף בהצלחה`,
        width: "80%",
        confirmButtonColor: "#781f63",
        confirmButtonText: "המשך",
      }).then(() => loadUserDetailes());
    })
  }

  const purchaseColor = (itemId, color, price, coinAmount, purchased) => {
    if(purchased) {
      handleColorPurchase(itemId, color);
    } else if(price > coinAmount) {
      Swal.fire({
        title: `חסרים לך ${price-coinAmount} מטבעות`,
        width: "80%",
        confirmButtonColor: "#781f63",
        confirmButtonText: "חזור לחנות",
      });
    } else {
      Swal.fire({
        title: `אתה יכול לקנות אותי! זה יעלה לך רק  ${price} מטבעות חזיר`,
        width: "80%",
        confirmButtonColor: "#781f63",
        confirmButtonText: "קניתי",
        showCancelButton: true,
        cancelButtonText: "אולי בפעם אחרת"
      }).then((result) => {
        if (result.isConfirmed) {
          setCoins(coins-price)
          handleColorPurchase(itemId, color);
        }
      });
    }
  }

  const purchaseAvatar = (itemId, price, coinAmount, purchased) => {
    if(purchased) {
      handleAvatarPurchase(itemId);
    } else if(price > coinAmount) {
      Swal.fire({
        title: `חסרים לך ${price-coinAmount} מטבעות`,
        width: "80%",
        confirmButtonColor: "#781f63",
        confirmButtonText: "חזור לחנות",
      });
    } else {
      Swal.fire({
        title: `אתה יכול לקנות אותי! זה יעלה לך רק  ${price} מטבעות חזיר`,
        width: "80%",
        confirmButtonColor: "#781f63",
        confirmButtonText: "קניתי",
        showCancelButton: true,
        cancelButtonText: "אולי בפעם אחרת"
      }).then((result) => {
        if (result.isConfirmed) {
          setCoins(coins-price)
          handleAvatarPurchase(itemId);
        }
      });
    }
  }

  const loadAvatars = () => {
    axios.get(`${config.PIGGY_DB_URL}/avatar`).then((result) => {
            const avatars = result.data.map((avatarItem) => {
            if(user.PurchesHistory?.includes(avatarItem._id)) {
              return ({...avatarItem, purchased: true})
            } else {
              return ({...avatarItem, purchased: false})
            }
          })
          setAvatars(avatars);
    })
  }

  const loadBackgroundColors = () => {
    axios.get(`${config.PIGGY_DB_URL}/backgroundcolor`).then((result) =>{
          const colors = result.data.map((backgroundColorItem) => {
          if(user.PurchesHistory?.includes(backgroundColorItem._id)) {
            return ({...backgroundColorItem, purchased: true})
          } else {
            return ({...backgroundColorItem, purchased: false})
          }
        })
        setBackgroundColors(colors);
  })
}

  const renderAvatars = (avatars) => {
    return avatars.map(avatar =>{
      return (
        <Avatar 
          key={avatar._id} 
          type='אוואטר'
          title={avatar.Name}
          imageUrl={avatar.URL}
          price={avatar.Cost}
          handleClick={() => {
            purchaseAvatar(avatar._id, avatar.Cost, user.PiggyCoins, avatar.purchased);
          }}
          purchased={avatar.purchased}
        />)
    })
  }

  const renderBackgroundColors = (backgroundColors) => {
    return backgroundColors.map(color =>{
      return (
        <BackgroundColor 
          key={color._id} 
          title={color.Name}
          price={color.Cost}
          color={color.Color}
          handleClick={() => {
            purchaseColor(color._id, color.Color, color.Cost, user.PiggyCoins, color.purchased);
          }}
          purchased={color.purchased}
        />)
    })
  }

  useEffect(() => {
    loadUserDetailes();
  }, []);

  useEffect(() => {
    if(user) {
      loadAvatars();
      loadBackgroundColors();
    }
  }, [user]);
  
  return (
      <div className = {classes.pageContainer}>
          <Typography variant='h4'>חנות חזירונים</Typography>
          <Typography variant='h6'>אווטרים</Typography>
          <div className={classes.productsContainer}>
              {renderAvatars(avatars)}
          </div>
          <Typography variant='h6'>צבע רקע</Typography>
          <div className={classes.productsContainer}>
              {renderBackgroundColors(backgroundColors)}
          </div>
      </div>
  )
}

export default Store;
