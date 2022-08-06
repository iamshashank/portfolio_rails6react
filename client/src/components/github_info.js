import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Chip } from '@material-ui/core';

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
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  rootList: {
    width: '100%',
    height: 285,
    marginBottom: 8,
    // maxHeight: 242,
    padding: 0,
    overflowY: 'scroll'    
  },
  inline: {
    display: 'inline',
  },
  tabPanel: {
    paddingTop: 0,
    paddingBottom: 0,
  }
});


class GithubInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 }
    // this.classes = useStyles(); 
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.repoListItem = this.repoListItem.bind(this);
    this.generateRepoList = this.generateRepoList.bind(this);
    this.generateRepoLanguageList = this.generateRepoLanguageList.bind(this);
    this.perRepoLanguages = this.perRepoLanguages.bind(this);
  }

  handleChange(event, newValue){
    this.setState({value: newValue});
  }

  perRepoLanguages(lang, key){
    return(
      <Chip style={{marginRight: 4, marginBottom: 8}} color="grey" size="small" label={lang}/>
    );
  }

  repoListItem(repo, classes, key){
    return (
      <a key={key} target='blank' href={repo.html_url} style={{textDecoration: 'none'}}>
        <ListItem alignItems="flex-start" button={true} divider={true} style={{width: '100%'}}>
          <ListItemAvatar>
            <Avatar variant='rounded' alt={repo.name} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <div>
            <ListItemText
              primary={repo.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                  {`${repo.description} `}
                  </Typography>
                </React.Fragment>
              }
            />
            {this.generateRepoLanguageList(repo.languages)}
          </div>
        </ListItem>
      </a>
    );
    // {this.generateRepoLanguageList(repo.languages)}
  }

  organizationItem(org, classes, key){
    return (
      <a key={key} target='blank' href={org.url} style={{textDecoration: 'none'}}>
        <ListItem alignItems="flex-start" button={true} divider={true} style={{width: '100%'}}>
          <ListItemAvatar>
            <Avatar variant='rounded' alt={org.avatar_url} src={org.avatar_url} />
          </ListItemAvatar>
          <ListItemText
            primary={org.login}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                {`${org.description}`}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </a>
    );    
  }

  generateRepoLanguageList(languages){
    if(this.props.dataLoaded){
      return languages.map((lang)=> this.perRepoLanguages(lang));
    }
  }

  generateRepoList(data, classes) {
    // console.log('called', state, classes);
    if (this.props.dataLoaded){
      return data.last_5_repo.map((repo, index)=> this.repoListItem(repo, classes, index));
    } 
  }  

  generateOrganizationList(data, classes) {
    if (this.props.dataLoaded){
      return data.organizations.map((org, index)=> this.organizationItem(org, classes, index));
    } 
  }
  
  render(){
    const { classes } = this.props;
    return (
      <div>
        <List className={classes.rootList}>
          {this.generateOrganizationList(this.props.data, classes)}
          {this.generateRepoList(this.props.data, classes)}
        </List>
      </div>
      // <div className={classes.root}>
      //   <Paper position="static">
      //     <Tabs
      //       variant="fullWidth"
      //       value={this.state.value}
      //       onChange={this.handleChange}
      //       aria-label="nav tabs example"
      //     >
      //       <LinkTab label={`Github repo [ ${this.props.data.repo_count || ''} ]`} href="/" {...a11yProps(0)} />
      //       <LinkTab label="Organizations" href="/" {...a11yProps(1)} />
      //       {/* <LinkTab label="Page Three" href="/" {...a11yProps(2)} /> */}
      //     </Tabs>
      //   </Paper>
      //   <TabPanel value={this.state.value} index={0} className={classes.tabPanel} >
      //       <List className={classes.rootList}>
      //         {this.generateRepoList(this.props.data, classes)}
      //       </List>

      //   </TabPanel>
      //   <TabPanel value={this.state.value} index={1}>
      //     <List className={classes.root}>
      //     {this.generateOrganizationList(this.props.data, classes)}
      //     </List>
      //   </TabPanel>
      // </div>
    );
  }

}
export default withStyles(useStyles)(GithubInfo)