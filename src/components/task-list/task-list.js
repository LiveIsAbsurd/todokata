import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

class TaskList extends React.Component {
  state = {
    editing: '',
  }

  editLabel = (e) => {
    this.setState({
      editing: e.target.value,
    })
  }

  onSubmit = (e, id) => {
    e.preventDefault()
    if (this.state.editing.trim() == '') {
      return
    }
    this.props.editTask(id, this.state.editing)
  }

  render() {
    const { todos, setComplite, onDeleted, editingTask } = this.props

    const elements = todos.map((el) => {
      let editInput
      if (el.class === 'editing') {
        editInput = (
          <form
            onSubmit={(e) => {
              this.onSubmit(e, el.id)
            }}
          >
            <input type="text" className="edit" defaultValue={el.label} onChange={this.editLabel}></input>
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
