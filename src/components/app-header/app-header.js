import React from "react";
import NewTaskForm from "../new-task-form";
import "./app-header.css";

const AppHeader = ({ changeLabel, submitForm }) => {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm 
                submitForm={(text) => submitForm(text)}/>
        </header>
    );
};

export default AppHeader;