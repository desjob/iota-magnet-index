import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import LensRounded from '@material-ui/icons/LensRounded'

const useStyles = makeStyles(theme => ({

    paper: {
        textAlign: 'left',
        minWidth: 500,
        maxWidth: 900,
        padding: 10,
        marginBottom: 10,
        overflow: 'auto'
    },
    row: {
        margin: 10,
        width: '100%',
        minHeight: 10,

    },
    icon: {
        color: 'green',
        height: 10,
    },
}));

const NodeConfig = (props) => {

    const classes = useStyles();

    return(
        <Paper className={classes.paper}>
            <div className="row">
                <h3>IOTA node connection</h3>
            </div>

            <div className="row">
                <Divider variant="middle" />
            </div>


            <div className="row">
                node: <em>{props.mamConfig.provider}</em>
                <LensRounded className={classes.icon}/>
            </div>
        </Paper>
    );
}

export default NodeConfig;