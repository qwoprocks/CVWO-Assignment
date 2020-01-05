import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";

const EditBox = (props: {
  id: number;
  defaultTitle: string;
  defaultTags: string[];
  open: boolean;
  save: (s: string, t: string[]) => void;
  cancel: (nc: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const hasNotChanged = () =>
    props.defaultTitle === title && props.defaultTags === tags;

  useEffect(() => {
    setTitle(props.defaultTitle);
    setTags(props.defaultTags);
  }, [props.defaultTitle, props.defaultTags]);

  return (
    <Dialog
      open={props.open}
      onClose={() => props.cancel(hasNotChanged())}
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      <DialogTitle id="edit-dialog-title">Edit</DialogTitle>
      <DialogContent>
        <DialogContentText id="edit-dialog-description">
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            id="standard-multiline-static"
            label="Todo"
            defaultValue={props.defaultTitle}
            onChange={e => setTitle(e.target.value)}
          />
        </DialogContentText>
        <DialogContentText id="edit-dialog-chips">
          <ChipInput
            label="Tags"
            defaultValue={props.defaultTags}
            onChange={(chips: string[]) => setTags(chips)}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.save(title, tags)} color="primary">
          Save
        </Button>
        <Button onClick={() => props.cancel(hasNotChanged())} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBox;
