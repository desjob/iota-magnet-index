import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {connect} from 'react-redux';

import ContentBox from '../../components/contentBox';
import {setUseCustomNode, setCustomNode, selectNode} from "./actions";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
    icon: {
        color: 'green',
        height: 10,
    },
    inputContainer: {
        height: 60,
    },
    textField: {
        width: 300,
    },
    select: {
        width: 300,
    }
}));

const mapStateToProps = (state) => {
    return {
        nodeList: state.nodeConfig.nodeList,
        selectedNode: state.nodeConfig.selectedNode,
        useCustomNode: state.nodeConfig.useCustomNode,
        customNode: state.nodeConfig.customNode,
        publishPending: state.publish.isPending,
        subscriptionsPending: state.subscriptions.isPending,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUseCustomNodeChange: (event) => dispatch(setUseCustomNode(event.target.checked)),
        onCustomNodeChange: (event) => dispatch(setCustomNode(event.target.value)),
        onSelectNode: (event) => dispatch(selectNode(event.target.value)),
    }
};

const NodeConfig = ({nodeList, onUseCustomNodeChange, useCustomNode, selectedNode, customNode, publishPending, subscriptionsPending, onCustomNodeChange, onSelectNode}) => {

    const classes = useStyles();

    return (
        <ContentBox title="Node configuration">

            <div>
                <form autoComplete="off">
                    <div>
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={publishPending || subscriptionsPending}
                                    checked={useCustomNode}
                                    onChange={onUseCustomNodeChange}
                                    color="primary"
                                />
                            }
                            label="Use custom node"
                        />
                    </div>


                    {!useCustomNode &&
                    <div className={classes.inputContainer}>
                        <br/>
                        <FormControl>
                            <InputLabel htmlFor="node-select">IOTA Node</InputLabel>
                            <Select
                                disabled={publishPending || subscriptionsPending}
                                className={classes.select}
                                value={selectedNode}
                                onChange={onSelectNode}
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
                    <div className={classes.inputContainer}>
                        <FormControl>
                            <TextField
                                className={classes.textField}
                                id="custom-node"
                                label="IOTA Node"
                                margin="normal"
                                value={customNode}
                                onChange={onCustomNodeChange}
                                disabled={publishPending || subscriptionsPending}
                                placeholder={"enter node url.."}
                            />
                        </FormControl>
                    </div>
                    }
                    <br/>
                </form>
            </div>
        </ContentBox>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeConfig);