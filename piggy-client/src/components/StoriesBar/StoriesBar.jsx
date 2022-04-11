import { makeStyles } from "@mui/styles";
import { useMemo } from "react";

const useStyles = makeStyles(() => ({
  root: {},
}));

const StoriesBar = ({ storyPreviews }) => {
  const classes = useStyles();
  const previewsToDisplay = useMemo(() => {
    return {
      url: "https://previews.123rf.com/images/mirawonderland/mirawonderland2003/mirawonderland200300009/142468875-portrait-of-a-dog-cat-rabbit-and-a-parrot-piled-up-vertically-isolated-on-a-white-background.jpg",
    };
  }, [storyPreviews]);

  return (
    <div className={classes.root}>
      <button>Open story</button>
    </div>
  );
};

export default StoriesBar;
