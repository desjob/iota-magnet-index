import React from 'react';

import {withStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {setPublishDescription, setPublishMagnetLink, performPublish} from "./actions";
import {connect} from 'react-redux';
import NodeConfig from '../nodeConfig/nodeConfig';

const styles = () => ({
    paper: {
        display: 'flex',
        alignItems: 'flex-start',
        textAlign: 'left',
        maxWidth: 900,
        overflow: 'auto'
    },
    textField: {
        width: 300,
        marginRight: 10
    },
    row: {
        margin: 10,
        width: '100%',
        minHeight: 10,

    },
});

const mapStateToProps = (state) => {
    return {
        isPending: state.publish.isPending,
        originalRoot: state.publish.originalRoot,
        count: state.publish.count,
        error: state.publish.error,
        description: state.publish.description,
        magnetLink: state.publish.magnetLink,
        mamConfig: state.publish.mamConfig
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDescriptionChange: (event) => dispatch(setPublishDescription(event.target.value)),
        onMagnetLinkChange: (event) => dispatch(setPublishMagnetLink(event.target.value)),
        onPublish: () => dispatch(performPublish()),
    }
};

class PublishPage extends React.Component {


    render() {
        const {classes, onDescriptionChange, onMagnetLinkChange, onPublish,  isPending, originalRoot, count, mamConfig, description, magnetLink} = this.props;


        return (
            <div>
                <NodeConfig mamConfig={mamConfig}>

                </NodeConfig>
                <Paper className={classes.paper}>
                    <form noValidate autoComplete="off">

                        <div className={classes.row}>
                            <h3>My channel</h3>
                        </div>

                        <div className={classes.row}>
                            <Divider variant="middle" />
                        </div>

                        <div className={classes.row}>
                            <p>Address: {originalRoot ? originalRoot : '-'}</p>
                        </div>

                        <div className={classes.row}>
                            <strong>Magnet links published: </strong> {count}
                        </div>

                        <div className={classes.row}>

                            <TextField
                                required
                                id="standard-required"
                                label="Description"
                                className={classes.textField}
                                margin="normal"
                                value={description}
                                onChange={onDescriptionChange}
                                disabled={isPending}
                            />
                            <TextField
                                required
                                id="standard-required-test"
                                label="Magnet link"
                                className={classes.textField}
                                margin="normal"
                                value={magnetLink}
                                onChange={onMagnetLinkChange}
                                disabled={isPending}
                            />

                            {/*<Fab color="primary" size="medium" aria-label="Add">*/}
                            {/*    <AddIcon/>*/}
                            {/*</Fab>*/}

                        </div>

                        {/*<div className={classes.row}>*/}
                        {/*    <Divider variant="middle"/>*/}
                        {/*</div>*/}

                        <div className={classes.row}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={onPublish}
                                disabled={isPending}
                            >
                                Publish
                            </Button>
                        </div>

                    </form>
                </Paper>
            </div>

        );
    }
}

PublishPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PublishPage));