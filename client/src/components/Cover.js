import React from "react";
import { makeStyles, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme)=>({
    coverRoot: {
        margin: 16
    }
}));

function Cover(props){
    const classes = useStyles();
    return (
        <Typography className={classes.coverRoot} color="textSecondary">
            2018 GATE qualified, tinkering professionally with Ruby on Rails at Punchh. I want to learn more and contribute to large distributed micro-services.
        </Typography>
    );
}

export default Cover;