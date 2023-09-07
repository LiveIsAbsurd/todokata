import React from 'react';
import './todo-timer.css';

export default class TodoTimer extends React.Component {
  state = {};

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timerTick = () => {
    this.setState((state) => {
      if (state[this.props.id].getMinutes() === 0 && state[this.props.id].getSeconds() === 0) {
        clearInterval(this.interval);
        let newState = { ...state };
        newState[this.props.id] = new Date(0);
        return (state = newState);
      } else {
        let newTime = new Date(state[this.props.id].getTime() - 1000);
        return { [this.props.id]: newTime };
      }
    });
  };

  timerStart = () => {
    if (!this.state[this.props.id] || this.state[this.props.id].getTime() == new Date(0).getTime()) {
      this.setState(
        (state) => {
          let newState = { ...state };
          newState[this.props.id] = this.props.timerState;
          return (state = newState);
        },
        () => (this.interval = setInterval(this.timerTick, 1000))
      );
    } else {
      this.interval = setInterval(this.timerTick, 1000);
    }
  };

  timerPause = () => {
    clearInterval(this.interval);
  };

  render() {
    const { isChecked } = this.props;
    if (isChecked) {
      this.timerPause();
    }
    return (
      <div className="description">
        <button onClick={this.timerStart} className="icon icon-play"></button>
        <button onClick={this.timerPause} className="icon icon-pause"></button>
        {this.state[this.props.id]
          ? `${this.state[this.props.id].getMinutes()}:${this.state[this.props.id].getSeconds()}`
          : `${this.props.timerState.getMinutes()}:${this.props.timerState.getSeconds()}`}
      </div>
    );
  }
}
