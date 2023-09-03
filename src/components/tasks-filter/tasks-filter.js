import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

class TasksFilter extends React.Component {
  select = (filter) => {
    this.props.selectFilter(filter);
  };

  render() {
    let activeFilter = this.props.filter;
    let buttons = ['All', 'Active', 'Completed'].map((filter, i) => {
      return (
        <li key={i}>
          <button key={i} className={activeFilter === filter ? 'selected' : ''} onClick={() => this.select(filter)}>
            {filter}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}

TasksFilter.propTypes = {
  selectFilter: PropTypes.func,
};

TasksFilter.defaultProps = {
  selectFilter: () => {},
};

export default TasksFilter;
