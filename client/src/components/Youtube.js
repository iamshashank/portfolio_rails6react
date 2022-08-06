import {Chip, Typography } from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import { withStyles } from "@material-ui/styles";
import React from "react";



const useStyles = theme => ({
  noneD: {
    display: 'none'
  }
});



class Youtube extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dataLoaded: false,
      data: { videos: [] }
    }
  }

  componentWillMount() {
    fetch('/api/v1/youtube/videos')
    .then(r => r.json())
    .then(r => {
      this.setState({
        dataLoaded: true,
        data: r
      });
      // console.log(r);
    }).catch(e => console.log(e))
  }

  getVideoIframe(video){
    return(
      <iframe style={{display: "inline-block", margin: 8, borderRadius: 6}} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"width="384" height="216" type="text/html" src={`https://www.youtube.com/embed/${video}?autoplay=0&iv_load_policy=3&showinfo=1&cc_load_policy=0&start=0&end=0&vq=hd720`}></iframe>
    );
  }

// <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0"width="320" height="180" type="text/html" src="https://www.youtube.com/embed/wzEOmlVs_mE?autoplay=0&fs=1&iv_load_policy=3&showinfo=1&rel=0&cc_load_policy=0&start=0&end=0&vq=hd720&origin=http://youtubeembedcode.com"><div><small><a href="https://youtubeembedcode.com/es/">youtubeembedcode es</a></small></div><div><small><a href="https://xn--bstautlndskacasino-ltbg.nu/">bästautländskacasino.nu</a></small></div><div><small><a href="https://youtubeembedcode.com/pl/">youtubeembedcode pl</a></small></div><div><small><a href="https://spelbolag-utan-svensk-licens.se/">Spelbolag-utan-svensk-licens.se</a></small></div></iframe>
  render(){
    const classes = this.props.classes;
    let html = null;
    if(!this.state.dataLoaded){
      html = <div></div>;
    }else{
      html = 
      <div>        
        <div style={{overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap"}}>
          { this.state.data.videos.map((vid)=> this.getVideoIframe(vid) )  }
        </div>
        <div>
          <Chip style={{marginRight: 8}} color="secondary" size="medium" label={`${this.state.data.stats.subscriberCount} subscriber`} variant="outlined" icon={<FaceIcon />}/>
          <Chip style={{marginRight: 8}} color="secondary" size="medium" label={`${this.state.data.stats.videoCount} videos`} variant="outlined"/>
          <Chip style={{marginRight: 8}} color="secondary" size="medium" label={`${this.state.data.stats.viewCount} views`} variant="outlined"/>
        </div>
      </div>
    }
    return(
      html
    );
  }
}

export default withStyles(useStyles)(Youtube);