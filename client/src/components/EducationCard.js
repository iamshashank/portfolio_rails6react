import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginRight: 16
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));


function EducationCard(props) {
  const classes = useStyles();
  const {school} = props;
  let duration = null;
  if(school.current){
    duration = `${school.from} - current`
  }else{
    duration = `${school.from} - ${school.to}`
  }
  return (

    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {school.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {school.degree}
        </Typography>
        <Typography variant="body2" component="p">
          {duration}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default EducationCard;
