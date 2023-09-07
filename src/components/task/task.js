import React from 'react';
import PropTypes from 'prop-types';
import './task.css';

import TodoTimer from '../todo-timer';

class Task extends React.Component {
  render() {
    const { label, time, setComplite, onDeleted, editingTask, id, isChecked, timer } = this.props;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={() => setComplite(id)} checked={isChecked} readOnly />
        <label>
          <span className="title">{label}</span>
          <TodoTimer timerState={timer} id={id} isChecked={isChecked} />
          <span className="description">{time}</span>
        </label>
        <button className="icon icon-edit" onClick={() => editingTask(id)}></button>
        <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
      </div>
    );
  }
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
