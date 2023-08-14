import React from "react";
import Task from "../task";
import "./task-list.css"

const TaskList = ({todos, setComplite, onDeleted, filter}) => {
    let newArr = [];
    todos.forEach(el => {
        if (filter === "All") {
            newArr.push(el);
        } else if (filter === "Completed") {
            if (el.class === "completed") {
                newArr.push(el);
            }
        } else if (filter === "Active") {
            if (el.class !== "completed") {
                newArr.push(el);
            }
        }
    });

    const elements = newArr.map(el => {
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