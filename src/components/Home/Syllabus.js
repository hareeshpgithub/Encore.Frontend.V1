import useHomePageStyles from "./HomePageStyles";
import Welcome from "./Welcome";

import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function Syllabus({
  loader,
  syllabus,
  handleSylabusClick,
  erroMsg,
}) {
  const classes = useHomePageStyles();

  return (
    <div>
      <div className={classes.heroContent}>
        <Welcome />
      </div>

      {loader && (
        <div className={classes.mainLoader}>
          <CircularProgress size={60} />
        </div>
      )}
      {erroMsg && (
        <div className={classes.errorMessage}>
          <Typography gutterBottom variant="h5" component="h2">
            {erroMsg}
          </Typography>
        </div>
      )}
    </div>
  );
}
