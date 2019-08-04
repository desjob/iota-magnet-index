import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

import {setSubscriptionAddress, performUpdateIndex} from "./actions";
import ContentBox from '../../components/contentBox';
import NodeConfig from '../nodeConfig/nodeConfig';
import Loader from '../../components/loader';

const styles = () => ({
    textField: {
        width: 300,
        marginRight: 10
    },
});

const mapStateToProps = (state) => {
    return {
        isPending: state.subscriptions.isPending,
        error: state.subscriptions.error,
        address: state.subscriptions.address,
        mamConfig: state.publish.mamConfig,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddressChange: (event) => dispatch(setSubscriptionAddress(event.target.value)),
        onUpdateIndex: () => dispatch(performUpdateIndex()),
    }
};

class SubscriptionsPage extends React.Component {

    render() {
        const {classes, onAddressChange, onUpdateIndex, isPending, mamConfig, address} = this.props;


        return (
            <div>
                <NodeConfig mamConfig={mamConfig}/>

                <ContentBox title="My subscriptions">
                    {isPending &&
                        <Loader/>
                    }
                    <form noValidate autoComplete="off">
                        <TextField
                            required
                            id="standard-required"
                            label="Address"
                            className={classes.textField}
                            margin="normal"
                            value={address}
                            onChange={onAddressChange}
                            disabled={isPending}
                        />
                        <br/>

                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={onUpdateIndex}
                            disabled={isPending}
                        >
                            Update search index
                        </Button>
                    </form>

                </ContentBox>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubscriptionsPage));