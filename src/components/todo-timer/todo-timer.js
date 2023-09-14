import React from 'react';
import PropTypes from 'prop-types';
import './todo-timer.css';

export default class TodoTimer extends React.Component {
  // componentDidUpdate() {
  //   const { isChecked } = this.props;
  //   if (isChecked) {
  //     this.timerPause();
  //   }
  // }

  // timerTick = () => {
  //   this.setState((state) => {
  //     if (state.timer[this.props.id].getMinutes() === 0 && state.timer[this.props.id].getSeconds() === 0) {
  //       clearInterval(state.interval[this.props.id]);
  //       let newState = { ...state };
  //       newState.timer[this.props.id] = new Date(0);
  //       return (state = newState);
  //     } else {
  //       let newTime = new Date(state.timer[this.props.id].getTime() - 1000);
  //       return (state.timer[this.props.id] = newTime);
  //     }
  //   });
  // };

  // timerStart = () => {
  //   if (this.props.isChecked) {
  //     return;
  //   }
  //   if (this.state.timer[this.props.id] && this.state.interval[this.props.id] !== 'pause') {
  //     return;
  //   }
  //   if (!this.state.timer[this.props.id] || this.state.timer[this.props.id].getTime() == new Date(0).getTime()) {
  //     this.setState((state) => {
  //       let newState = { ...state };
  //       newState.timer[this.props.id] = this.props.timerState;
  //       let interval = setInterval(this.timerTick, 1000);
  //       newState.interval[this.props.id] = interval;
  //       return (state = newState);
  //     });
  //   } else {
  //     let interval = setInterval(this.timerTick, 1000);
  //     this.setState({ interval: { [this.props.id]: interval } });
  //   }
  // };

  // timerPause = () => {
  //   clearInterval(this.state.interval[this.props.id]);
  //   this.setState({ interval: { [this.props.id]: 'pause' } });
  // };

  render() {
    let { timerShow: timer } = this.props;
    return (
      <div className="description">
        <button
          onClick={() => {
            this.props.timerStart(this.props.id);
          }}
          className="icon icon-play"
        ></button>
        <button
          onClick={() => {
            this.props.timerPause(this.props.id);
          }}
          className="icon icon-pause"
        ></button>
        {`${timer.getMinutes()}:${timer.getSeconds()}`}
      </div>
    );
  }
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
