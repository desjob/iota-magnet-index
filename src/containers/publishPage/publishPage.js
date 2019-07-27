import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import Loader from '../../components/loader';

import {setPublishDescription, setPublishMagnetLink, performPublish} from "./actions";
import ContentBox from '../../components/contentBox';
import NodeConfig from '../nodeConfig/nodeConfig';

const useStyles = makeStyles(theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        margin: 10,
        marginLeft: 0,
        fontWeight: 'bold'
    },
    textField: {
        width: 300,
        marginRight: 10
    },
}));

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

const PublishPage = (props) => {

    const classes = useStyles();
    const {onDescriptionChange, onMagnetLinkChange, onPublish, isPending, originalRoot, count, mamConfig, description, magnetLink, error} = props;


    return (
        <div>
            <NodeConfig mamConfig={mamConfig}/>

            <ContentBox title="My channel">

                <p>
                    Address: {originalRoot ? originalRoot : '-'} <br/>
                    <strong>Magnet links published: </strong>{count}
                </p>

                {isPending &&
                    <Loader/>
                }

                <form noValidate autoComplete="off">
                    <TextField
                        required
                        id="description"
                        label="Description"
                        className={classes.textField}
                        margin="normal"
                        value={description}
                        onChange={onDescriptionChange}
                        disabled={isPending}
                    />
                    <TextField
                        required
                        id="magnetLink"
                        label="Magnet link"
                        className={classes.textField}
                        margin="normal"
                        value={magnetLink}
                        onChange={onMagnetLinkChange}
                        disabled={isPending}
                    />

                    <br/>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={onPublish}
                        disabled={isPending}
                    >
                        Publish
                    </Button>

                    {error &&
                        <span className={classes.message}>
                            <ErrorIcon color="secondary"/>
                            {error}
                        </span>
                    }
                </form>
            </ContentBox>
            
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishPage);