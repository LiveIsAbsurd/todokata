import React from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

class TasksFilter extends React.Component {
  state = {
    All: true,
    Active: false,
    Completed: false,
  }

  select = (e) => {
    this.setState((state) => {
      let newState = { ...state }
      Object.keys(newState).forEach((el) => {
        newState[el] = false
      })
      newState[e.target.textContent] = true
      return newState
    })
    this.props.selectFilter(e.target.textContent)
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button className={this.state.All ? 'selected' : ''} onClick={this.select}>
            All
          </button>
        </li>
        <li>
          <button className={this.state.Active ? 'selected' : ''} onClick={this.select}>
            Active
          </button>
        </li>
        <li>
          <button className={this.state.Completed ? 'selected' : ''} onClick={this.select}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilter.propTypes = {
  selectFilter: PropTypes.func,
}

TasksFilter.defaultProps = {
  selectFilter: () => {},
}

export default TasksFilter
