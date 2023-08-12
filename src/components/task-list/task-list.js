import React from "react";
import Task from "../task";
import "./task-list.css"

const TaskList = ({todos, setComplite, onDeleted}) => {

    const elements = todos.map(el => {
        let editInput;

        if (el.class === "editing") {
            editInput = <input type="text" className="edit" value="Editing task"></input>;
        } else {
            editInput = "";
        }

        return (
            <li id={el.id} className={el.class ? el.class : ""}>
                <Task {...el}
                setComplite = {(id) => setComplite(id)}
                onDeleted = {(id) => onDeleted(id)}
                isChecked = {el.class === "completed" ? true : false} />
                {editInput}
            </li>
        );
    });

    return (
        <ul className="todo-list">
            {elements}
        </ul>
    );
};

export default TaskList;