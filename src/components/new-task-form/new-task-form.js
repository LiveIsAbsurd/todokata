import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

function NewTaskForm({ submitForm }) {
  const [newTask, setNewTask] = useState({
    label: '',
    minute: '',
    second: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (newTask.label.trim() === '') {
      return;
    }
    submitForm(newTask);
    setNewTask({
      label: '',
      minute: '',
      second: '',
    });
  };

  const changeLabel = (e) => {
    setNewTask((state) => {
      return {
        ...state,
        label: e.target.value,
      };
    });
  };

  const changeMinute = (e) => {
    if (isNaN(Number(e.target.value))) {
      e.target.value = '';
      return;
    }
    setNewTask((state) => {
      return {
        ...state,
        minute: e.target.value,
      };
    });
  };

  const changeSecond = (e) => {
    if (isNaN(Number(e.target.value))) {
      e.target.value = '';
      return;
    }
    setNewTask((state) => {
      return {
        ...state,
        second: e.target.value,
      };
    });
  };
  return (
    <form className="new-todo-form" onSubmit={(e) => onSubmit(e)}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={(e) => changeLabel(e)}
        value={newTask.label}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e) => changeMinute(e)}
        value={newTask.minute}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(e) => changeSecond(e)}
        value={newTask.second}
      />
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  );
}

NewTaskForm.propTypes = {
  submitForm: PropTypes.func,
};

NewTaskForm.defaultProps = {
  submitForm: () => {},
};

export default NewTaskForm;
