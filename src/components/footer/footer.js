import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = ({ selectFilter, delCompleted, count, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter
        selectFilter={(filter) => {
          selectFilter(filter);
        }}
        filter={filter}
      />
      <button className="clear-completed" onClick={delCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  selectFilter: PropTypes.func,
  delCompleted: PropTypes.func,
  count: PropTypes.number,
};

Footer.defaultProps = {
  selectFilter: () => {},
  delCompleted: () => {},
  count: 0,
};

export default Footer;
