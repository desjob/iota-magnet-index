import React from 'react';

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const styles = () => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 200,
    },
    fab: {
        margin: 10,
    },
    paper: {
        marginTop: 10,
        marginBottom: 10,
        padding: 50
    },
    button: {
        width: 100,
    },
});

class PublishPage extends React.Component {


    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        id="standard-required"
                        label="Description"
                        defaultValue=""
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Magnet link"
                        defaultValue=""
                        className={classes.textField}
                        margin="normal"
                    />
                    <br/>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                    {/*<Fab color="primary" size="medium" aria-label="Add" className={classes.fab}>*/}
                    {/*    <AddIcon />*/}
                    {/*</Fab>*/}

                </form>
            </Paper>
        );
    }
}

PublishPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublishPage);