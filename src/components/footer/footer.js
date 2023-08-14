import React from "react";
import TasksFilter from "../tasks-filter";
import "./footer.css";

const Footer = ({ selectFilter, delCompleted, count }) => {

    return (
        <footer className="footer">
            <span className="todo-count">{count} items left</span>
            <TasksFilter 
                selectFilter={(filter) => {selectFilter(filter)}}/>
            <button 
                className="clear-completed"
                onClick={delCompleted}>Clear completed</button>
        </footer>
    );
};

export default Footer;