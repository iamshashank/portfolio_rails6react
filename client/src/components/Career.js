import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EducationCard  from "./EducationCard";
import ProfessionCard from "./ProfessionCard";

const useStyles = theme => ({
  root:{
    border: '1px solid rgba(0, 0, 0, .125)',
    borderRadius: 'none',
    boxShadow: 'none'
  },
  heading: {
    
  }
});


class Career extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      jobs: [
        {name: "Punchh", post: "SDE-II", from: "01/11/2021", to: null, current: true},
        {name: "Daffodil Software", post: "Associate IT", from: "18/03/2018", to: "30/10/2021", current: false},
      ],
      schools: [
        {degree: "B.Tech in Computer Sience", name: "Galgotias College of Engg & Technology", from: "2014", to: "2018"},
        {degree: "High School", name: "Little Flower School", from: "1997", to: "2012"} 
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
    }

    return(
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h6" className={classes.heading}>{this.props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {content}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles(useStyles)(Career);