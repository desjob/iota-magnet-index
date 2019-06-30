import React from 'react';
import {withStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';

import {setPublishDescription, setPublishMagnetLink, performPublish} from "./actions";
import ContentBox from '../../components/contentBox';
import NodeConfig from '../nodeConfig/nodeConfig';

const styles = () => ({
    textField: {
        width: 300,
        marginRight: 10
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
        const {classes, onDescriptionChange, onMagnetLinkChange, onPublish, isPending, originalRoot, count, mamConfig, description, magnetLink} = this.props;


        return (
            <div>
                <NodeConfig mamConfig={mamConfig}/>

                <ContentBox title="My channel">

                    <p>
                        Address: {originalRoot ? originalRoot : '-'} <br/>
                        <strong>Magnet links published: </strong> {count}
                    </p>

                    <form noValidate autoComplete="off">
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
                        {/*<Fab color="primary" size="small" aria-label="Add">*/}
                        {/*    <AddIcon/>*/}
                        {/*</Fab>*/}

                        <br/>

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={onPublish}
                            disabled={isPending}
                        >
                            Publish
                        </Button>
                    </form>

                </ContentBox>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PublishPage));