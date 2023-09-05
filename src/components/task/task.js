import React from 'react';
import PropTypes from 'prop-types';
import './task.css';

class Task extends React.Component {
  render() {
    const { label, time, timer, setComplite, onDeleted, editingTask, id, isChecked, test } = this.props;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={() => setComplite(id)} checked={isChecked} readOnly />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => test(id)}></button>
            <button className="icon icon-pause"></button>
            {`${timer.getMinutes()}:${timer.getSeconds()}`}
          </span>
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
