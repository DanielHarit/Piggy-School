import useStyles from './useStyles';
import cx from 'classnames';
import { Button, Skeleton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from '../../components/Router/Routes';
import { useStories } from '../../StoriesContext';
import { ReactComponent as StoryBtnIcon } from '../../assets/img/piggy-story-icon.svg';

const StoriesBar = ({ isLoadingUserData }) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const goToStories = (storyPrefix) => {
		navigate(`/child${routes.Stories}/${storyPrefix}`);
	};
	const { stories: allStories } = useStories();

	const renderStoriesBar = (allStories) => {
		return allStories.map((story) => {
			return (
				<Button
					key={story.storyPrefix}
					color='inherit'
					onClick={() => goToStories(story.storyPrefix)}
					className={cx(classes.storyBtn, {
						[classes.storyNotSeenBtn]: !story.seen,
					})}>
					<StoryBtnIcon />
				</Button>
			);
		});
	};

	const renderSkelaton = () => (
		<Box className={classes.skelatonBox}>
			{[...Array(5)].map((a, i) => (
				<Skeleton className={classes.skelaton} variant='circular' width={50} height={50} key={i} />
			))}
		</Box>
	);

	return <div className={classes.root}>{isLoadingUserData ? renderSkelaton() : renderStoriesBar(allStories)}</div>;
};

export default StoriesBar;
