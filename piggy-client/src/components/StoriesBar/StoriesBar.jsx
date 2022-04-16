import { makeStyles } from "@mui/styles";
import { useMemo } from "react";
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from '../../components/Router/Routes';

const useStyles = makeStyles(() => ({
  root: {},
}));

const StoriesBar = ({ storyPreviews }) => {
  const classes = useStyles();
  const navigate = useNavigate();
	const goToStories = () =>
		navigate(routes.Stories);
  const previewsToDisplay = useMemo(() => {
    return {
      url: "https://previews.123rf.com/images/mirawonderland/mirawonderland2003/mirawonderland200300009/142468875-portrait-of-a-dog-cat-rabbit-and-a-parrot-piled-up-vertically-isolated-on-a-white-background.jpg",
    };
  }, [storyPreviews]);

  return (
    <div className={classes.root}>
      <Button color='inherit' onClick={goToStories}>
							Open story
			</Button>
    </div>
  );
};

export default StoriesBar;
