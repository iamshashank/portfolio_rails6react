import React from 'react';
import logo from '../assets/images/cover_1.jpg';
import myImage from '../assets/images/me.png';
import { withStyles } from '@material-ui/core/styles';
import CardActionIcons from './card_action_icons';
import GithubInfo from './github_info';
import PropTypes from 'prop-types';
import {Divider, Avatar, Tabs, Tab, Paper, Box, CardMedia, CardContent, CardActionArea, CardActions, Card, Typography} from '@material-ui/core';
import YouTube from './Youtube';
import Career from './Career';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      component="div"
      role="tabpanel"
      style={{padding: 0}}
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}



TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}




const useStyles = theme => ({
  appDivider: {
    // backgroundColor: 'rgba(255, 255, 255, 0.34) !important',
    bottom: 0,
    position: 'absolute',
    width: '140%',
    marginLeft: '-20%',
    marginRight: '-20%'  
  },  
  card: {
    margin: 'auto',
    width: '100%',
    // overflow: 'unset',
    [theme.breakpoints.up('sm')]: { // eslint-disable-line no-useless-computed-key
      width: 600
    },
    [theme.breakpoints.up('md')]: { // eslint-disable-line no-useless-computed-key
      width: 700
    }    
  }, 
  media: {
    height: 200,
    backgroundColor: "#ececec",
    [theme.breakpoints.up('md')]: { // eslint-disable-line no-useless-computed-key
      height: 195
    },
    [theme.breakpoints.up('lg')]: { // eslint-disable-line no-useless-computed-key
      height: 250
    }      
  },
  gitRepoInfo: {
    [theme.breakpoints.up('md')]: { // eslint-disable-line no-useless-computed-key
      height: 310
    },
    [theme.breakpoints.up('lg')]: { // eslint-disable-line no-useless-computed-key
      height: 310
    } 
  },
  large: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 24,
    left: 24,
    borderRadius: 6,
    [theme.breakpoints.up('sm')]: { // eslint-disable-line no-useless-computed-key
      width: 100,
      height: 100
    },    
    [theme.breakpoints.up('md')]: { // eslint-disable-line no-useless-computed-key
      width: 100,
      height: 100
    },
    [theme.breakpoints.up('lg')]: { // eslint-disable-line no-useless-computed-key
      height: 150,
      width: 150
    }       
  },
  actionClass: {
    flexDirection: 'column',
    alignItems: 'center',
    padding:0
  },
  profileName: {
    position: "absolute",
    bottom: 16,
    left: 24,
    color: "white",
    [theme.breakpoints.up('sm')]: { // eslint-disable-line no-useless-computed-key
      bottom: 16
    },    
    [theme.breakpoints.up('md')]: { // eslint-disable-line no-useless-computed-key
      bottom: 16
    },
    [theme.breakpoints.up('lg')]: { // eslint-disable-line no-useless-computed-key
      bottom: 16
    }  
  },
  companyDesignation: {
    position: "absolute",
    bottom: 0,
    color: "white",
    left: 24,
    lineHeight: 2,
    fontSize: "0.8rem",
    fontWeight: 399
  }
});

class MainProfile extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      dataLoaded: false,
      data: {}
    }
  }

  handleChange(event, newValue){
    this.setState({value: newValue});
  }

  componentWillMount() {
    fetch('/api/v1/total_repos')
    .then(r => r.json())
    .then(r => {
      if (r.status === true){
        this.setState({
          value: 0,
          dataLoaded: true,
          data: r
        });
      }
      // console.log(r);
    }).catch(e => console.log(e))
  }

  render(){
    const classes = this.props.classes;
    return(
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={logo}
            style={{position: 'relative'}}
            title="Shashank">
              <div>
                <Avatar variant="square" alt="Shashank Yadav" src={myImage} className={classes.large }></Avatar>
                <Typography gutterBottom variant="h5" className={classes.profileName}>Shashank Yadav</Typography>
                <Typography gutterBottom className={classes.companyDesignation}>SDE II at Punchh</Typography>
              </div>

            <Divider absolute={true} light={true} className={classes.appDivider} />
          </CardMedia>
        </CardActionArea>
        <CardContent>
          <Career title="Professional Career" type="career" />
          <Career title="Education" type="education" />
        </CardContent>
      <CardActions className={classes.actionClass}>
        <CardActionIcons />
      </CardActions>
      <CardContent className={classes.gitRepoInfo}>
        <div>
          <Paper position="static">
            <Tabs
              variant="fullWidth"
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab label={`Github [ ${this.state.data.followers || ''} ]`} href="/" {...a11yProps(0)} />
              <LinkTab label="Youtube" href="/" {...a11yProps(1)} />
              {/* <LinkTab label="Page Three" href="/" {...a11yProps(2)} /> */}
            </Tabs>
          </Paper>
          <TabPanel value={this.state.value} index={0}>
            <GithubInfo data={this.state.data} dataLoaded={this.state.dataLoaded} />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <YouTube videoIds={[]} />
          </TabPanel>
        </div>
        
      </CardContent>      
    </Card>
    );
  }
}

export default withStyles(useStyles)(MainProfile)