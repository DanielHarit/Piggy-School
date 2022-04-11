import * as React from "react";
import HomePage from "../components/HomePage";
import HomepageHeader from "../components/HomePage/HomepageHeader";
import HomePageFooter from "../components/HomePage/HomePageFooter";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import ChildHomePage from "./ChildHomePage";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import configData from "../conf.json";
import ChildrenSettings from "../views/ChildrenSettings/ChildrenSettings";
import routes from "../components/Router/Routes";
import ChildWishList from "./ChildWishList";
import ChildAddWish from "./ChildAddWish";
import Store from "./Store/Store";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 120,
  },
}));

const ChildIndex = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [showHelloMgs, setShowHelloMsg] = useState(true);

  useEffect(() => {
    axios
      .get(`${configData.PIGGY_DB_URL}/children/62171cef74e8cac9530dcaac`)
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <HomePage title="PIGGY">
        <HomepageHeader
          username={user.UserSettings?.DisplayName}
          caption="בוקר אש"
          showHelloMsg={showHelloMgs}
        />
        <div className={classes.root}>
          <Routes>
            <Route path={routes.ChildLanding} element={<ChildHomePage />} />
            <Route
              path={routes.ChildSettings}
              element={
                <ChildrenSettings
                  settings={user.UserSettings}
                  mail={user.Mail}
                  onUserNameChange={(value) =>
                    setUser((prev) => ({
                      ...prev,
                      UserSettings: {
                        ...user.UserSettings,
                        DisplayName: value,
                      },
                    }))
                  }
                />
              }
            />
            <Route path={routes.ChildWishList} element={<ChildWishList />} />
            <Route path={routes.ChildAddWish} element={<ChildAddWish />} />
            <Route path={routes.Store} element={<Store />} />
            <Route path="*" element={<Navigate to={routes.ChildLanding} />} />
          </Routes>
        </div>
        <HomePageFooter
          onBtnsClick={{
            left: () => {
              setShowHelloMsg(false);
              navigate(routes.ChildSettings, {
                state: { settings: user.UserSettings, mail: user.Mail },
              });
            },
            middle: () => {
              setShowHelloMsg(true);
              navigate(routes.ChildLanding);
            },
          }}
        />
      </HomePage>
    </div>
  );
};

export default ChildIndex;
