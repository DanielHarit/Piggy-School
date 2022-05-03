import { useLocation } from "react-router-dom";
import ChildrenDisplayAll from '../../components/ChildrenBoardData/ChildrenDisplayAll';
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../conf.json";
import CardHistory from "../../components/CardInfo/CardHistory";
import routes from "../../components/Router/Routes";  
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import WishesSummery from '../../components/WishesSummery';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
    marginTop: 15,
		// width: '85%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	title: {
    marginTop: 15,
    width: '85%',
    marginRight: 'auto',
		marginLeft: 'auto',
    },
}));

const ChildrenQuickView = () => {
  const classes = useStyles();

  const [cardData, setCardData] = useState(null);
  const [userBudget, setUserBudget] = useState(0);
	const [amountLeftInCard, setAmountLeftInCard] = useState(0);
	const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [userId, setUserId] = useState("");
  const [childName, setChildName] = useState("");
  const [wishes, setWishes] = useState({});
  // const [selectedChildrenId, setSelectedChildrenId] = useState();

  const navigate = useNavigate();

  const {
    state: { selectedChildrenId }
  } = useLocation();

  useState(async () => {
    
    try {
      const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
      const user = await axios.get(
        `${config.PIGGY_DB_URL}/parent/mail/${userMail}`
      );
      setUserId(user.data._id);

      const child = await axios.get(
        `${config.PIGGY_DB_URL}/Children/${selectedChildrenId}`
      );

      setChildName(child.data.UserSettings.DisplayName);

      const userWishes = {};
      child.data.WishList.forEach((wish) => (userWishes[wish.priority] = wish));
      setWishes(userWishes);
  
      //  setUserName({selectedChildrenId});
      const userTotalBudget = Object.values(child.data.Budget).reduce((sum, categoryAmount) => sum + categoryAmount, 0);
      setUserBudget(userTotalBudget);

      const userCard = await axios.get(`${config.PAYMENT_SERVICE_URL}/card/${selectedChildrenId}`);
      setCardData(userCard.data);
    
      setAmountLeftInCard(userCard.data.amount - userTotalBudget >= 0 ? userCard.data.amount - userTotalBudget : 0);
    } catch (err) {
      setCardData({
        transactions: [],
      });
    } finally {
      setIsLoadingUserData(false);
    }

  }, []);

  
  return (
  <div className={classes.root}>
        {/* <div className={classes.title}> */}

          
          <IconButton onClick={() => navigate(-1)} color='primary' edge="start">
             <ArrowForwardIosIcon />
          </IconButton>

          <Typography fontSize="20px" className={classes.title}>
            המצב של {childName}
            </Typography> 

          <WishesSummery wishes={wishes} currAmount={amountLeftInCard} isLoadingUserData={isLoadingUserData} />

          <div className={classes.title}>
          <Typography> הוצאות השבוע  </Typography>
          </div>
          <CardHistory card={cardData} userBudget={userBudget} isLoadingUserData={isLoadingUserData} daysNum={7}></CardHistory>
        {/* </div> */}
  </div>
    )
}

export default ChildrenQuickView;
