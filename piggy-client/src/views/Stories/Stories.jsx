import InstaStories from 'react-insta-stories';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '../../components/Router/Routes';
import { useStories, useStoriesUpdate } from '../../StoriesContext';
import useStyles from './useStyles';
import PiggyCoin from '../../assets/img/piggy-coin.svg';
import Advenced from '../../assets/img/advenced.png';
import Best from '../../assets/img/best.png';

const Stories = ({ totalPiggyCoins }) => {
	const { storyPrefix } = useParams();
	const navigate = useNavigate();
	const classes = useStyles();
	const allStories = useStories();
	const storyToDisplay = allStories.find((item) => item.storyPrefix == Number(storyPrefix));
	const { markStorySetAsSeen } = useStoriesUpdate();

	const handleFinishStorySet = () => {
		if (storyToDisplay.seen) {
			navigate(`child${routes.ChildrenHomePage}`);
		} else {
			markStorySetAsSeen(storyPrefix).then(() => {
				Swal.fire({
					title: 'הרווחת!',
					text: 'כמה? 30 מטבעות ועוד ידע פיננסי ששווה זהב',
					width: '80%',
					imageUrl: PiggyCoin,
					imageWidth: 50,
					imageHeight: 50,
					showConfirmButton: false,
					timer: 3000,
				}).then(() => {
					if (totalPiggyCoins + 30 > 500 && totalPiggyCoins < 500) {
						navigate(`/child${routes.ChildrenHomePage}`, {
							state: {
								swalObj: {
									title: 'מזל טוב!',
									text: 'התקדמת לדרגת חזירון תותח',
									width: '80%',
									imageUrl: Best,
									imageWidth: 50,
									imageHeight: 50,
									showConfirmButton: false,
									timer: 3000,
								},
							},
						});
					} else if (totalPiggyCoins + 30 > 250 && totalPiggyCoins < 250) {
						navigate(`/child${routes.ChildrenHomePage}`, {
							state: {
								swalObj: {
									title: 'מזל טוב!',
									text: 'התקדמת לדרגת חזירון מתקדם',
									width: '80%',
									imageUrl: Advenced,
									imageWidth: 50,
									imageHeight: 50,
									showConfirmButton: false,
									timer: 3000,
								},
							},
						});
					} else {
						navigate(`/child${routes.ChildrenHomePage}`);
					}
				});
			});
		}
	};

	return (
		<div className={classes.root}>
			<InstaStories
				stories={storyToDisplay.photos}
				defaultInterval={3500}
				width={'100%'}
				height={'100%'}
				onAllStoriesEnd={handleFinishStorySet}
			/>
		</div>
	);
};
export default Stories;
