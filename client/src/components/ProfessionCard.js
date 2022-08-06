import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  whiteText: {
    // textColor: "balck"
  }
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
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography className={classes.whiteText} variant="body2" color="textSecondary">
              {duration}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <FastfoodIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                {job.name}
              </Typography>
              <Typography>{job.post}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
    );
}

export default ProfessionCard;
