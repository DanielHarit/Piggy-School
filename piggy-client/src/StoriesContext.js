import axios from 'axios';
import config from './conf.json';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { sessionStorageService } from './services/sessionStorageService';

const StoriesContext = createContext();
const StoriesUpdateContext = createContext();

export const useStories = () => {
	return useContext(StoriesContext);
};

export const useStoriesUpdate = () => {
	return useContext(StoriesUpdateContext);
};

export const StoriesContextProvider = ({ children }) => {
	const [stories, setStories] = useState([]);

	const fetchStories = useCallback(async () => {
		const user = sessionStorageService.get('profileObj');
		if (!user || !user.email) {
			return;
		}
		try {
			const stories = await axios.get(`${config.PIGGY_DB_URL}/stories/${user.email}`);
			setStories(stories.data);
		} catch (err) {
			console.log(`Failed to fetch stories with error: ${err}`);
		}
	}, []);

	const markStorySetAsSeen = async (storySetIndex) => {
		const user = sessionStorageService.get('profileObj');
		if (!user || !user.email) {
			return;
		}
		try {
			const res = await axios.post(`${config.PIGGY_DB_URL}/stories/addToWatchList`, {
				userEmail: user.email,
				storyNumber: Number(storySetIndex),
			});
			fetchStories();
			return res.data;
		} catch (err) {
			console.log('Failed to update watched story set');
		}
	};

	const storiesUpdateActions = {
		markStorySetAsSeen,
	};

	useEffect(() => {
		fetchStories();
	}, [fetchStories]);

	return (
		<StoriesContext.Provider value={{ stories }}>
			<StoriesUpdateContext.Provider value={storiesUpdateActions}>{children}</StoriesUpdateContext.Provider>
		</StoriesContext.Provider>
	);
};
