import "date-fns";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
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
import { TagObject } from "../types";

type Props = {
  tagList: TagObject[];
  open: boolean;
  save: (s: string, t: string[], da: boolean, deadline: Date | null) => void;
  cancel: (nc: boolean) => void;
};

const AddTodoBox: React.FC<Props> = props => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<TagObject[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [deadlineAdded, setDeadlineAdded] = useState(false);

  const hasNotChanged = () => title.trim() === "" && tags.length === 0;

  const handleChange = (newValue: any) => {
    if (newValue !== null) {
      setTags(newValue);
    } else {
      setTags([]);
    }
  };

  const saveTodos = (
    title: string,
    tags: TagObject[],
    deadlineAdded: boolean,
    selectedDate: Date | null
  ) => {
    const newTags = [] as string[];
    tags.forEach(tag => {
      const label = tag.label as string;
      newTags.push(label);
    });
    props.save(title, newTags, deadlineAdded, selectedDate);
  };

  const reset = () => {
    setDeadlineAdded(false);
    setSelectedDate(new Date());
    setTags([]);
    setTitle("");
  };

  return (
    <Dialog
      open={props.open}
      onEnter={reset}
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
          <CreatableSelect
            isMulti
            placeholder="Tags"
            maxMenuHeight={120}
            styles={{ menu: base => ({ ...base, position: "relative" }) }}
            onChange={handleChange}
            options={props.tagList}
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
                  onChange={date => {
                    setSelectedDate(date);
                  }}
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
        <Button
          onClick={() => saveTodos(title, tags, deadlineAdded, selectedDate)}
          color="primary"
        >
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
