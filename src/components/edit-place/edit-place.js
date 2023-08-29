import React from 'react'
import PropTypes from 'prop-types'

export default class EditPlace extends React.Component {
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
    const { el } = this.props

    return (
      <form
        onSubmit={(e) => {
          this.onSubmit(e, el.id)
        }}
      >
        <input
          type="text"
          className="edit"
          defaultValue={el.label}
          onChange={this.editLabel}
          onClick={this.editLabel}
        ></input>
      </form>
    )
  }
}

EditPlace.propTypes = {
  todos: PropTypes.object,
  setComplite: PropTypes.func,
}

EditPlace.defaultProps = {
  todos: {},
  setComplite: () => {},
}
