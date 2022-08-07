import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EducationCard  from "./EducationCard";
import ProfessionCard from "./ProfessionCard";
import Timeline from '@material-ui/lab/Timeline';
import Achievement from "./Achievement";


const useStyles = theme => ({
  root:{
    border: 'none',
    borderRadius: 'none',
    boxShadow: 'none'
  },
  heading: {
    fontWeight: 401
  }
});


class Career extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      jobs: [
        {name: "Punchh", post: "SDE-II", from: "11/2021", to: null, current: true},
        {name: "Daffodil Software", post: "Associate IT", from: "03/2018", to: "10/2021", current: false},
        {name: "Campus Box", post: "Intern", from: "01/2018", to: "03/2018", current: false},
      ],
      schools: [
        {degree: "B.Tech in Computer Sience", name: "Galgotias College of Engg & Technology", from: "2014", to: "2018"},
        {degree: "High School", name: "Little Flower School", from: "1997", to: "2012"} 
      ],
      achievements: [
        {title: "Hero 2021", company: "Daffodil Software", when: "2021"},
        {title: "Best Fresher", company: "Daffodil Software", when: "2018"},
        {title: "", company: "GATE", when: "2018"}
      ]
    }
  }

  render(){
    const {classes} = this.props;
    let content = null;
    if(this.props.type === "career"){
      content = this.state.jobs.map((j)=> <ProfessionCard job={j} />); 
    }else if(this.props.type === "education"){
      content = this.state.schools.map((j)=> <EducationCard school={j} />);
    }else if(this.props.type === "success"){
      content = this.state.achievements.map((j)=> <Achievement event={j} />);
    }

    return(
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="subtitle1" className={classes.heading} color="textSecondary">{this.props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Timeline align="alternate">
            {content}
          </Timeline>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles(useStyles)(Career);