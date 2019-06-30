import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignItems: 'flex-start',
        textAlign: 'left',
        minWidth: 350,
        maxWidth: 900,
        padding: 0,
        marginBottom: 10,
        marginRight: 10,
        overflow: 'auto',
    },
    content: {
        padding: 0,
        margin: 10,
    },
    header: {
        padding: 0,
        marginLeft: 10,
    },
    divider: {
        padding: 5,
        margin: 0,
        minWidth: '100%',
    },
    contentWrapper: {
        width: '100%',
    }
}));

const ContentBox = (props) => {

    const classes = useStyles();
    const {title, children} = props;

    return (
        <div>
            <Paper className={classes.paper}>

                <div className={classes.contentWrapper}>

                    <div className={classes.header}>
                        <h3>{title}</h3>
                    </div>

                    <div className={classes.divider}>
                        <Divider variant="fullWidth"/>
                    </div>

                    <div className={classes.content}>
                        {children}
                    </div>

                </div>
            </Paper>
        </div>
    );
}

export default ContentBox;