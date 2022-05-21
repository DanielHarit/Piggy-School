import * as React from 'react';
import HomePage from '../components/HomePage';
import HomepageHeader from '../components/HomePage/HomepageHeader';
import HomePageFooter from '../components/HomePage/HomePageFooter';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChildHomePage from './ChildHomePage';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import config from '../conf.json';
import ChildrenSettings from '../views/ChildrenSettings/ChildrenSettings';
import routes from '../components/Router/Routes';
import ChildWishList from './ChildWishList';
import ChildAddWish from './ChildAddWish';
import Store from './Store/Store';
import Stories from './Stories';
import { StoriesContextProvider } from '../StoriesContext';

const useStyles = makeStyles((theme) => ({
	root: {
		height: 'calc(100vh - 330px)',
		overflowY: 'auto',
	},
}));

const ChildIndex = () => {
	const classes = useStyles();
	const [user, setUser] = useState({});
	const [showHelloMgs, setShowHelloMsg] = useState(true);

	useEffect(async () => {
		const userMail = JSON.parse(sessionStorage.getItem('profileObj'))['email'];
		const user = await axios.get(`${config.PIGGY_DB_URL}/children/mail/${userMail}`);
		setUser(user.data);
	}, []);

	const navigate = useNavigate();

	return (
		<div>
			<StoriesContextProvider>
				<HomePage title='PIGGY'>
					<HomepageHeader
						username={user.UserSettings?.DisplayName}
						caption='בוקר אש'
						showHelloMsg={showHelloMgs}
						coins={user?.PiggyCoins}
						totalCoins={user?.totalPiggyCoins}
					/>
					<div className={classes.root}>
						<Routes>
							<Route path={routes.ChildrenHomePage} element={<ChildHomePage />} />
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
							<Route path={routes.Stories + '/:storyPrefix'} element={<Stories />} />
							<Route path='*' element={<Navigate to={'children'} />} />
						</Routes>
					</div>
					<HomePageFooter
						onBtnsClick={{
							left: () => {
								setShowHelloMsg(false);
								navigate('/child' + routes.ChildSettings, {
									state: { settings: user.UserSettings, mail: user.Mail },
								});
							},
							middle: () => {
								setShowHelloMsg(true);
								navigate('/child' + routes.ChildrenHomePage);
							},
						}}
					/>
				</HomePage>
			</StoriesContextProvider>
		</div>
	);
};

export default ChildIndex;
