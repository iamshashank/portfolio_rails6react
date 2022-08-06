import React from 'react';
import '../assets/css/App.css';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import MainProfile from './main_profile';
// import SecondaryProfile from './secondary_profile'

const useStyles = makeStyles((theme) => ({
  appDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.34) !important',
    top: '36.2%',
    [theme.breakpoints.up('md')]: { // eslint-disable-line no-useless-computed-key
      top: '48.4%'
    },
    [theme.breakpoints.up('lg')]: { // eslint-disable-line no-useless-computed-key
      top: '50%'
    }      
  }
}));


function App() {
  const classes = useStyles();

  return (
    <Container className="App-header" style={{ display: 'flex', flexDirection: 'column',
    justifyContent: 'center', paddingTop: 24, paddingBottom: 24}} maxWidth={false} >
      <Grid container spacing={4}>
        <Grid key={1} item xs={12} style={{alignSelf: 'center'}}>
          <MainProfile />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
