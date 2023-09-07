import React from 'react';

export default class TodoTimer extends React.Component {
  state = {};

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
    return (
      <div className="description">
        <button className="icon icon-play" onClick={this.timerStart}></button>
        <button className="icon icon-pause" onClick={this.timerPause}></button>
        {this.state[this.props.id]
          ? `${this.state[this.props.id].getMinutes()}:${this.state[this.props.id].getSeconds()}`
          : `${this.props.timerState.getMinutes()}:${this.props.timerState.getSeconds()}`}
      </div>
    );
  }
}
