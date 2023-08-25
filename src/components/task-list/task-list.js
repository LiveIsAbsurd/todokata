import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

const TaskList = ({ todos, setComplite, onDeleted, editingTask }) => {
  const elements = todos.map((el) => {
    let editInput
    if (el.class === 'editing') {
      editInput = (
        <form>
          <input type="text" className="edit"></input>
        </form>
      )
    } else {
      editInput = ''
    }
    return (
      <li key={el.id} className={el.class ? el.class : ''}>
        <Task
          {...el}
          setComplite={(id) => setComplite(id)}
          onDeleted={(id) => onDeleted(id)}
          editingTask={(id) => editingTask(id)}
          isChecked={el.class === 'completed' ? true : false}
        />
        {editInput}
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.array,
  setComplite: PropTypes.func,
  onDeleted: PropTypes.func,
  filter: PropTypes.string,
}

TaskList.defaultProps = {
  todos: [],
  setComplite: () => {},
  onDeleted: () => {},
  filter: 'All',
}

export default TaskList
