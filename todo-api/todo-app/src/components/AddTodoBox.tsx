import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";

const AddTodoBox = (props: {
  open: boolean;
  save: (s: string, t: string[]) => void;
  cancel: (nc: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const hasNotChanged = () => title.trim() === "" && tags.length == 0;

  return (
    <Dialog
      open={props.open}
      onClose={() => props.cancel(hasNotChanged())}
      aria-labelledby="add-dialog-title"
      aria-describedby="add-dialog-description"
    >
      <DialogTitle id="add-dialog-title">Add a Todo</DialogTitle>
      <DialogContent>
        <DialogContentText id="add-dialog-description">
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            id="standard-multiline-static"
            label="Todo"
            onChange={e => setTitle(e.target.value)}
          />
        </DialogContentText>
        <DialogContentText id="edit-dialog-chips">
          <ChipInput
            label="Tags"
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

export default AddTodoBox;
