import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LensRounded from '@material-ui/icons/LensRounded';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {connect} from 'react-redux';

import ContentBox from '../../components/contentBox';
import {setUseCustomNode} from "./actions";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
    icon: {
        color: 'green',
        height: 10,
    },
}));

const mapStateToProps = (state) => {
    console.log(state);
    return {
        nodeList: state.publish.nodeList,
        mamConfig: state.publish.mamConfig,
        useCustomNode: state.publish.useCustomNode,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUseCustomNodeChange: (event) => dispatch(setUseCustomNode(event.target.checked)),
        // onMagnetLinkChange: (event) => dispatch(setPublishMagnetLink(event.target.value)),
        // onPublish: () => dispatch(performPublish()),
    }
};


// this will be a stateful component in the future
const NodeConfig = (props) => {

    const classes = useStyles();
    const {mamConfig, nodeList, onUseCustomNodeChange, useCustomNode} = props;

    const handleChange = (event) => {

        console.log(event);
    }

    return (
        <ContentBox title="Node configuration">

            <div>
                <form autoComplete="off">
                    <div>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={useCustomNode}
                                    onChange={onUseCustomNodeChange}
                                    color="primary"
                                />
                            }
                            label="Use custom node"
                        />
                    </div>


                    {!useCustomNode &&
                    <div>
                        <br/>
                        <FormControl>
                            <InputLabel htmlFor="node-select">IOTA Node</InputLabel>
                            <Select
                                value={mamConfig.provider}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'node-select',
                                }}
                            >
                                {nodeList.map((value, index) => {
                                    return <MenuItem key={index} value={value}>{value}</MenuItem>
                                })}


                            </Select>
                        </FormControl>
                    </div>
                    }


                    {useCustomNode &&
                    <div>
                        <FormControl>
                            <TextField
                                id="custom-node"
                                label="IOTA Node"
                                className={classes.textField}
                                margin="normal"
                                value={'sd'}
                                onChange={handleChange}
                                disabled={false}
                            />
                        </FormControl>
                    </div>
                    }

                    <br/>
                    <div>

                            Status: <LensRounded className={classes.icon}/>

                    </div>
                </form>
            </div>
        </ContentBox>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeConfig);