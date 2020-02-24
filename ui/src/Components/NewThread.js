import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { FormControl, TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { orange } from "@material-ui/core/colors";
import * as Constants from "../data/TestData"
const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  floatingLabelFocusStyle: {
    color: "green"
  },
  separator: {
    marginTop: theme.spacing(1)
  },
  menuStyle: {
    border: "1px solid black",
    borderRadius: "5%",
    backgroundColor: 'lightgrey',
  },
});

const DialogTitle = withStyles(styles)(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography
      className={
        classes.root
      }
      {...other}>
      <Typography variant="h6">
        {children}</Typography>
      {
        onClose ? (
          <IconButton aria-label="close"
            className={
              classes.closeButton
            }
            onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null
      }
      {" "} </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const CreateButton = withStyles(theme => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#E87424",
    "&:hover": {
      backgroundColor: orange[600]
    }
  }
}))(Button);

const ActionButton = withStyles(theme => ({
  root: {
    color: "#E87424",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: orange[100]
    }
  }
}))(Button);

const NewThread = () => {
  const [open, setOpen] = useState(false);
  const [manager, setManager] = useState("");
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleManagerSelection = event => {
    setManager(event.target.value);
    setHasError(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    clearFormFields();
  };

  const clearFormFields = () => {
    setManager("");
    setBody("");
    setSubject("");
  };
  const handleSubmit = event => {
    if (manager === "") {
      setHasError(true);
    } else {
      console.log("Call the backend API: Subject:" + subject + ", Manager Id: " + manager + ", Message: " + body);
      handleClose();
    }
  };

  return (
    <div>
      <CreateButton color="primary"
        onClick={handleClickOpen}>
        Create New Thread
            </CreateButton>
      <Dialog fullWidth={"xl"}
        maxWidth={"sm"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle id="customized-dialog-title"
          onClose={handleClose}>
          New Thread
                </DialogTitle>
        <DialogContent dividers>
          <FormControl margin="normal" fullWidth>
            <TextField id="filled-basic" label="Subject" variant="filled"
              floatingLabelFocusStyle={
                styles.floatingLabelFocusStyle
              }
              onChange={
                event => {
                  event.preventDefault();
                  setSubject(event.target.value);
                }
              } />

          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel id="select-manager-label" margin="dense">
              Send to
                    </InputLabel>
            <Select variant="filled" id="select-manager"
              value={manager}
              onChange={handleManagerSelection}>
              {Constants.employee_manager_heirarchy.map(item => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </Select>
            {
              hasError && (
                <FormHelperText focused={hasError}>
                  Please select a manager to send your message.
                        </FormHelperText>
              )
            } </FormControl>
          <FormControl margin="normal" fullWidth>
            <TextField label="Message" variant="filled"
              multiline={true}
              rows={10}
              rowsMax={10}
              onChange={
                event => {
                  event.preventDefault();
                  setBody(event.target.value);
                }
              } />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <ActionButton autoFocus
            onClick={handleClose}
            color="secondary">
            Cancel
            </ActionButton>
          <ActionButton autoFocus
            onClick={handleSubmit}
            color="secondary">
            Send
            </ActionButton>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default NewThread;
