import "date-fns";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import RemoveIcon from "@material-ui/icons/Remove";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

const AddTodoBox = (props: {
  open: boolean;
  save: (s: string, t: string[], da: boolean, deadline: Date | null) => void;
  cancel: (nc: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [deadlineAdded, setDeadlineAdded] = useState(false);

  const hasNotChanged = () => title.trim() === "" && tags.length === 0;

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
            fullWidth
            label="Tags"
            onChange={(chips: string[]) => setTags(chips)}
          />
        </DialogContentText>
        <br />
        <DialogContentText id="add-deadline">
          <ExpansionPanel expanded={deadlineAdded}>
            <ExpansionPanelSummary
              expandIcon={
                deadlineAdded ? (
                  <Tooltip title="Remove deadline" arrow>
                    <RemoveIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Add deadline" arrow>
                    <AddIcon />
                  </Tooltip>
                )
              }
              onClick={() => setDeadlineAdded(!deadlineAdded)} 
              aria-controls="add-deadline-content"
              id="add-deadline-header"
            >
              Add a deadline
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="deadline-picker-dialog"
                  label="Deadline picker"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={date => {setSelectedDate(date)}}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.save(title, tags, deadlineAdded, selectedDate)} color="primary">
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
