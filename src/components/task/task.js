import React from 'react';
import PropTypes from 'prop-types';
import './task.css';

import TodoTimer from '../todo-timer';

function Task({ label, time, setComplite, onDeleted, editingTask, id, isChecked, timerShow, timerStart, timerPause }) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onClick={() => setComplite(id)} checked={isChecked} readOnly />
      <label>
        <span className="title">{label}</span>
        <TodoTimer
          timerShow={timerShow}
          id={id}
          isChecked={isChecked}
          timerStart={(id) => timerStart(id)}
          timerPause={(id) => timerPause(id)}
        />
        <span className="description">{time}</span>
      </label>
      <button className="icon icon-edit" onClick={() => editingTask(id)}></button>
      <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
    </div>
  );
}

Task.propTypes = {
  label: PropTypes.string,
  time: PropTypes.string,
  setComplite: PropTypes.func,
  onDeleted: PropTypes.func,
  id: PropTypes.string,
  isChecked: PropTypes.bool,
};

Task.defaultProps = {
  label: '',
  time: '',
  setComplite: () => {},
  onDeleted: () => {},
  id: '0',
  isChecked: false,
};

export default Task;
