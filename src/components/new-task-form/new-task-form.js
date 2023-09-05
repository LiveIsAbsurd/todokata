import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  state = {
    label: '',
    minute: '',
    second: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.trim() === '') {
      return;
    }
    this.props.submitForm(this.state);
    this.setState({
      label: '',
      minute: '',
      second: '',
    });
  };

  changeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  changeMinute = (e) => {
    this.setState({
      minute: e.target.value,
    });
  };

  changeSecond = (e) => {
    this.setState({
      second: e.target.value,
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.changeLabel}
          value={this.state.label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.changeMinute}
          value={this.state.minute}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.changeSecond}
          value={this.state.second}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  submitForm: PropTypes.func,
};

NewTaskForm.defaultProps = {
  submitForm: () => {},
};

export default NewTaskForm;
