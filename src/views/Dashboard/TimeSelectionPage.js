import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Calendar from '../UserProfile/Calendar.jsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

const DAYS_IN_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TimeSelectionPage({ restaurantHours, stateOpenTimeSelection, setConfirmedTime, setShowConfirmPage }) {
  const classes = useStyles();

  const handleClose = () => {
    stateOpenTimeSelection.setOpenTimeSelection(false);
    setShowConfirmPage(true);
  };

  const getDays = () => {

  };

  const getHours = () => {

  };

  return (
    <Dialog
        open={stateOpenTimeSelection.openTimeSelection}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        fullWidth={true}
        maxWidth = {'md'}
      >
        <DialogContent >
            <Calendar availableHourRange={ {DAYS_IN_WEEK} } availableHourRange={ {start: 11, end: 23} } setConfirmedTime={ setConfirmedTime }/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  );
}
