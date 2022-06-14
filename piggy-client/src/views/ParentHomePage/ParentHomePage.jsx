import ChildrenBoard from "../../components/ChildrenBoardData/ChildrenBoard";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../conf.json";
import routes from "../../components/Router/Routes";
import ChildrenDisplayAll from "../../components/ChildrenBoardData/ChildrenDisplayAll";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import CardDetails from "../../components/CardInfo/CardDetails";
import CardHistory from "../../components/CardInfo/CardHistory";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
	container: {
    width: '60%',
    marginRight: 'auto',
    marginLeft: 'auto',
    },
    title:{
      marginTop: 20,
      width: '85%',
      marginRight: 'auto',
	  	marginLeft: 'auto',
    },
    noChildren: {
      display : 'flex',
      flexDirection: 'column',
      width : '50vw',
      margin: '10vh auto',
      alignItems: 'center'
    }
}))

const ParentHomePage = () => {
  const classes = useStyles();
  // const { amount, setAmount, setSelectedChildrenId, selectedChildrenId } = useContext(ParentContext);
  const [selectedChildrenId, setSelectedChildrenId] = useState("");
  const [childrens, setChildrens] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [isChildrenLoading, setIsChildrenLoading] = useState(true);

  useState(async () => {
    const userMail = JSON.parse(sessionStorage.getItem("profileObj"))["email"];
    const user = await axios.get(
      `${config.PIGGY_DB_URL}/parent/mail/${userMail}`
    );
    setUserId(user.data._id);
  }, []);

  useEffect(async () => {
    if (userId) {
      const childrens = await axios.get(
        `${config.PIGGY_DB_URL}/parentChild/${userId}`
      );
      setChildrens(childrens.data);
      setIsChildrenLoading(false);
    }    
    
  }, [userId]);

  return (
    <div className={classes.root}>
       { childrens.length !== 0 ?<>
      <Typography className={classes.title}>אני רוצה לבדוק את המצב של..</Typography>
     

      <div className={classes.container}>
      <ChildrenDisplayAll 
        parentId={userId}
        childrens = {childrens}
        selectedChildrenId={setSelectedChildrenId}
        isNavigate="true"
        isChildrenLoading ={isChildrenLoading}
      />
      </div>

      <Typography className={classes.title}>מבט מהיר שבועי</Typography>
      <ChildrenBoard childrenList={childrens} isChildrenLoading={isChildrenLoading} daysNum={7}></ChildrenBoard>
      </>
      : 
      <div className={classes.noChildren}>
        <Typography variant='h3'>אופס!</Typography>
        <Typography variant='h5' align="center">נראה שאין לך קישור לאף ילד. תוכל לצרף אותם דרך מסך ההגדרות</Typography>
      </div>
    }
    </div>

  );
};

export default ParentHomePage;
