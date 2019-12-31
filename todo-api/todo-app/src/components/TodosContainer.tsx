import React, { Component } from "react";

export default class TodosContainer extends Component {
  render() {
    return (
      <div>
        <div className="inputContainer">
          <input
            className="taskInput"
            type="text"
            placeholder="Add a task"
            maxLength={50}
          />
        </div>
        <div className="listWrapper">
          <ul className="taskList" />
        </div>
      </div>
    );
  }
}
