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


function ProfessionCard(props) {
  const classes = useStyles();
  const {job} = props;
  let duration = null;
  if(job.current){
    duration = `${job.from} - current`
  }else{
    duration = `${job.from} - ${job.to}`
  }
  return (

    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {job.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {job.post}
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

export default ProfessionCard;
