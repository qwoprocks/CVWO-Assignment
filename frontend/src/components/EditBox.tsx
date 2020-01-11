import "date-fns";
import React, { useState, useEffect } from "react";
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

const tagHelper = (tags: any[]) => {
  const newTags = [] as string[];
  tags.forEach(tag => {
    const label = tag.label as string;
    newTags.push(label);
  });
  return newTags;
};

const EditBox = (props: {
  tagList: Object[];
  id: number;
  defaultTitle: string;
  defaultTags: string[];
  defaultDeadline: string;
  open: boolean;
  save: (s: string, t: string[], da: boolean, deadline: Date | null) => void;
  cancel: (nc: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<Object[]>([]);
  const [tagList, setTagList] = useState<Object[]>([]);
  const [deadlineAdded, setDeadlineAdded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const hasNotChanged = () =>
    (props.defaultTitle === title &&
      props.defaultTags === tagHelper(tags) &&
      props.defaultDeadline === null) ||
    selectedDate === null
      ? true
      : selectedDate.toLocaleDateString() === props.defaultDeadline;

  const handleChange = (newValue: any, actionMeta: any) => {
    if (newValue !== null) {
      setTags(newValue);
    } else {
      setTags([]);
    }
  };

  useEffect(() => {
    setTitle(props.defaultTitle);
    const tagObjs = [] as Object[];
    props.defaultTags.forEach(tag => {
      tagObjs.push({ value: tag, label: tag });
    });
    setTags(tagObjs);
    setTagList(props.tagList);
    if (props.defaultDeadline !== "" && props.defaultDeadline !== null) {
      setSelectedDate(new Date(props.defaultDeadline));
      setDeadlineAdded(true);
    } else {
      setSelectedDate(new Date());
      setDeadlineAdded(false);
    }
  }, [
    props.defaultTitle,
    props.defaultTags,
    props.tagList,
    props.defaultDeadline
  ]);

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
          <CreatableSelect
            isMulti
            placeholder="Tags"
            maxMenuHeight={120}
            styles={{ menu: base => ({ ...base, position: "relative" }) }}
            onChange={handleChange}
            options={tagList}
            defaultValue={tags}
          />
        </DialogContentText>
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
              aria-controls="panel1a-content"
              id="panel1a-header"
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
          onClick={() =>
            props.save(title, tagHelper(tags), deadlineAdded, selectedDate)
          }
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

export default EditBox;
