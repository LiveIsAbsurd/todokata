import React from 'react';
import PropTypes from 'prop-types';
import './todo-timer.css';

export default function TodoTimer({ timerShow: timer, id, timerStart, timerPause }) {
  return (
    <div className="description">
      <button
        onClick={() => {
          timerStart(id);
        }}
        className="icon icon-play"
      ></button>
      <button
        onClick={() => {
          timerPause(id);
        }}
        className="icon icon-pause"
      ></button>
      {`${timer.getMinutes()}:${timer.getSeconds()}`}
    </div>
  );
}

TodoTimer.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  timerState: PropTypes.object,
};

TodoTimer.defaultProps = {
  id: '',
  isChecked: false,
  timerState: new Date(0),
};
