import InstaStories from "react-insta-stories";
import { useNavigate } from 'react-router-dom';
import routes from '../../components/Router/Routes';

const mockStories = [
  {
    url: "https://i.postimg.cc/RVYndNBW/story1-1.png",
  },
  {
    url: "https://i.postimg.cc/d1dKbNkM/story1-2.png",
  },
  {
    url: "https://i.postimg.cc/RVYndNBW/story1-1.png",
  },
  {
    url: "https://i.postimg.cc/d1dKbNkM/story1-2.png",
  },
];

const Stories = () => {

  const navigate = useNavigate();
	const closeStories = () =>
		navigate(routes.ChildLanding);

  return (
    <InstaStories
      stories={mockStories}
      defaultInterval={2500}
      width={'100%'}
      height={'100%'}
      onAllStoriesEnd={closeStories}
    />
    );
  };
export default Stories;
