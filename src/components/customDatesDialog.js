import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateRangePicker from './dateRangePicker';

const CustomDatesDialog = ({ 
    isDialogOpen, 
    closeDialog, 
    onDateChangeFrom, 
    onDateChangeUntil,
    setDialogDateFrom,
    setDialogDateUntil,
    dialogDateFrom,
    dialogDateUntil,
    setDateFilterValue
}) => {

    const handleCancel = () => {
        setDialogDateFrom(null);
        setDialogDateUntil(null);
        setDateFilterValue("");
        closeDialog();
    }

    const handleSave = () => {
        onDateChangeFrom(dialogDateFrom);
        onDateChangeUntil(dialogDateUntil);
        setDateFilterValue("custom");
        closeDialog();
    }

    return (
        <Dialog
            open={isDialogOpen}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Custom date filter</DialogTitle>
            <DialogContent>
                <DateRangePicker
                    setDialogDateFrom={setDialogDateFrom}
                    dialogDateFrom={dialogDateFrom}
                    setDialogDateUntil={setDialogDateUntil}
                    dialogDateUntil={dialogDateUntil}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={handleCancel} 
                    color="primary"
                >
                    Cancel
                </Button>
                <Button 
                    variant="contained"
                    onClick={handleSave} 
                    color="secondary"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDatesDialog;