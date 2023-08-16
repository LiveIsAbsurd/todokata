import React from "react";
import NewTaskForm from "../new-task-form";
import "./app-header.css";
import PropTypes from "prop-types";

const AppHeader = ({ submitForm }) => {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm 
                submitForm={(text) => submitForm(text)}/>
        </header>
    );
};

AppHeader.propTypes = {
    submitForm: PropTypes.func
};

AppHeader.defaultProps = {
    submitForm: () => {}
};


export default AppHeader;