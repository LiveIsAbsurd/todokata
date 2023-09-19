import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

function TasksFilter({ selectFilter, filter }) {
  const select = (filter) => {
    selectFilter(filter);
  };

  let activeFilter = filter;
  let buttons = ['All', 'Active', 'Completed'].map((filter, i) => {
    return (
      <li key={i}>
        <button key={i} className={activeFilter === filter ? 'selected' : ''} onClick={() => select(filter)}>
          {filter}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

TasksFilter.propTypes = {
  selectFilter: PropTypes.func,
  filter: PropTypes.string,
};

TasksFilter.defaultProps = {
  selectFilter: () => {},
  filter: '',
};

export default TasksFilter;
