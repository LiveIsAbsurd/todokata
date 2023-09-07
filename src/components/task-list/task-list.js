import React from 'react';
import PropTypes from 'prop-types';

import EditPlace from '../edit-place';
import Task from '../task';
import './task-list.css';

class TaskList extends React.Component {
  render() {
    const { todos, setComplite, onDeleted, editingTask, editTask } = this.props;

    const elements = todos.map((el) => {
      let editInput;
      let taskClass;
      if (el.state === 'completed') {
        taskClass = 'completed';
      } else if (el.state === 'active') {
        taskClass = '';
      }
      if (el.edit === true) {
        editInput = <EditPlace el={el} editTask={(id, label) => editTask(id, label)} />;
      } else {
        editInput = '';
      }
      return (
        <li key={el.id} className={el.edit ? 'editing' : taskClass}>
          <Task
            {...el}
            setComplite={(id) => setComplite(id)}
            onDeleted={(id) => onDeleted(id)}
            editingTask={(id) => editingTask(id)}
            isChecked={el.state === 'completed' ? true : false}
          />
          {editInput}
        </li>
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.propTypes = {
  todos: PropTypes.array,
  setComplite: PropTypes.func,
  onDeleted: PropTypes.func,
  filter: PropTypes.string,
};

TaskList.defaultProps = {
  todos: [],
  setComplite: () => {},
  onDeleted: () => {},
  filter: 'All',
};

export default TaskList;
