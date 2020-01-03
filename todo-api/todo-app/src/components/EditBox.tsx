import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const EditBox = (props: {
  id: number;
  defaultValue: string;
  open: boolean;
  save: (s: string) => void;
  cancel: (s: string) => void;
}) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              id="standard-multiline-static"
              label="Todo"
              defaultValue={props.defaultValue}
              onFocus={e => setValue(e.target.value)}
              onChange={e => setValue(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.save(value)} color="primary">
            Save
          </Button>
          <Button onClick={() => props.cancel(value)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditBox;
