import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LensRounded from '@material-ui/icons/LensRounded';

import ContentBox from '../../components/contentBox';

const useStyles = makeStyles(() => ({
    icon: {
        color: 'green',
        height: 10,
    },
}));

// this will be a stateful component in the future
const NodeConfig = (props) => {

    const classes = useStyles();
    const {mamConfig} = props;

    return (
        <ContentBox title="Node configuration">
            <div>
                node: <em>{mamConfig.provider}</em>
                <LensRounded className={classes.icon}/>
            </div>
        </ContentBox>
    );
}

export default NodeConfig;