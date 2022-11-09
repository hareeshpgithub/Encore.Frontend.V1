import useHomePageStyles from "./HomePageStyles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function ItemListPage({
  syllabus,
  selectedData,
  handleSylabusClick,
  listData,
}) {
  const classes = useHomePageStyles();

  return (
    <Grid container className={classes.secondaryPage}>
      <Grid item xs={12} md={2}>
        <div className={classes.secondarySideMenu}>
          {syllabus.map((syllabusItem) => (
            <ListItem
              button
              key={syllabusItem.id}
              className={classes.sideMenuItem}
              selected={selectedData.syllabus?.id === syllabusItem.id}
              onClick={() =>
                handleSylabusClick(syllabusItem.id, syllabusItem.name)
              }
            >
              <ListItemText primary={syllabusItem.name} />
            </ListItem>
          ))}
        </div>
      </Grid>
      <Grid item xs={12} md={10}>
        <div className={classes.secondaryRightSide}>
          {classList.map((classListItem) => (
            <Card
              key={classListItem.id}
              className={`${classes.cardItem} ${
                selectedData.class?.id === classListItem.id && "active"
              }`}
              onClick={() =>
                handleClassClick(classListItem.id, classListItem.clas)
              }
            >
              <CardContent>
                <Typography gutterBottom variant="h6" component="h4">
                  {classListItem.clas}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}
